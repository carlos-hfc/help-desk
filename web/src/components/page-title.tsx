import { ArrowLeftIcon } from "lucide-react"
import { useNavigate } from "react-router"

import { cn } from "@/utils/cn"

import { Button } from "./button"

interface PageTitleProps extends React.PropsWithChildren {
  title: string
  backButton?: string | boolean
  className?: string
}

export function PageTitle({
  title,
  backButton,
  className,
  children,
}: PageTitleProps) {
  const navigate = useNavigate()

  return (
    <header
      className={cn(
        "flex flex-col lg:flex-row lg:items-center justify-between gap-3",
        className,
        backButton && "lg:items-end",
      )}
    >
      <div className="space-y-1">
        {backButton && (
          <Button
            variant="link"
            size="sm"
            onClick={() =>
              navigate(typeof backButton === "boolean" ? "/" : backButton)
            }
          >
            <ArrowLeftIcon />
            Voltar
          </Button>
        )}

        <h1 className="text-xl lg:text-2xl text-blue-dark font-bold">
          {title}
        </h1>
      </div>

      {children && (
        <div className="flex items-center gap-2 max-lg:*:w-full">
          {children}
        </div>
      )}
    </header>
  )
}
