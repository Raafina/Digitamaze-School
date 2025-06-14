import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table-cell';
import { TableRow } from '@/components/ui/table-row';
import { SquarePen, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Guru',
        href: '/admin/teachers',
    },
];

type Teacher = {
    id: number;
    NIP: string;
    name: string;
    sex: string;
    email: string;
    phone: string;
};

type StudentClass = {
    id: number;
    name: string;
};

export default function Teacher({
    teachers,
    studentClasses,
    selectedClassId,
}: {
    teachers: Teacher[];
    studentClasses: StudentClass[];
    selectedClassId: number | null;
}) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function handleDeleteConfirm() {
        if (selectedId) {
            router.delete(route('teachers.destroy', selectedId), {
                preserveScroll: true,
                onSuccess: () => setSelectedId(null),
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Guru" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-3xl font-medium">Daftar Guru</h1>

                <div className="flex justify-between py-1">
                    <Button variant="default" onClick={() => router.visit(route('teachers.create'))}>
                        Tambah Guru
                    </Button>
                    <Select
                        value={selectedClassId?.toString() ?? 'all'}
                        onValueChange={(value) => {
                            router.get(route('teachers.index'), { class_id: value === 'all' ? null : value }, { preserveScroll: true });
                        }}
                    >
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Filter Kelas" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kelas</SelectItem>
                            {studentClasses.map((cls) => (
                                <SelectItem key={cls.id} value={cls.id.toString()}>
                                    {cls.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Table headers={['NIP', 'Nama', 'Email', 'No Telepon', 'Jenis Kelamin', 'Actions']}>
                    {teachers.map((teacher) => (
                        <TableRow key={teacher.id}>
                            <TableCell>{teacher.NIP}</TableCell>
                            <TableCell isHeader>{teacher.name}</TableCell>
                            <TableCell>{teacher.email ?? '-'}</TableCell>
                            <TableCell>{teacher.phone ?? '-'}</TableCell>
                            <TableCell>{teacher.sex === 'male' ? 'Laki-laki' : 'Perempuan'}</TableCell>
                            <TableCell>
                                <div className="space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" onClick={() => setSelectedId(teacher.id)}>
                                                <Trash2 />
                                            </Button>
                                        </DialogTrigger>
                                    </Dialog>
                                    <Button variant="default" onClick={() => router.visit(route('teachers.edit', teacher.id))}>
                                        <SquarePen />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                <Dialog open={selectedId !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
                    <DialogContent>
                        <DialogTitle>Hapus Guru?</DialogTitle>
                        <DialogDescription>
                            Data guru yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus guru ini?
                        </DialogDescription>
                        <DialogFooter className="gap-2">
                            <DialogClose asChild>
                                <Button variant="secondary">Batal</Button>
                            </DialogClose>
                            <Button variant="destructive" onClick={handleDeleteConfirm}>
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
