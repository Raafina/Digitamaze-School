import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Eye, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

import InputSearch from '@/components/input-search';
import Pagination from '@/components/pagination';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table-cell';
import { TableRow } from '@/components/ui/table-row';
import Toast from '@/components/ui/toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Siswa',
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
    parents: { name: string };
};

type PaginationData = {
    current_page: number;
    data: Student[];
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

const formatDateLocale = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

export default function Student({
    students,
    classes,
    selectedClass,
}: {
    students: PaginationData;
    classes: { id: number; name: string }[];
    selectedClass: string | null;
}) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function handleDeleteConfirm() {
        if (selectedId) {
            router.delete(route('student.destroy', selectedId), {
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
            <Head title="Daftar Siswa" />
            <Toast />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-between">
                    <h1 className="text-3xl font-medium">Daftar Siswa</h1>
                    <Button variant="default" onClick={() => router.visit(route('student.create'))}>
                        Tambah Siswa
                    </Button>
                </div>

                <div className="flex justify-between py-1">
                    <InputSearch route={route('student.index')} placeholder="Cari berdasarkan nama siswa..." />
                    <div className="w-64">
                        <Select
                            value={selectedClass ?? 'all'}
                            onValueChange={(value) => {
                                router.get(
                                    route('student.index'),
                                    {
                                        student_class_id: value === 'all' ? null : value,
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
                                {classes.map((cls) => (
                                    <SelectItem key={cls.id} value={cls.id.toString()}>
                                        {cls.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Table headers={['No', 'Kelas', 'Nama', 'Jenis Kelamin', 'Tanggal Lahir', 'Aksi']}>
                    {students.data.map((student, index) => (
                        <TableRow key={student.id}>
                            <TableCell>{(students.current_page - 1) * students.per_page + index + 1}</TableCell>
                            <TableCell isHeader>
                                <p className="w-fit rounded-lg bg-black px-2 py-1 text-white dark:bg-white dark:text-black"> {student.class?.name}</p>
                            </TableCell>
                            <TableCell isHeader>{student.name}</TableCell>
                            <TableCell>{student.sex === 'male' ? 'Laki-laki' : 'Perempuan'}</TableCell>
                            <TableCell>{formatDateLocale(student.date_of_birth)}</TableCell>
                            <TableCell>
                                <div className="flex flex-row space-x-2">
                                    <div className="flex flex-row space-x-2">
                                        <Button variant="default" size="sm" onClick={() => router.visit(route('student.show', student.id))}>
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="warning" size="sm" onClick={() => router.visit(route('student.edit', student.id))}>
                                            <SquarePen className="h-4 w-4" />
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="destructive" size="sm" onClick={() => setSelectedId(student.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                        </Dialog>
                                    </div>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                {students.data.length === 0 && (
                    <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">{selectedClass ? 'Tidak ada siswa di kelas ini' : 'Belum ada data siswa'}</p>
                        </div>
                    </div>
                )}

                {students.data.length > 0 && (
                    <Pagination
                        currentPage={students.current_page}
                        lastPage={students.last_page}
                        from={students.from}
                        to={students.to}
                        total={students.total}
                        prevPageUrl={students.prev_page_url}
                        nextPageUrl={students.next_page_url}
                        onPageChange={handlePageChange}
                    />
                )}

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
