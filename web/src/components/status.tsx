import { BanIcon, CheckCircle2Icon } from "lucide-react"

import { cn } from "@/utils/cn"

interface StatusProps {
  active?: boolean
}
export function Status({ active = true }: StatusProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full p-1.5 lg:px-3 [&>svg]:size-4 text-xs font-bold w-min",
        active === false && "bg-feedback-danger/20 text-feedback-danger",
        active === true && "bg-feedback-done/20 text-feedback-done",
      )}
    >
      {active ? (
        <CheckCircle2Icon className="lg:hidden" />
      ) : (
        <BanIcon className="lg:hidden" />
      )}
      <span className="max-lg:hidden">{active ? "Ativo" : "Inativo"}</span>
    </div>
  )
}
