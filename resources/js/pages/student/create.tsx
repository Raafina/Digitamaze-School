import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
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
        title: 'Tambah Siswa',
        href: '/admin/students/create',
    },
];
type CreateStudentForm = {
    class_id: string;
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

export default function StudentCreate({ classes }: { classes: ClassesOptions[] }) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateStudentForm>>({
        class_id: '',
        nis: '',
        name: '',
        sex: '',
        date_of_birth: '',
        address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('student.store'), {
            onFinish: () => reset('class_id', 'nis', 'name', 'sex', 'date_of_birth'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Siswa" />
            <div className="flex items-center gap-3 p-4">
                <Button onClick={() => router.visit(route('student.index'))}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-3xl font-medium">Tambah Data Siswa</h1>
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
                            <Label htmlFor="class_id">Kelas</Label>
                            <Select value={String(data.class_id)} onValueChange={(value) => setData('class_id', value)}>
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
                            <InputError message={errors.class_id} className="mt-2" />
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
                            Tambah
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
