<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Teacher;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    { {
            $teachers = [
                ['id' => 1, 'nip' => '1234567890', 'name' => 'John Doe', 'sex' => 'M', 'phone' => '08123456789', 'email' => 'johndoe@example.com'],
                ['id' => 2, 'nip' => '0987654321', 'name' => 'Jane Smith', 'sex' => 'F', 'phone' => '08198765432', 'email' => 'janesmith@example.com'],
            ];

            foreach ($teachers as $teacher) {
                Teacher::create($teacher);
            }
        }
    }
}
