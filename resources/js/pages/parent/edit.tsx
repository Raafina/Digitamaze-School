import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orang Tua Murid',
        href: '/admin/parents',
    },
    {
        title: 'Ubah Orang Tua Murid',
        href: '/admin/parents/edit',
    },
];
type UpdateParentForm = {
    id: string;
    name: string;
    jobs: string;
    student_id: string;
};

export default function ParentEdit({ parent }: { parent: UpdateParentForm }) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateParentForm>>({
        id: parent.id,
        name: parent.name,
        jobs: parent.jobs,
        student_id: parent.student_id,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('parents.update', parent.id), {
            onFinish: () => reset('id', 'name', 'jobs', 'student_id'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Orang Tua Murid" />
            <div className="flex items-center gap-3 p-4">
                <Button onClick={() => router.visit(route('teachers.index'))}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-3xl font-medium">Ubah Data Orang Tua Murid</h1>
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
                            <Label htmlFor="jobs">Pekerjaan</Label>
                            <Input
                                id="jobs"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="jobs"
                                value={data.jobs}
                                onChange={(e) => setData('jobs', e.target.value)}
                                disabled={processing}
                                placeholder="Nama lengkap"
                            />
                            <InputError message={errors.jobs} className="mt-2" />
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
