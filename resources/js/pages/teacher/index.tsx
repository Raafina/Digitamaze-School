import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
        title: 'Guru',
        href: '/admin/teachers',
    },
];

type TeacherClass = {
    teacher_id: number;
    teacher_nip: string;
    teacher_name: string;
    teacher_sex: string;
    teacher_email: string;
    teacher_phone: string;
    teacher_subject: string;
    class_id: number;
    class_name: string;
    class_code: string;
    class_period: string;
};

type StudentClass = {
    id: number;
    name: string;
};

type PaginationData = {
    current_page: number;
    data: TeacherClass[];
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

export default function Teacher({
    teacherClasses,
    studentClasses,
    selectedClassId,
}: {
    teacherClasses: PaginationData;
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
            <Head title="Daftar Guru dan Kelas" />
            <Toast />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-3xl font-medium">Daftar Guru</h1>

                <div className="flex justify-between py-1">
                    <div className="w-64">
                        <Select
                            value={selectedClassId?.toString() ?? 'all'}
                            onValueChange={(value) => {
                                router.get(route('teachers.index'), { student_class_id: value === 'all' ? null : value }, { preserveScroll: true });
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
                    <Button variant="default" onClick={() => router.visit(route('teachers.create'))}>
                        Tambah Guru
                    </Button>
                </div>

                <Table headers={['No', 'Kelas', 'NIP', 'Nama Guru', 'Mapel', 'Email', 'No Telepon', 'Jenis Kelamin', 'Aksi']}>
                    {teacherClasses.data.map((item, index) => (
                        <TableRow key={`${item.teacher_id}-${item.class_id}`}>
                            <TableCell>{(teacherClasses.current_page - 1) * teacherClasses.per_page + index + 1}</TableCell>
                            <TableCell>
                                {item.class_name ? (
                                    <p className="w-fit rounded-lg bg-black px-2 py-1 text-white dark:bg-white dark:text-black">{item.class_name}</p>
                                ) : (
                                    <p className="w-fit rounded-lg bg-red-900 px-2 py-1 text-white">Tidak ada kelas</p>
                                )}
                            </TableCell>
                            <TableCell>{item.teacher_nip}</TableCell>
                            <TableCell isHeader>{item.teacher_name}</TableCell>
                            <TableCell>{item.teacher_subject}</TableCell>
                            <TableCell>{item.teacher_email ?? '-'}</TableCell>
                            <TableCell>{item.teacher_phone ?? '-'}</TableCell>
                            <TableCell>{item.teacher_sex === 'male' ? 'Laki-laki' : 'Perempuan'}</TableCell>
                            <TableCell>
                                <div className="space-x-2">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="destructive" size="sm" onClick={() => setSelectedId(item.teacher_id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </DialogTrigger>
                                    </Dialog>
                                    <Button variant="default" size="sm" onClick={() => router.visit(route('teachers.edit', item.teacher_id))}>
                                        <SquarePen className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                {teacherClasses.data.length === 0 && (
                    <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">
                                {selectedClassId ? 'Tidak ada guru yang mengajar kelas ini' : 'Belum ada data guru dan kelas'}
                            </p>
                        </div>
                    </div>
                )}

                {teacherClasses.data.length > 0 && (
                    <Pagination
                        currentPage={teacherClasses.current_page}
                        lastPage={teacherClasses.last_page}
                        from={teacherClasses.from}
                        to={teacherClasses.to}
                        total={teacherClasses.total}
                        prevPageUrl={teacherClasses.prev_page_url}
                        nextPageUrl={teacherClasses.next_page_url}
                        onPageChange={handlePageChange}
                    />
                )}

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
