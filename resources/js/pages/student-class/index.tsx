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
        title: 'Kelas',
        href: '/admin/student-classes',
    },
];

interface student_class {
    id: number;
    code: string;
    name: string;
    period: string;
}

export default function Student_class({ student_classes }: { student_classes: student_class[] }) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function handleDeleteConfirm() {
        if (selectedId) {
            router.delete(route('student-class.destroy', selectedId), {
                preserveScroll: true,
                onSuccess: () => setSelectedId(null),
            });
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Kelas" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-3xl font-medium">Daftar Kelas</h1>

                <div className="flex justify-between py-1">
                    <Button variant="default" onClick={() => router.visit(route('student-class.create'))}>
                        Tambah Kelas
                    </Button>
                </div>

                <Table headers={['Kode', 'Nama', 'Periode', 'Actions']}>
                    {student_classes.map((student_class) => (
                        <TableRow key={student_class.id}>
                            <TableCell>{student_class.code}</TableCell>
                            <TableCell isHeader>{student_class.name}</TableCell>
                            <TableCell isHeader>{student_class.period}</TableCell>
                            <TableCell>
                                <div className="space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" onClick={() => setSelectedId(student_class.id)}>
                                                <Trash2 />
                                            </Button>
                                        </DialogTrigger>
                                    </Dialog>
                                    <Button variant="default" onClick={() => router.visit(route('student-class.edit', student_class.id))}>
                                        <SquarePen />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                <Dialog open={selectedId !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
                    <DialogContent>
                        <DialogTitle>Hapus Kelas?</DialogTitle>
                        <DialogDescription>
                            Data kelas yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus kelas ini?
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
