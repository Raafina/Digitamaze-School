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
        title: 'Rekap Guru',
        href: '/admin/recap/teachers',
    },
];

type Teachers = {
    id: number;
    name: string;
};

type teacherRecaps = {
    id: number;
    class_name: string;
    teachers: Teachers[];
};

type PaginationData = {
    current_page: number;
    data: teacherRecaps[];
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

export default function TeacherRecap({ teacherRecaps }: { teacherRecaps: PaginationData }) {
    console.log(teacherRecaps);
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
            <Head title="Rekap Guru" />
            <Toast />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-3xl font-medium">Rekap Guru</h1>

                <Table headers={['No', 'Kelas', 'Guru']}>
                    {teacherRecaps.data.map((teacherRecap, index) => (
                        <TableRow key={teacherRecap.id}>
                            <TableCell>{(teacherRecaps.current_page - 1) * teacherRecaps.per_page + index + 1}</TableCell>
                            <TableCell isHeader>{teacherRecap.class_name}</TableCell>
                            <TableCell>
                                {teacherRecap.teachers.length > 0 ? (
                                    teacherRecap.teachers.map((teacher) => (
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

                {teacherRecaps.data.length > 0 && (
                    <Pagination
                        currentPage={teacherRecaps.current_page}
                        lastPage={teacherRecaps.last_page}
                        from={teacherRecaps.from}
                        to={teacherRecaps.to}
                        total={teacherRecaps.total}
                        prevPageUrl={teacherRecaps.prev_page_url}
                        nextPageUrl={teacherRecaps.next_page_url}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </AppLayout>
    );
}
