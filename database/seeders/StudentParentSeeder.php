<?php

namespace Database\Seeders;

use App\Models\StudentParent;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class StudentParentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $parents = [
            [
                'name' => 'Alex',
                'jobs' => 'Teacher',
            ],
            [
                'name' => 'David',
                'jobs' => 'Teacher',
            ],
            [
                'name' => 'Mason',
                'jobs' => 'Engineer',
            ],
            [
                'name' => 'Ethan',
                'jobs' => 'Teacher',
            ],
            [
                'name' => 'Simon',
                'jobs' => 'Teacher',
            ],
            [
                'name' => 'Tanaka',
                'jobs' => 'Teacher',
            ],
            [
                'name' => 'Akahito',
                'jobs' => 'Teacher',
            ]
        ];

        foreach ($parents as $parentData) {
            StudentParent::create($parentData);
        }
    }
}
