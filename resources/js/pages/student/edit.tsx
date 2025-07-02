import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, GraduationCap, LoaderCircle, User, Users } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Siswa',
        href: '/admin/students',
    },
    {
        title: 'Ubah Siswa',
        href: '/admin/students/edit',
    },
];

type UpdateStudentForm = {
    id: string;
    student_class_id: string;
    nis: string;
    name: string;
    sex: string;
    date_of_birth: string;
    address: string;
    parent_id: string;
};

type ClassesOptions = {
    id: string;
    name: string;
};

type ParentsOptions = {
    id: string;
    name: string;
};

export default function StudentEdit({
    student,
    classes,
    parents,
}: {
    student: UpdateStudentForm;
    classes: ClassesOptions[];
    parents: ParentsOptions[];
}) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateStudentForm>>({
        id: student.id,
        student_class_id: student.student_class_id,
        nis: student.nis,
        name: student.name,
        sex: student.sex,
        date_of_birth: student.date_of_birth,
        address: student.address,
        parent_id: student.parent_id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('student.update', student.id), {
            onFinish: () => reset('student_class_id', 'nis', 'name', 'sex', 'date_of_birth', 'address', 'parent_id'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Data Siswa" />
            <div className="flex items-center gap-3 p-4">
                <Button onClick={() => router.visit(route('student.index'))}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-3xl font-medium">Ubah Data Siswa</h1>
            </div>

            {/* Content Section */}
            <div className="space-y-6 px-4">
                <form id="student-form" onSubmit={submit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4">
                        {/* Personal Information Form */}
                        <div className="space-y-4 lg:col-span-2">
                            <Card className="h-fit shadow-lg transition-shadow duration-200 hover:shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center justify-between gap-2 text-xl">
                                        <div className="flex items-center gap-2">
                                            <User />
                                            <span className="font-medium">Informasi Pribadi</span>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="space-y-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Nama Lengkap</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    value={data.name}
                                                    onChange={(e) => setData('name', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="Nama lengkap siswa"
                                                />
                                                <InputError message={errors.name} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="nis">NIS</Label>
                                                <Input
                                                    id="nis"
                                                    type="text"
                                                    required
                                                    value={data.nis}
                                                    onChange={(e) => setData('nis', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="Nomor Induk Siswa"
                                                />
                                                <InputError message={errors.nis} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="sex">Jenis Kelamin</Label>
                                                <Select value={data.sex || ''} onValueChange={(value) => setData('sex', value)}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih jenis kelamin" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">Laki-laki</SelectItem>
                                                        <SelectItem value="female">Perempuan</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <InputError message={errors.sex} />
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
                                                <Input
                                                    id="date_of_birth"
                                                    type="date"
                                                    required
                                                    value={data.date_of_birth}
                                                    onChange={(e) => setData('date_of_birth', e.target.value)}
                                                    disabled={processing}
                                                />
                                                <InputError message={errors.date_of_birth} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="address">Alamat</Label>
                                                <Textarea
                                                    id="address"
                                                    required
                                                    value={data.address}
                                                    onChange={(e) => setData('address', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="Alamat lengkap siswa"
                                                    className="min-h-[100px]"
                                                />
                                                <InputError message={errors.address} />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Button type="submit" className="hidden w-fit lg:flex" tabIndex={6} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Simpan Perubahan
                            </Button>
                        </div>

                        {/* Academic Information */}
                        <div className="space-y-4">
                            {/* Class Selection */}
                            <Card className="shadow-lg transition-shadow duration-200 hover:shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <GraduationCap />
                                        <span className="font-medium">Informasi Akademik</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="student_class_id">Kelas</Label>
                                            <Select
                                                value={String(data.student_class_id)}
                                                onValueChange={(value) => setData('student_class_id', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih kelas" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {classes.map((cls) => (
                                                        <SelectItem key={cls.id} value={String(cls.id)}>
                                                            {cls.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.student_class_id} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Parent Selection */}
                            <Card className="shadow-lg transition-shadow duration-200 hover:shadow-xl">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-xl">
                                        <Users />
                                        <span className="font-medium">Informasi Keluarga</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label htmlFor="parent_id">Orang Tua Murid</Label>
                                            <Select value={String(data.parent_id)} onValueChange={(value) => setData('parent_id', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih orang tua murid" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {parents.map((parent) => (
                                                        <SelectItem key={parent.id} value={String(parent.id)}>
                                                            {parent.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={errors.parent_id} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <Button type="submit" className="mt-4 flex w-fit lg:hidden" tabIndex={6} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Simpan Perubahan
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
