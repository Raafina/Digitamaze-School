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
        title: 'guru',
        href: '/admin/teachers',
    },
];

type Teacher = {
    id: number;
    NIP: string;
    name: string;
    sex: string;
    phone: string;
    email: string;
    student_classes: { id: number; name: string }[];
};

export default function Teacher({
    teachers,
    studentClasses,
    selectedClassId,
}: {
    teachers: Teacher[];
    studentClasses: { id: number; name: string }[];
    selectedClassId: string | null;
}) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function handleDeleteConfirm() {
        if (selectedId) {
            router.delete(route('teacher.destroy', selectedId), {
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
                    <Button variant="default" onClick={() => router.visit(route('teacher.create'))}>
                        Tambah Guru
                    </Button>

                    <div className="w-64">
                        <Select
                            value={selectedClassId ?? 'all'}
                            onValueChange={(value) => {
                                router.get(
                                    route('teacher.index'),
                                    {
                                        class_id: value === 'all' ? null : value,
                                    },
                                    {
                                        preserveScroll: true,
                                    },
                                );
                            }}
                        >
                            <SelectTrigger>
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
                </div>

                <Table headers={['NIP', 'Nama', 'Jenis Kelamin', 'Kelas yang Diajar', 'Kontak', 'Actions']}>
                    {teachers.map((teacher) => (
                        <TableRow key={teacher.id}>
                            <TableCell>{teacher.NIP}</TableCell>
                            <TableCell isHeader>{teacher.name}</TableCell>
                            <TableCell>{teacher.sex === 'male' ? 'Laki-laki' : 'Perempuan'}</TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {teacher.student_classes.map((cls) => (
                                        <span
                                            key={cls.id}
                                            className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800"
                                        >
                                            {cls.name}
                                        </span>
                                    ))}
                                    {teacher.student_classes.length === 0 && <span className="text-sm text-gray-400">Belum ada kelas</span>}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm">
                                    {teacher.phone && <div>{teacher.phone}</div>}
                                    {teacher.email && <div className="text-gray-500">{teacher.email}</div>}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" onClick={() => setSelectedId(teacher.id)}>
                                                <Trash2 />
                                            </Button>
                                        </DialogTrigger>
                                    </Dialog>
                                    <Button variant="default" onClick={() => router.visit(route('teacher.edit', teacher.id))}>
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
