import type { ApiExam } from "./mapExamResponse"
import data from "@/data/sample-exams.json"

// Made-up exams for the demo, used when no API is configured. All names are invented.
// The Laravel seeder reads the same file, so the demo and a local backend show the same exams.
export const sampleExams: ApiExam[] = data
