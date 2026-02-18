import { ArrowLeftIcon } from "lucide-react"

import { Button } from "./button"

interface PageTitleProps extends React.PropsWithChildren {
  title: string
  hasBackButton?: boolean
}

export function PageTitle({ title, hasBackButton, children }: PageTitleProps) {
  return (
    <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
      <div className="space-y-1">
        {hasBackButton && (
          <Button
            variant="link"
            size="sm"
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
