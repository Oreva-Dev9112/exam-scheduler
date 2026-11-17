import type { BadgeProps } from "@/components/ui/badge"

import type { ExamSessionStatus } from "./types"

// The normal path an exam takes. Cancelled sits outside it: an exam can be cancelled until it has finished.
const statusOrder: ExamSessionStatus[] = ["Pending", "Started", "Finished"]

export const examStatusVariant: Record<ExamSessionStatus, BadgeProps["variant"]> = {
  Pending: "info",
  Started: "warning",
  Finished: "success",
  Cancelled: "danger",
}

export function getStatusBadgeVariant(status?: ExamSessionStatus): BadgeProps["variant"] | undefined {
  return status ? examStatusVariant[status] ?? "secondary" : undefined
}

export function getNextStatus(status: ExamSessionStatus): ExamSessionStatus | null {
  const index = statusOrder.indexOf(status)
  if (index === -1) return null
  return statusOrder[index + 1] ?? null
}

export function canCancel(status: ExamSessionStatus): boolean {
  return status === "Pending" || status === "Started"
}
