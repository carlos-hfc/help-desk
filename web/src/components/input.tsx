import { cn } from "@/utils/cn"

interface InputProps extends React.ComponentProps<"input"> {
  label: string
  helperText?: string
  error?: boolean
  adornment?: string
}

export function Input({
  label,
  helperText,
  error = false,
  id,
  adornment,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col group">
      <label
        htmlFor={id}
        className={cn(
          "font-bold text-xs uppercase text-gray-300 group-focus-within:text-blue-base",
          error && "text-feedback-danger",
        )}
      >
        {label}
      </label>
      <div className="border-b border-b-gray-500 group-focus-within:border-blue-base py-2">
        {adornment && <span className="me-2 text-gray-100">{adornment}</span>}

        <input
          {...props}
          className={cn(
            "placeholder:text-gray-400 text-gray-200 caret-blue-base outline-none w-full read-only:pointer-events-none",
            className,
          )}
          id={id}
        />
      </div>
      {helperText && (
        <small
          className={cn(
            "mt-1.5 italic text-xs text-gray-400 group-focus-within:text-gray-400",
            error && "text-feedback-danger",
          )}
        >
          {helperText}
        </small>
      )}
    </div>
  )
}
