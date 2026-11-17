import api from "./api"
import type { ApiExam } from "./mapExamResponse"
import { sampleExams } from "./sampleExams"

// With VITE_API_BASE_URL set, exams come from the Laravel API. Without it (as on the live demo) the app runs
// on built-in sample data, and status changes are kept in this browser.
export const usingSampleData = !import.meta.env.VITE_API_BASE_URL

const STORAGE_KEY = "exam-scheduler:statuses"

function savedStatuses(): Record<number, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}")
  } catch {
    return {}
  }
}

export async function fetchExams(signal?: AbortSignal): Promise<ApiExam[]> {
  if (!usingSampleData) {
    const { data } = await api.get<ApiExam[]>("/exams", { signal })
    return data
  }
  const statuses = savedStatuses()
  return sampleExams.map((exam) => ({ ...exam, status: statuses[exam.id] ?? exam.status }))
}

export async function updateExamStatus(id: number, status: string): Promise<{ id: number; status: string }> {
  if (!usingSampleData) {
    const { data } = await api.put<{ id: number; status: string }>(`/exams/${id}/status`, { status })
    return data
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...savedStatuses(), [id]: status }))
  return { id, status }
}
