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
        title: 'Rekap Siswa, Kelas, & Guru',
        href: '/admin/recap/all',
    },
];

type Students = {
    id: number;
    name: string;
};

type Teachers = {
    id: number;
    name: string;
};

type AllRecaps = {
    id: number;
    class_name: string;
    students: Students[];
    teachers: Teachers[];
};

type PaginationData = {
    current_page: number;
    data: AllRecaps[];
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

export default function AllRecap({ allRecaps }: { allRecaps: PaginationData }) {
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
            <Head title="Rekap Siswa, Kelas, & Guru" />
            <Toast />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-3xl font-medium">Rekap Siswa, Kelas, & Guru</h1>

                <Table headers={['No', 'Kelas', 'Siswa', 'Guru']}>
                    {allRecaps.data.map((allRecap, index) => (
                        <TableRow key={allRecap.id}>
                            <TableCell>{(allRecaps.current_page - 1) * allRecaps.per_page + index + 1}</TableCell>
                            <TableCell isHeader>{allRecap.class_name}</TableCell>
                            <TableCell>
                                {allRecap.students.length > 0 ? (
                                    allRecap.students.map((student) => (
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
                            <TableCell>
                                {allRecap.teachers ? (
                                    allRecap.students.map((teacher) => (
                                        <p
                                            key={teacher.id}
                                            className="mr-2 mb-2 inline-block rounded-full bg-black px-2 py-1 text-white dark:bg-white dark:text-black"
                                        >
                                            {teacher.name}
                                        </p>
                                    ))
                                ) : (
                                    <p className="text-gray-500">Tidak ada data</p>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </Table>

                {allRecaps.data.length > 0 && (
                    <Pagination
                        currentPage={allRecaps.current_page}
                        lastPage={allRecaps.last_page}
                        from={allRecaps.from}
                        to={allRecaps.to}
                        total={allRecaps.total}
                        prevPageUrl={allRecaps.prev_page_url}
                        nextPageUrl={allRecaps.next_page_url}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </AppLayout>
    );
}
