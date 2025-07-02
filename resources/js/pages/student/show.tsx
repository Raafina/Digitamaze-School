import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Edit3, GraduationCap, House, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Siswa',
        href: '/admin/teachers',
    },
    {
        title: 'Detail Siswa',
        href: '/admin/teachers/edit',
    },
];

type DetailStudent = {
    id: string;
    nis: string;
    name: string;
    sex: string;
    date_of_birth: string;
    address: string;
    parents: {
        name: string;
    };
    class: {
        name: string;
    };
};

export default function TeacherShow({ student }: { student: DetailStudent }) {
    const getSexLabel = (sex: string) => {
        return sex === 'L' ? 'Laki-laki' : 'Perempuan';
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Guru - ${student.name}`} />
            <div className="flex items-center gap-3 p-4">
                <Button onClick={() => router.visit(route('student.index'))}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-3xl font-medium">Detail Data Siswa</h1>
            </div>
            {/* Content Section */}
            <div className="space-y-6 px-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Personal Information */}
                    <Card className="h-fit shadow-lg transition-shadow duration-200 hover:shadow-xl lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between gap-2 text-xl">
                                <div className="flex items-center gap-2">
                                    <User />
                                    <span className="font-medium">Informasi Pribadi</span>
                                </div>
                                <Button onClick={() => router.visit(route('students.edit', student.id))} variant="outline">
                                    <Edit3 className="h-4 w-4" />
                                    Edit Siswa
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <Label>Nama</Label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{student.name}</p>

                                    <Label>NIS</Label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{student.nis}</p>

                                    <Label>Jenis Kelamin</Label>
                                    <p className="text-sm text-gray-900 dark:text-white">{getSexLabel(student.sex)}</p>
                                </div>

                                <div className="space-y-4">
                                    <Label>Tanggal Lahir</Label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{student.date_of_birth}</p>

                                    <Label>Alamat</Label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{student.address}</p>

                                    <Label>Orang Tua Wali</Label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{student.parents.name}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Classes Information */}
                    <Card className="h-fit shadow-lg transition-shadow duration-200 hover:shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <GraduationCap />
                                <span className="font-medium">Kelas Siswa</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {student.class ? (
                                <div className="flex items-center justify-between rounded-lg bg-black p-4 text-white transition-all duration-200 hover:shadow-md dark:bg-white dark:text-black">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black">
                                            <House className="h-5 w-5 text-black dark:text-white" />
                                        </div>
                                        <p className="text-sm font-medium">{student.class.name}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <GraduationCap className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada kelas siswa</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
