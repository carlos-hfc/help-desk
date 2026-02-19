import { ArrowLeftIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { cn } from "@/utils/cn"

import { Button } from "./button"

interface PageTitleProps extends React.PropsWithChildren {
  title: string
  hasBackButton?: boolean
  className?: string
}

export function PageTitle({
  title,
  hasBackButton = false,
  className,
  children,
}: PageTitleProps) {
  const navigate = useNavigate()

  return (
    <header
      className={cn(
        "flex flex-col lg:flex-row lg:items-center justify-between gap-3",
        className,
        hasBackButton && "lg:items-end",
      )}
    >
      <div className="space-y-1">
        {hasBackButton && (
          <Button
            variant="link"
            size="sm"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeftIcon />
            Voltar
          </Button>
        )}

        <h1 className="text-xl lg:text-2xl text-blue-dark font-bold">
          {title}
        </h1>
      </div>

      {children && <div className="flex items-center gap-2">{children}</div>}
    </header>
  )
}
