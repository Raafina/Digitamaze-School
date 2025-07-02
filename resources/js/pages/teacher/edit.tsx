import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, GraduationCap, House, LoaderCircle, Plus, User, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Guru',
        href: '/admin/teachers',
    },
    {
        title: 'Ubah Guru',
        href: '/admin/teachers/edit',
    },
];

type UpdateTeacherForm = {
    id: string;
    NIP: string;
    name: string;
    email: string;
    sex: string;
    phone: string;
    subject: string;
    student_class_ids: number[];
};

type StudentClass = {
    id: number;
    name: string;
    code?: string;
    period?: string;
};

export default function TeacherEdit({ teacher, studentClasses }: { teacher: UpdateTeacherForm; studentClasses: StudentClass[] }) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateTeacherForm>>({
        id: teacher?.id || '',
        NIP: teacher?.NIP || '',
        name: teacher?.name || '',
        email: teacher?.email || '',
        sex: teacher?.sex || '',
        phone: teacher?.phone || '',
        subject: teacher?.subject || '',
        student_class_ids: teacher?.student_class_ids || [],
    });

    const [selectedClassId, setSelectedClassId] = useState<string>('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('teachers.update', teacher.id), {
            onFinish: () => {
                reset('NIP', 'name', 'email', 'sex', 'phone', 'student_class_ids');
                setSelectedClassId('');
            },
        });
    };

    const addSelectedClass = () => {
        if (selectedClassId && !data.student_class_ids.includes(parseInt(selectedClassId))) {
            setData('student_class_ids', [...data.student_class_ids, parseInt(selectedClassId)]);
            setSelectedClassId('');
        }
    };

    const removeSelectedClass = (classId: number) => {
        setData(
            'student_class_ids',
            data.student_class_ids.filter((id) => id !== classId),
        );
    };

    const getClassName = (classId: number) => {
        const cls = studentClasses.find((c) => c.id === classId);
        if (!cls) return `Kelas ID: ${classId} (tidak ditemukan)`;

        if (cls.period) {
            return `${cls.name} (${cls.period})`;
        }
        return cls.name;
    };

    const availableClasses = studentClasses.filter((cls) => !data.student_class_ids.includes(cls.id));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Guru" />
            <div className="flex items-center gap-3 p-4">
                <Button onClick={() => router.visit(route('teachers.index'))}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-3xl font-medium">Ubah Data Guru</h1>
            </div>

            {/* Content Section */}
            <div className="space-y-6 px-4">
                <form id="teacher-form" onSubmit={submit}>
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
                                                    placeholder="Nama lengkap guru"
                                                />
                                                <InputError message={errors.name} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="NIP">NIP</Label>
                                                <Input
                                                    id="NIP"
                                                    type="text"
                                                    required
                                                    value={data.NIP}
                                                    onChange={(e) => setData('NIP', e.target.value)}
                                                    disabled={processing}
                                                    placeholder="Nomor Induk Pegawai"
                                                />
                                                <InputError message={errors.NIP} />
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
                                                <Label htmlFor="email">Email</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        required
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        disabled={processing}
                                                        placeholder="email@sekolah.id"
                                                    />
                                                </div>
                                                <InputError message={errors.email} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="phone">Telepon</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        required
                                                        value={data.phone}
                                                        onChange={(e) => {
                                                            const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                                                            setData('phone', onlyNumbers);
                                                        }}
                                                        disabled={processing}
                                                        placeholder="08123456789"
                                                    />
                                                </div>
                                                <InputError message={errors.phone} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="subject">Mata Pelajaran</Label>
                                                <div className="relative">
                                                    <Input
                                                        id="subject"
                                                        type="text"
                                                        required
                                                        value={data.subject}
                                                        onChange={(e) => setData('subject', e.target.value)}
                                                        disabled={processing}
                                                        placeholder="Mata pelajaran yang diampu"
                                                    />
                                                </div>
                                                <InputError message={errors.subject} />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Button type="submit" className="hidden w-fit lg:block" tabIndex={6} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Simpan
                            </Button>
                        </div>

                        {/* Classes Management */}
                        <Card className="shadow-lg transition-shadow duration-200 hover:shadow-xl">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <GraduationCap />
                                    <span className="font-medium">Kelas yang Diampu</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Add Class Section */}
                                    <div className="grid gap-2">
                                        <Label>Tambah Kelas</Label>
                                        <div className="flex gap-2">
                                            <Select
                                                value={selectedClassId}
                                                onValueChange={setSelectedClassId}
                                                disabled={processing || availableClasses.length === 0}
                                            >
                                                <SelectTrigger className="">
                                                    <SelectValue
                                                        placeholder={availableClasses.length === 0 ? 'Semua kelas sudah dipilih' : 'Pilih kelas'}
                                                    />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {availableClasses.map((cls) => (
                                                        <SelectItem key={cls.id} value={cls.id.toString()}>
                                                            <div className="flex items-center gap-2">
                                                                {cls.name}
                                                                {cls.period && <span className="text-xs text-gray-500">({cls.period})</span>}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={addSelectedClass}
                                                disabled={!selectedClassId || processing}
                                                className="h-10 px-4"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <InputError message={errors.student_class_ids} />
                                    </div>

                                    {/* Selected Classes Display */}
                                    {data.student_class_ids.length > 0 ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label>Kelas Terpilih</Label>
                                                <Badge variant="secondary" className="text-black dark:text-white">
                                                    {data.student_class_ids.length} Kelas
                                                </Badge>
                                            </div>
                                            <div className="max-h-64 space-y-2 overflow-y-auto">
                                                {data.student_class_ids.map((classId) => (
                                                    <div
                                                        key={classId}
                                                        className="flex items-center justify-between rounded-lg bg-black p-4 text-white transition-all duration-200 hover:shadow-md dark:bg-white dark:text-black"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black">
                                                                <House className="h-5 w-5 text-black dark:text-white" />
                                                            </div>
                                                            <p className="text-sm font-medium">{getClassName(classId)}</p>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeSelectedClass(classId)}
                                                            disabled={processing}
                                                            className="h-6 w-6 p-0 hover:bg-red-100 hover:text-slate-600 dark:hover:bg-red-900/30 dark:hover:text-slate-400"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="py-8 text-center">
                                            <GraduationCap className="mx-auto mb-3 h-12 w-12 text-gray-300" />
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Belum ada kelas yang dipilih</p>
                                            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">Pilih kelas dari dropdown di atas</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <Button type="submit" className="mt-4 block w-fit lg:hidden" tabIndex={6} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Simpan
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
