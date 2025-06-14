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
            ['nis' => '1000000001', 'name' => 'Student 1', 'sex' => 'male', 'date_of_birth' => '2005-01-01', 'address' => 'Street 1', 'class_id' => 1],
            ['nis' => '1000000002', 'name' => 'Student 2', 'sex' => 'female', 'date_of_birth' => '2005-01-02', 'address' => 'Street 2', 'class_id' => 1],
            ['nis' => '1000000003', 'name' => 'Student 3', 'sex' => 'male', 'date_of_birth' => '2005-01-03', 'address' => 'Street 3', 'class_id' => 1],
            ['nis' => '1000000004', 'name' => 'Student 4', 'sex' => 'female', 'date_of_birth' => '2005-01-04', 'address' => 'Street 4', 'class_id' => 1],
            ['nis' => '1000000005', 'name' => 'Student 5', 'sex' => 'male', 'date_of_birth' => '2005-01-05', 'address' => 'Street 5', 'class_id' => 1],
            ['nis' => '1000000006', 'name' => 'Student 6', 'sex' => 'female', 'date_of_birth' => '2005-01-06', 'address' => 'Street 6', 'class_id' => 1],
            ['nis' => '1000000007', 'name' => 'Student 7', 'sex' => 'male', 'date_of_birth' => '2005-01-07', 'address' => 'Street 7', 'class_id' => 1],
            ['nis' => '1000000008', 'name' => 'Student 8', 'sex' => 'female', 'date_of_birth' => '2005-01-08', 'address' => 'Street 8', 'class_id' => 1],
            ['nis' => '1000000009', 'name' => 'Student 9', 'sex' => 'male', 'date_of_birth' => '2005-01-09', 'address' => 'Street 9', 'class_id' => 1],
            ['nis' => '1000000010', 'name' => 'Student 10', 'sex' => 'female', 'date_of_birth' => '2005-01-10', 'address' => 'Street 10', 'class_id' => 1],

            ['nis' => '1000000011', 'name' => 'Student 11', 'sex' => 'male', 'date_of_birth' => '2005-02-01', 'address' => 'Street 11', 'class_id' => 2],
            ['nis' => '1000000012', 'name' => 'Student 12', 'sex' => 'female', 'date_of_birth' => '2005-02-02', 'address' => 'Street 12', 'class_id' => 2],
            ['nis' => '1000000013', 'name' => 'Student 13', 'sex' => 'male', 'date_of_birth' => '2005-02-03', 'address' => 'Street 13', 'class_id' => 2],
            ['nis' => '1000000014', 'name' => 'Student 14', 'sex' => 'female', 'date_of_birth' => '2005-02-04', 'address' => 'Street 14', 'class_id' => 2],
            ['nis' => '1000000015', 'name' => 'Student 15', 'sex' => 'male', 'date_of_birth' => '2005-02-05', 'address' => 'Street 15', 'class_id' => 2],
            ['nis' => '1000000016', 'name' => 'Student 16', 'sex' => 'female', 'date_of_birth' => '2005-02-06', 'address' => 'Street 16', 'class_id' => 2],
            ['nis' => '1000000017', 'name' => 'Student 17', 'sex' => 'male', 'date_of_birth' => '2005-02-07', 'address' => 'Street 17', 'class_id' => 2],
            ['nis' => '1000000018', 'name' => 'Student 18', 'sex' => 'female', 'date_of_birth' => '2005-02-08', 'address' => 'Street 18', 'class_id' => 2],
            ['nis' => '1000000019', 'name' => 'Student 19', 'sex' => 'male', 'date_of_birth' => '2005-02-09', 'address' => 'Street 19', 'class_id' => 2],
            ['nis' => '1000000020', 'name' => 'Student 20', 'sex' => 'female', 'date_of_birth' => '2005-02-10', 'address' => 'Street 20', 'class_id' => 2],

            ['nis' => '1000000021', 'name' => 'Student 21', 'sex' => 'male', 'date_of_birth' => '2005-03-01', 'address' => 'Street 21', 'class_id' => 3],
            ['nis' => '1000000022', 'name' => 'Student 22', 'sex' => 'female', 'date_of_birth' => '2005-03-02', 'address' => 'Street 22', 'class_id' => 3],
            ['nis' => '1000000023', 'name' => 'Student 23', 'sex' => 'male', 'date_of_birth' => '2005-03-03', 'address' => 'Street 23', 'class_id' => 3],
            ['nis' => '1000000024', 'name' => 'Student 24', 'sex' => 'female', 'date_of_birth' => '2005-03-04', 'address' => 'Street 24', 'class_id' => 3],
            ['nis' => '1000000025', 'name' => 'Student 25', 'sex' => 'male', 'date_of_birth' => '2005-03-05', 'address' => 'Street 25', 'class_id' => 3],
            ['nis' => '1000000026', 'name' => 'Student 26', 'sex' => 'female', 'date_of_birth' => '2005-03-06', 'address' => 'Street 26', 'class_id' => 3],
            ['nis' => '1000000027', 'name' => 'Student 27', 'sex' => 'male', 'date_of_birth' => '2005-03-07', 'address' => 'Street 27', 'class_id' => 3],
            ['nis' => '1000000028', 'name' => 'Student 28', 'sex' => 'female', 'date_of_birth' => '2005-03-08', 'address' => 'Street 28', 'class_id' => 3],
            ['nis' => '1000000029', 'name' => 'Student 29', 'sex' => 'male', 'date_of_birth' => '2005-03-09', 'address' => 'Street 29', 'class_id' => 3],
            ['nis' => '1000000030', 'name' => 'Student 30', 'sex' => 'female', 'date_of_birth' => '2005-03-10', 'address' => 'Street 30', 'class_id' => 3],
        ];


        foreach ($students as $student) {
            Student::create($student);
        }
    }
}
