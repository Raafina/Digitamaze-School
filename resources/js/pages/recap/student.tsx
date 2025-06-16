import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';

import Pagination from '@/components/pagination';
import { Table } from '@/components/ui/table';
import { TableCell } from '@/components/ui/table-cell';
import { TableRow } from '@/components/ui/table-row';
import Toast from '@/components/ui/toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rekap Siswa',
        href: '/admin/recap/students',
    },
];

type Students = {
    id: number;
    name: string;
};

type StudentsRecap = {
    id: number;
    class_name: string;
    students: Students[];
};

type PaginationData = {
    current_page: number;
    data: StudentsRecap[];
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

export default function StudentsRecap({ studentRecaps }: { studentRecaps: PaginationData }) {
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
            <Head title="Rekap Siswa" />
            <Toast />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-3xl font-medium">Rekap Siswa</h1>

                <Table headers={['No', 'Kelas', 'Siswa']}>
                    {studentRecaps.data.map((studentRecap, index) => (
                        <TableRow key={studentRecap.id}>
                            <TableCell>{(studentRecaps.current_page - 1) * studentRecaps.per_page + index + 1}</TableCell>
                            <TableCell>{studentRecap.class_name}</TableCell>
                            <TableCell>
                                {studentRecap.students.length > 0 ? (
                                    studentRecap.students.map((student) => (
                                        <p
                                            key={student.id}
                                            className="mr-2 mb-2 inline-block rounded-full bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
                                        >
                                            {student.name}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Tidak ada data</p>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                {studentRecaps.data.length > 0 && (
                    <Pagination
                        currentPage={studentRecaps.current_page}
                        lastPage={studentRecaps.last_page}
                        from={studentRecaps.from}
                        to={studentRecaps.to}
                        total={studentRecaps.total}
                        prevPageUrl={studentRecaps.prev_page_url}
                        nextPageUrl={studentRecaps.next_page_url}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </AppLayout>
    );
}
