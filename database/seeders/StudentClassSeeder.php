<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\StudentClass;

class StudentClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $student_classes = [
            ['code' => 'X/MIPA/1/23-24', 'name' => 'Kelas 10 MIPA 1 2023-2024', 'period' => '2023-2024',],
            ['code' => 'X/MIPA/2/23-24', 'name' => 'Kelas 10 MIPA 2 2023-2024', 'period' => '2023-2024',],
            ['code' => 'XI/MIPA/1/23-24', 'name' => 'Kelas 11 MIPA 1 2023-2024', 'period' => '2023-2024',],
            ['code' => 'XI/MIPA/2/23-24', 'name' => 'Kelas 11 MIPA 2 2023-2024', 'period' => '2023-2024',],
            ['code' => 'XII/MIPA/1/23-24', 'name' => 'Kelas 12 MIPA 1 2023-2024', 'period' => '2023-2024',],
            ['code' => 'XII/MIPA/2/23-24', 'name' => 'Kelas 12 MIPA 2 2023-2024', 'period' => '2023-2024',],
        ];

        foreach ($student_classes as $student_class) {
            StudentClass::create($student_class);
        }
    }
}
