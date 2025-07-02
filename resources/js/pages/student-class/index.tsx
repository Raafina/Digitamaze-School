import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

import InputSearch from '@/components/input-search';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table-cell';
import { TableRow } from '@/components/ui/table-row';
import Toast from '@/components/ui/toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Kelas',
        href: '/admin/student-classes',
    },
];

type StudentClass = {
    id: number;
    code: string;
    name: string;
    period: string;
};

type PaginationData = {
    current_page: number;
    data: StudentClass[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    url: string | null;
    label: string;
    active: boolean;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

export default function StudentClass({ student_classes }: { student_classes: PaginationData }) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function handleDeleteConfirm() {
        if (selectedId) {
            router.delete(route('student-class.destroy', selectedId), {
                preserveScroll: true,
                onSuccess: () => setSelectedId(null),
            });
        }
    }

    function handlePageChange(url: string) {
        router.get(
            url,
            {},
            {
                preserveScroll: true,
                preserveState: true,
            },
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar Kelas" />
            <Toast />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between py-1">
                    <h1 className="text-3xl font-medium">Daftar Kelas</h1>
                    <Button variant="default" onClick={() => router.visit(route('student-class.create'))}>
                        Tambah Kelas
                    </Button>
                </div>
                <InputSearch route={route('student-class.index')} placeholder="Cari berdasarkan nama kode, nama atau periode kelas..." />

                <Table headers={['No', 'Kode', 'Nama', 'Periode', 'Aksi']}>
                    {student_classes.data.map((student_class, index) => (
                        <TableRow key={student_class.id}>
                            <TableCell>{(student_classes.current_page - 1) * student_classes.per_page + index + 1}</TableCell>
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

                {student_classes.data.length > 0 && (
                    <Pagination
                        currentPage={student_classes.current_page}
                        lastPage={student_classes.last_page}
                        from={student_classes.from}
                        to={student_classes.to}
                        total={student_classes.total}
                        prevPageUrl={student_classes.prev_page_url}
                        nextPageUrl={student_classes.next_page_url}
                        onPageChange={handlePageChange}
                    />
                )}

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
