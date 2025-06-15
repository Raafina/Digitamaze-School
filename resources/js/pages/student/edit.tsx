import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

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
};

type ClassesOptions = {
    id: string;
    name: string;
};

export default function StudentEdit({ student, classes }: { student: UpdateStudentForm; classes: ClassesOptions[] }) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateStudentForm>>({
        id: student.id,
        student_class_id: student.student_class_id,
        nis: student.nis,
        name: student.name,
        sex: student.sex,
        date_of_birth: student.date_of_birth,
        address: student.address,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('student.update', student.id), {
            onFinish: () => reset('student_class_id', 'nis', 'name', 'sex', 'date_of_birth', 'address'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Siswa" />
            <div className="flex items-center gap-3 p-4">
                <Button onClick={() => router.visit(route('teachers.index'))}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-3xl font-medium">Ubah Data Siswa</h1>
            </div>

            <div className="p-4 sm:p-8">
                <form className="max-w-xl" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Nama lengkap"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="student_class_id">Kelas</Label>
                            <Select value={String(data.student_class_id)} onValueChange={(value) => setData('student_class_id', value)}>
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
                            <InputError message={errors.student_class_id} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nis">NIS</Label>
                            <Input
                                id="nis"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="nis"
                                value={data.nis}
                                onChange={(e) => setData('nis', e.target.value)}
                                disabled={processing}
                                placeholder="Nomor Induk Siswa"
                            />
                            <InputError message={errors.nis} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="sex">Jenis Kelamin</Label>
                            <Select defaultValue={data.sex} onValueChange={(value) => setData('sex', value)}>
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
                            <Label htmlFor="date_of_birth">Tanggal Lahir</Label>
                            <Input
                                id="date_of_birth"
                                type="date"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="date_of_birth"
                                value={data.date_of_birth}
                                onChange={(e) => setData('date_of_birth', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.date_of_birth} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="address">Alamat</Label>
                            <Textarea
                                id="address"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                disabled={processing}
                                placeholder="Alamat lengkap"
                            />
                            <InputError message={errors.address} className="mt-2" />
                        </div>

                        <Button type="submit" className="mt-2 w-fit" tabIndex={5} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Simpan
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
