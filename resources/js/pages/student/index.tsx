import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table-cell';
import { TableRow } from '@/components/ui/table-row';
import { SquarePen, Trash2 } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'siswa',
        href: '/admin/students',
    },
];

type Student = {
    id: number;
    class: { name: string };
    nis: string;
    name: string;
    sex: string;
    date_of_birth: string;
};

export default function Student({ students }: { students: Student[] }) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function handleDeleteConfirm() {
        if (selectedId) {
            router.delete(route('student.destroy', selectedId), {
                preserveScroll: true,
                onSuccess: () => setSelectedId(null),
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Siswa" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-3xl font-medium">Daftar Siswa</h1>

                <div className="flex justify-between py-1">
                    <Button variant="default" onClick={() => router.visit(route('student.create'))}>
                        Tambah Siswa
                    </Button>
                </div>

                <Table headers={['siswa', 'NIS', 'Nama', 'Jenis Kelamin', 'Tanggal Lahir', 'Actions']}>
                    {students.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.class?.name}</TableCell>
                            <TableCell>{student.nis}</TableCell>
                            <TableCell isHeader>{student.name}</TableCell>
                            <TableCell>{student.sex === 'male' ? 'Laki-laki' : 'Perempuan'}</TableCell>
                            <TableCell isHeader>{student.date_of_birth}</TableCell>
                            <TableCell>
                                <div className="space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" onClick={() => setSelectedId(student.id)}>
                                                <Trash2 />
                                            </Button>
                                        </DialogTrigger>
                                    </Dialog>
                                    <Button variant="default" onClick={() => router.visit(route('student.edit', student.id))}>
                                        <SquarePen />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                <Dialog open={selectedId !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
                    <DialogContent>
                        <DialogTitle>Hapus Siswa?</DialogTitle>
                        <DialogDescription>
                            Data siswa yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus siswa ini?
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
