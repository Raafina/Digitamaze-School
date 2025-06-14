<?php

namespace Database\Seeders;

use App\Models\Teacher;
use App\Models\StudentClass;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            ['id' => 1, 'nip' => '1234567890', 'name' => 'John Doe', 'sex' => 'male', 'phone' => '08123456789', 'email' => 'johndoe@example.com'],
            ['id' => 2, 'nip' => '0987654321', 'name' => 'Jane Smith', 'sex' => 'female', 'phone' => '08198765432', 'email' => 'janesmith@example.com'],
            ['id' => 3, 'nip' => '1122334455', 'name' => 'Michael Johnson', 'sex' => 'male', 'phone' => '08122334455', 'email' => 'mjohnson@example.com'],
            ['id' => 4, 'nip' => '6677889900', 'name' => 'Emily Davis', 'sex' => 'female', 'phone' => '08166778899', 'email' => 'edavis@example.com'],
            ['id' => 5, 'nip' => '5566778899', 'name' => 'Robert Brown', 'sex' => 'male', 'phone' => '08155667788', 'email' => 'rbrown@example.com'],
            ['id' => 6, 'nip' => '4433221100', 'name' => 'Linda Wilson', 'sex' => 'female', 'phone' => '08144332211', 'email' => 'lwilson@example.com'],
            ['id' => 7, 'nip' => '3344556677', 'name' => 'William Anderson', 'sex' => 'male', 'phone' => '08133445566', 'email' => 'wanderson@example.com'],
            ['id' => 8, 'nip' => '7788990011', 'name' => 'Patricia Thomas', 'sex' => 'female', 'phone' => '08177889900', 'email' => 'pthomas@example.com'],
            ['id' => 9, 'nip' => '9900112233', 'name' => 'Charles Jackson', 'sex' => 'male', 'phone' => '08199001122', 'email' => 'cjackson@example.com'],
            ['id' => 10, 'nip' => '2211334455', 'name' => 'Barbara White', 'sex' => 'female', 'phone' => '08122113344', 'email' => 'bwhite@example.com'],
        ];

        foreach ($teachers as $teacherData) {
            $teacher = Teacher::create($teacherData);

            $classIds = StudentClass::inRandomOrder()->limit(rand(1, 2))->pluck('id');
            $teacher->studentClasses()->attach($classIds);
        }
    }
}
