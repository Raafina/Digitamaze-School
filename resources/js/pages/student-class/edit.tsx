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
        title: 'Kelas',
        href: '/admin/student-classes',
    },
    {
        title: 'Ubah Kelas',
        href: '/admin/student-classes/edit',
    },
];
type UpdateStudentClassForm = {
    id: string;
    code: string;
    name: string;
    period: string;
};

export default function StudentClassEdit({ student_class }: { student_class: UpdateStudentClassForm }) {
    const { data, setData, put, processing, errors, reset } = useForm<Required<UpdateStudentClassForm>>({
        id: student_class.id,
        code: student_class.code,
        name: student_class.name,
        period: student_class.period,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(route('student-class.update', student_class.id), {
            onFinish: () => reset('code', 'code', 'name', 'period'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Guru" />
            <div className="flex items-center gap-3 p-4">
                <Button onClick={() => router.visit(route('teachers.index'))}>
                    <ArrowLeft />
                </Button>
                <h1 className="text-3xl font-medium">Ubah Data Kelas</h1>
            </div>

            <div className="p-4 sm:p-8">
                <form className="max-w-xl" onSubmit={submit}>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="code">Kode</Label>
                            <Input
                                id="code"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="code"
                                value={data.code}
                                onChange={(e) => setData('code', e.target.value)}
                                disabled={processing}
                                placeholder="Kode Kelas"
                            />
                            <InputError message={errors.code} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Nama Kelas</Label>
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
                                placeholder="Nama kelas"
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="period">Periode Kelas</Label>
                            <Input
                                id="period"
                                type="period"
                                required
                                tabIndex={2}
                                autoComplete="period"
                                value={data.period}
                                onChange={(e) => setData('period', e.target.value)}
                                disabled={processing}
                                placeholder="20XX/20XX"
                            />
                            <InputError message={errors.period} />
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
