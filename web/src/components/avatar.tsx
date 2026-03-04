import { cn } from "@/utils/cn"

interface AvatarProps extends React.PropsWithChildren {
  avatar?: string | null
  alt: string
  className?: string
  containerClassName?: string
}

export function Avatar({
  alt,
  avatar,
  children,
  className,
  containerClassName,
}: AvatarProps) {
  const fallback = alt
    .split(" ")
    .map(item => item.charAt(0))
    .join("")
    .toUpperCase()

  return (
    <div
      className={cn(
        "flex items-center gap-2 cursor-default",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "rounded-full bg-blue-dark size-7 text-gray-600 content-center text-center text-xs shrink-0 leading-none",
          className,
        )}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={alt}
            className="rounded-full object-cover size-full"
          />
        ) : (
          fallback
        )}
      </div>

      {children}
    </div>
  )
}
