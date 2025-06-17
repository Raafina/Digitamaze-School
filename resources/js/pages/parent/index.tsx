import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table-cell';
import { TableRow } from '@/components/ui/table-row';
import Toast from '@/components/ui/toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: ' Orang Tua Murid',
        href: '/admin/parents',
    },
];

type Parents = {
    id: number;
    name: string;
    jobs: string;
    phones: string;
    student: { name: string }[];
};

type PaginationData = {
    current_page: number;
    data: Parents[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};

export default function Teacher({ parents }: { parents: PaginationData }) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function handleDeleteConfirm() {
        if (selectedId) {
            router.delete(route('parents.destroy', selectedId), {
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
            <Head title="Daftar Orang Tua Murid" />
            <Toast />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-3xl font-medium">Daftar Orang Tua Murid</h1>

                <div className="flex justify-between py-1">
                    <Button variant="default" onClick={() => router.visit(route('parents.create'))}>
                        Tambah Orang Tua Murid
                    </Button>
                </div>

                <Table headers={['No', 'Nama', 'Pekerjaan', 'Siswa', 'Aksi']}>
                    {parents.data.map((parent, index) => (
                        <TableRow key={`${parent.id}-${parent.id}`}>
                            <TableCell>{(parents.current_page - 1) * parents.per_page + index + 1}</TableCell>
                            <TableCell>{parent.name}</TableCell>
                            <TableCell>{parent.jobs}</TableCell>
                            <TableCell>
                                {parent.student.length > 0 ? (
                                    parent.student.map((student, index) => (
                                        <p
                                            className="mr-2 mb-2 inline-block rounded-full bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
                                            key={index}
                                        >
                                            {student.name}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Tidak ada data</p>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-row space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" size="sm" onClick={() => setSelectedId(parent.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                    </Dialog>
                                    <Button variant="default" size="sm" onClick={() => router.visit(route('parents.edit', parent.id))}>
                                        <SquarePen className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                {parents.data.length === 0 && (
                    <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Tidak ada data</p>
                        </div>
                    </div>
                )}

                {parents.data.length > 0 && (
                    <Pagination
                        currentPage={parents.current_page}
                        lastPage={parents.last_page}
                        from={parents.from}
                        to={parents.to}
                        total={parents.total}
                        prevPageUrl={parents.prev_page_url}
                        nextPageUrl={parents.next_page_url}
                        onPageChange={handlePageChange}
                    />
                )}

                <Dialog open={selectedId !== null} onOpenChange={(open) => !open && setSelectedId(null)}>
                    <DialogContent>
                        <DialogTitle>Hapus Orang Tua Murid?</DialogTitle>
                        <DialogDescription>
                            Data Orang Tua Murid yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus Orang Tua Murid ini?
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
