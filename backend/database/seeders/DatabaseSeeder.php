<?php

namespace Database\Seeders;

use App\Models\Candidate;
use App\Models\Exam;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the made-up exams the frontend demo uses, so both show the same data.
     */
    public function run(): void
    {
        $path = base_path('../frontend/src/data/sample-exams.json');
        $exams = json_decode(file_get_contents($path), true);

        foreach ($exams as $row) {
            $exam = Exam::create([
                'title' => $row['title'],
                'status' => $row['status'],
                'datetime' => $row['datetime'],
                'language' => $row['language'],
                'country' => $row['country'],
                'latitude' => $row['latitude'],
                'longitude' => $row['longitude'],
            ]);

            $ids = collect($row['candidates'])
                ->map(fn ($candidate) => Candidate::firstOrCreate(['name' => $candidate['name']])->id);
            $exam->candidates()->attach($ids);
        }
    }
}
