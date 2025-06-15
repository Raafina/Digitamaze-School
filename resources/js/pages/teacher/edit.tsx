import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle, X } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
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
            onFinish: () => reset('NIP', 'name', 'email', 'sex', 'phone'),
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

            <div className="p-4 sm:p-8">
                <form className="max-w-xl" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="NIP">NIP</Label>
                            <Input
                                id="NIP"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="NIP"
                                value={data.NIP}
                                onChange={(e) => setData('NIP', e.target.value)}
                                disabled={processing}
                                placeholder="Nomor Induk Pegawai"
                            />
                            <InputError message={errors.NIP} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Nama lengkap"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="phone">Nomor Telephone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                required
                                tabIndex={3}
                                autoComplete="tel"
                                value={data.phone}
                                onChange={(e) => {
                                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
                                    setData('phone', onlyNumbers);
                                }}
                                disabled={processing}
                                placeholder="08123456789"
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Alamat Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={4}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                            />
                            <InputError message={errors.email} />
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

                        <div className="grid gap-2">
                            <Label htmlFor="subject">Mata Pelajaran</Label>
                            <Input
                                id="subject"
                                type="subject"
                                required
                                tabIndex={4}
                                autoComplete="subject"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                                disabled={processing}
                                placeholder="Mata Pelajaran"
                            />
                            <InputError message={errors.subject} />
                        </div>

                        <div className="grid gap-2">
                            <Label>Kelas Yang Diajar</Label>
                            <div className="flex gap-2">
                                <Select
                                    value={selectedClassId}
                                    onValueChange={setSelectedClassId}
                                    disabled={processing || availableClasses.length === 0}
                                >
                                    <SelectTrigger className="flex-1">
                                        <SelectValue placeholder={availableClasses.length === 0 ? 'Semua kelas sudah dipilih' : 'Pilih kelas'} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableClasses.map((cls) => (
                                            <SelectItem key={cls.id} value={cls.id.toString()}>
                                                {cls.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button type="button" variant="outline" onClick={addSelectedClass} disabled={!selectedClassId || processing}>
                                    Tambah
                                </Button>
                            </div>
                            <InputError message={errors.student_class_ids} />

                            {/* Selected Classes Display */}
                            {data.student_class_ids.length > 0 && (
                                <div className="mt-2">
                                    <p className="mb-2 text-sm font-medium text-gray-700 dark:text-white">
                                        Kelas Terpilih ({data.student_class_ids.length}):
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {data.student_class_ids.map((classId) => (
                                            <div
                                                key={classId}
                                                className="inline-flex items-center gap-1 rounded-md bg-black px-2.5 py-1 text-sm font-medium text-white dark:bg-white dark:text-black"
                                            >
                                                {getClassName(classId)}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeSelectedClass(classId)}
                                                    disabled={processing}
                                                    className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-white disabled:opacity-50 dark:text-black"
                                                >
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <Button type="submit" className="mt-2 w-fit" tabIndex={6} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
