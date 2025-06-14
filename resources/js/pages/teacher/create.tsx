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
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Guru',
        href: '/admin/teachers',
    },
    {
        title: 'Tambah Guru',
        href: '/admin/teachers/create',
    },
];
type CreateTeacherForm = {
    NIP: string;
    name: string;
    email: string;
    sex: string;
    phone: string;
};

export default function TeacherCreate() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<CreateTeacherForm>>({
        NIP: '',
        name: '',
        email: '',
        sex: '',
        phone: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('teachers.store'), {
            onFinish: () => reset('NIP', 'name', 'email', 'sex', 'phone'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Guru" />
            <div className="flex items-center gap-3 p-4">
                <Button onClick={() => router.visit(route('teachers.index'))}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-3xl font-medium">Tambah Data Guru</h1>
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
                            <Label htmlFor="phone">Nomor Telephone</Label>
                            <Input
                                id="phone"
                                type="phone"
                                required
                                tabIndex={2}
                                autoComplete="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                disabled={processing}
                                placeholder="08123456789"
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Alamat Email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
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
