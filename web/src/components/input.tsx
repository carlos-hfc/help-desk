import { cn } from "@/utils/cn"

// interface InputProps extends React.ComponentProps<"input"> {
//   label: string
//   helperText?: string
//   error?: boolean
//   adornment?: string
//   textarea?: boolean
// }

interface BaseProps {
  label: string
  helperText?: string
  error?: boolean
  adornment?: string
}

type InputProps =
  | ({ textarea: true } & React.ComponentProps<"textarea">)
  | ({ textarea?: false } & React.ComponentProps<"input">)

export function Input({
  label,
  helperText,
  error = false,
  id,
  adornment,
  className,
  ...props
}: InputProps & BaseProps) {
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
      <div className="border-b border-b-gray-500 group-focus-within:border-blue-base py-2 flex gap-2">
        {adornment && <span className="text-gray-100">{adornment}</span>}

        {props.textarea ? (
          <textarea
            {...props}
            className={cn(
              "placeholder:text-gray-400 text-gray-200 caret-blue-base outline-none w-full read-only:pointer-events-none resize-none min-h-36",
              className,
            )}
            id={id}
          />
        ) : (
          <input
            {...props}
            className={cn(
              "placeholder:text-gray-400 text-gray-200 caret-blue-base outline-none w-full read-only:pointer-events-none [&::-webkit-inner-spin-button]:hidden",
              className,
            )}
            id={id}
          />
        )}
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
