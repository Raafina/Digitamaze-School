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
            ['NIP' => '1234567890', 'name' => 'John Doe', 'sex' => 'male', 'phone' => '08123456789', 'email' => 'johndoe@example.com'],
            ['NIP' => '0987654321', 'name' => 'Jane Smith', 'sex' => 'female', 'phone' => '08198765432', 'email' => 'janesmith@example.com'],
            ['NIP' => '1122334455', 'name' => 'Michael Johnson', 'sex' => 'male', 'phone' => '08122334455', 'email' => 'mjohnson@example.com'],
            ['NIP' => '6677889900', 'name' => 'Emily Davis', 'sex' => 'female', 'phone' => '08166778899', 'email' => 'edavis@example.com'],
            ['NIP' => '5566778899', 'name' => 'Robert Brown', 'sex' => 'male', 'phone' => '08155667788', 'email' => 'rbrown@example.com'],
            ['NIP' => '4433221100', 'name' => 'Linda Wilson', 'sex' => 'female', 'phone' => '08144332211', 'email' => 'lwilson@example.com'],
            ['NIP' => '3344556677', 'name' => 'William Anderson', 'sex' => 'male', 'phone' => '08133445566', 'email' => 'wanderson@example.com'],
            ['NIP' => '7788990011', 'name' => 'Patricia Thomas', 'sex' => 'female', 'phone' => '08177889900', 'email' => 'pthomas@example.com'],
            ['NIP' => '9900112233', 'name' => 'Charles Jackson', 'sex' => 'male', 'phone' => '08199001122', 'email' => 'cjackson@example.com'],
            ['NIP' => '2211334455', 'name' => 'Barbara White', 'sex' => 'female', 'phone' => '08122113344', 'email' => 'bwhite@example.com'],
        ];

        foreach ($teachers as $teacherData) {
            $teacher = Teacher::create($teacherData);

            $classIds = StudentClass::inRandomOrder()->limit(rand(1, 3))->pluck('id');

            $teacher->studentClasses()->attach($classIds);
        }
    }
}
