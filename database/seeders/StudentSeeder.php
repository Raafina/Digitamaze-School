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
            ['nis' => '1234567890', 'name' => 'John Doe', 'sex' => 'male', 'date_of_birth' => '1990-01-01', 'address' => 'Street 1', 'class_id' => 1],
            ['nis' => '0987654321', 'name' => 'Jane Smith', 'sex' => 'female', 'date_of_birth' => '1995-05-05', 'address' => 'Street 2', 'class_id' => 2],
            ['nis' => '9876543210', 'name' => 'Bob Johnson', 'sex' => 'male', 'date_of_birth' => '1998-08-08', 'address' => 'Street 3', 'class_id' => 3],
            ['nis' => '8765432109', 'name' => 'Alice Brown', 'sex' => 'female', 'date_of_birth' => '2001-01-01', 'address' => 'Street 4', 'class_id' => 4],
            ['nis' => '7654321098', 'name' => 'Charlie Davis', 'sex' => 'male', 'date_of_birth' => '2004-04-04', 'address' => 'Street 5', 'class_id' => 5],
            ['nis' => '6543210987', 'name' => 'Emily Wilson', 'sex' => 'female', 'date_of_birth' => '2007-07-07', 'address' => 'Street 6', 'class_id' => 6],
        ];

        foreach ($students as $student) {
            Student::create($student);
        }
    }
}
