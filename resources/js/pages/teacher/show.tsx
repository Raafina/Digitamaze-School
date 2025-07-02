import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, Edit3, GraduationCap, House, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Guru',
        href: '/admin/teachers',
    },
    {
        title: 'Detail Guru',
        href: '/admin/teachers/edit',
    },
];

type DetailTeacher = {
    id: string;
    NIP: string;
    name: string;
    email: string;
    sex: string;
    phone: string;
    subject: string;
    student_class_ids: number[];
    student_classes?: Array<{
        id: number;
        name: string;
        code: string;
        period: string;
    }>;
    created_at?: string;
};

type StudentClass = {
    id: number;
    name: string;
    code?: string;
    period?: string;
};

export default function TeacherShow({ teacher, studentClasses }: { teacher: DetailTeacher; studentClasses: StudentClass[] }) {
    const getSexLabel = (sex: string) => {
        return sex === 'L' ? 'Laki-laki' : 'Perempuan';
    };

    const getClassName = (classId: number) => {
        const cls = studentClasses.find((c) => c.id === classId);
        if (!cls) return `Kelas ID: ${classId} (tidak ditemukan)`;

        return cls.name;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Detail Guru - ${teacher.name}`} />
            <div className="flex items-center gap-3 p-4">
                <Button onClick={() => router.visit(route('teachers.index'))}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-3xl font-medium">Detail Data Guru</h1>
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
                                <Button onClick={() => router.visit(route('teachers.edit', teacher.id))} variant="outline">
                                    <Edit3 className="h-4 w-4" />
                                    Edit Guru
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <Label>Nama</Label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{teacher.name}</p>

                                    <Label>NIP</Label>
                                    <p className="mt-1 text-sm text-gray-900 dark:text-white">{teacher.NIP}</p>

                                    <Label>Jenis Kelamin</Label>
                                    <p className="text-sm text-gray-900 dark:text-white">{getSexLabel(teacher.sex)}</p>
                                </div>

                                <div className="space-y-4">
                                    <Label>Email</Label>
                                    <div>
                                        <a
                                            href={`mailto:${teacher.email}`}
                                            className="text-sm transition-colors hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            {teacher.email}
                                        </a>
                                    </div>

                                    <Label>Telepon</Label>
                                    <div>
                                        <a
                                            href={`tel:${teacher.phone}`}
                                            className="text-sm transition-colors hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                                        >
                                            {teacher.phone}
                                        </a>
                                    </div>

                                    <Label>Mata Pelajaran</Label>
                                    <p className="text-sm text-gray-900 dark:text-white">{teacher.subject}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Classes Information */}
                    <Card className="h-fit shadow-lg transition-shadow duration-200 hover:shadow-xl">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <GraduationCap />
                                <span className="font-medium">Kelas yang Diampu</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {teacher.student_class_ids && teacher.student_class_ids.length > 0 ? (
                                <div className="space-y-3">
                                    {teacher.student_class_ids.map((cls) => (
                                        <div
                                            key={cls}
                                            className="flex items-center justify-between rounded-lg bg-black p-4 text-white transition-all duration-200 hover:shadow-md dark:bg-white dark:text-black"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black">
                                                    <House className="h-5 w-5 text-black dark:text-white" />
                                                </div>
                                                <p className="text-sm font-medium">{getClassName(cls)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <GraduationCap className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada kelas yang diampu</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
