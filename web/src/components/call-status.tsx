import { CircleCheckBigIcon, CircleHelpIcon, Clock2Icon } from "lucide-react"

import { cn } from "@/utils/cn"

type CallStatusType = "OPEN" | "IN_PROGRESS" | "CLOSED"

interface CallStatusProps {
  status: CallStatusType
}

const callStatusMap: Record<CallStatusType, string> = {
  OPEN: "Aberto",
  IN_PROGRESS: "Em atendimento",
  CLOSED: "Encerrado",
}

const callStatusIcon: Record<CallStatusType, React.ReactElement> = {
  OPEN: <CircleHelpIcon />,
  IN_PROGRESS: <Clock2Icon />,
  CLOSED: <CircleCheckBigIcon />,
}

export function CallStatus({ status }: CallStatusProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full p-1.5 [&>svg]:size-4 text-xs font-bold w-min",
        status === "OPEN" && "bg-feedback-open/20 text-feedback-open",
        status === "IN_PROGRESS" &&
          "bg-feedback-progress/20 text-feedback-progress",
        status === "CLOSED" && "bg-feedback-done/20 text-feedback-done",
      )}
    >
      {callStatusIcon[status]}

      <span className="max-lg:hidden">{callStatusMap[status]}</span>
    </div>
  )
}
