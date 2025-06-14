<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            ['nis' => '1000000001', 'name' => 'Ahmad Rizky Ramadhan', 'sex' => 'male', 'date_of_birth' => '2005-01-01', 'address' => 'Jalan Melati 1', 'class_id' => 1],
            ['nis' => '1000000002', 'name' => 'Putri Ayu Lestari', 'sex' => 'female', 'date_of_birth' => '2005-01-02', 'address' => 'Jalan Melati 2', 'class_id' => 1],
            ['nis' => '1000000003', 'name' => 'Fajar Maulana', 'sex' => 'male', 'date_of_birth' => '2005-01-03', 'address' => 'Jalan Melati 3', 'class_id' => 1],
            ['nis' => '1000000004', 'name' => 'Siti Nurhaliza', 'sex' => 'female', 'date_of_birth' => '2005-01-04', 'address' => 'Jalan Melati 4', 'class_id' => 1],
            ['nis' => '1000000005', 'name' => 'Bagas Arya Pratama', 'sex' => 'male', 'date_of_birth' => '2005-01-05', 'address' => 'Jalan Melati 5', 'class_id' => 1],
            ['nis' => '1000000006', 'name' => 'Dewi Maharani', 'sex' => 'female', 'date_of_birth' => '2005-01-06', 'address' => 'Jalan Melati 6', 'class_id' => 1],
            ['nis' => '1000000007', 'name' => 'Rizky Dwi Santoso', 'sex' => 'male', 'date_of_birth' => '2005-01-07', 'address' => 'Jalan Melati 7', 'class_id' => 1],
            ['nis' => '1000000008', 'name' => 'Intan Permatasari', 'sex' => 'female', 'date_of_birth' => '2005-01-08', 'address' => 'Jalan Melati 8', 'class_id' => 1],
            ['nis' => '1000000009', 'name' => 'Ardiansyah Prasetyo', 'sex' => 'male', 'date_of_birth' => '2005-01-09', 'address' => 'Jalan Melati 9', 'class_id' => 1],
            ['nis' => '1000000010', 'name' => 'Laras Nabila Sari', 'sex' => 'female', 'date_of_birth' => '2005-01-10', 'address' => 'Jalan Melati 10', 'class_id' => 1],

            ['nis' => '1000000011', 'name' => 'Dimas Rangga Saputra', 'sex' => 'male', 'date_of_birth' => '2005-02-01', 'address' => 'Jalan Mawar 1', 'class_id' => 2],
            ['nis' => '1000000012', 'name' => 'Ayu Kartika Dewi', 'sex' => 'female', 'date_of_birth' => '2005-02-02', 'address' => 'Jalan Mawar 2', 'class_id' => 2],
            ['nis' => '1000000013', 'name' => 'Bayu Saputra', 'sex' => 'male', 'date_of_birth' => '2005-02-03', 'address' => 'Jalan Mawar 3', 'class_id' => 2],
            ['nis' => '1000000014', 'name' => 'Nina Febriani', 'sex' => 'female', 'date_of_birth' => '2005-02-04', 'address' => 'Jalan Mawar 4', 'class_id' => 2],
            ['nis' => '1000000015', 'name' => 'Hendra Wijaya', 'sex' => 'male', 'date_of_birth' => '2005-02-05', 'address' => 'Jalan Mawar 5', 'class_id' => 2],
            ['nis' => '1000000016', 'name' => 'Mega Ayuningtyas', 'sex' => 'female', 'date_of_birth' => '2005-02-06', 'address' => 'Jalan Mawar 6', 'class_id' => 2],
            ['nis' => '1000000017', 'name' => 'Reza Anugrah Putra', 'sex' => 'male', 'date_of_birth' => '2005-02-07', 'address' => 'Jalan Mawar 7', 'class_id' => 2],
            ['nis' => '1000000018', 'name' => 'Yuni Marlina', 'sex' => 'female', 'date_of_birth' => '2005-02-08', 'address' => 'Jalan Mawar 8', 'class_id' => 2],
            ['nis' => '1000000019', 'name' => 'Rangga Cahyadi', 'sex' => 'male', 'date_of_birth' => '2005-02-09', 'address' => 'Jalan Mawar 9', 'class_id' => 2],
            ['nis' => '1000000020', 'name' => 'Melati Andini', 'sex' => 'female', 'date_of_birth' => '2005-02-10', 'address' => 'Jalan Mawar 10', 'class_id' => 2],

            ['nis' => '1000000021', 'name' => 'Ilham Kurniawan', 'sex' => 'male', 'date_of_birth' => '2005-03-01', 'address' => 'Jalan Kenanga 1', 'class_id' => 3],
            ['nis' => '1000000022', 'name' => 'Salsa Bella Rahma', 'sex' => 'female', 'date_of_birth' => '2005-03-02', 'address' => 'Jalan Kenanga 2', 'class_id' => 3],
            ['nis' => '1000000023', 'name' => 'Yusuf Hidayatullah', 'sex' => 'male', 'date_of_birth' => '2005-03-03', 'address' => 'Jalan Kenanga 3', 'class_id' => 3],
            ['nis' => '1000000024', 'name' => 'Anisa Nur Aini', 'sex' => 'female', 'date_of_birth' => '2005-03-04', 'address' => 'Jalan Kenanga 4', 'class_id' => 3],
            ['nis' => '1000000025', 'name' => 'Galang Pratama', 'sex' => 'male', 'date_of_birth' => '2005-03-05', 'address' => 'Jalan Kenanga 5', 'class_id' => 3],
            ['nis' => '1000000026', 'name' => 'Citra Anggun Pertiwi', 'sex' => 'female', 'date_of_birth' => '2005-03-06', 'address' => 'Jalan Kenanga 6', 'class_id' => 3],
            ['nis' => '1000000027', 'name' => 'Aditya Wirawan', 'sex' => 'male', 'date_of_birth' => '2005-03-07', 'address' => 'Jalan Kenanga 7', 'class_id' => 3],
            ['nis' => '1000000028', 'name' => 'Lia Novitasari', 'sex' => 'female', 'date_of_birth' => '2005-03-08', 'address' => 'Jalan Kenanga 8', 'class_id' => 3],
            ['nis' => '1000000029', 'name' => 'Tegar Pangestu', 'sex' => 'male', 'date_of_birth' => '2005-03-09', 'address' => 'Jalan Kenanga 9', 'class_id' => 3],
            ['nis' => '1000000030', 'name' => 'Aulia Rahmah Putri', 'sex' => 'female', 'date_of_birth' => '2005-03-10', 'address' => 'Jalan Kenanga 10', 'class_id' => 3],
        ];

        foreach ($students as $student) {
            Student::create($student);
        }
    }
}
