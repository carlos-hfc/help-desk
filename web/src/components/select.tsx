import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon } from "lucide-react"

import { cn } from "@/utils/cn"

function Select({
  error,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> & {
  error?: boolean
}) {
  return (
    <div
      className="group"
      aria-invalid={error}
    >
      <SelectPrimitive.Root {...props} />
    </div>
  )
}

function SelectValue(
  props: React.ComponentProps<typeof SelectPrimitive.Value>,
) {
  return <SelectPrimitive.Value {...props} />
}

function SelectLabel(
  props: React.ComponentProps<typeof SelectPrimitive.Label>,
) {
  return (
    <SelectPrimitive.Label
      className={cn("uppercase text-gray-400 text-xs mb-4 font-bold px-2")}
      {...props}
    />
  )
}

function SelectGroup(
  props: React.ComponentProps<typeof SelectPrimitive.Group>,
) {
  return <SelectPrimitive.Group {...props} />
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "peer flex items-center justify-between data-placeholder:text-gray-400 border-b border-gray-500 py-2 w-full group-focus-within:border-blue-base data-[state=open]:border-blue-base data-[state=open]:[&_svg]:text-blue-base data-[state=open]:[&_svg]:rotate-180 text-gray-200 outline-none",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="text-gray-400 group-focus-within:text-blue-base transition" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-align-trigger={position === "popper"}
        className={cn(
          "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-xl shadow-lg bg-gray-600",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            "data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width) p-2",
          )}
        >
          <SelectGroup>{children}</SelectGroup>
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "focus:bg-gray-500 p-2 rounded-md relative flex gap-2 w-full cursor-default items-center justify-between outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 text-gray-400 data-[state=checked]:font-bold data-[state=checked]:text-gray-200 data-[state=checked]:[&_svg]:text-blue-base",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="pointer-events-none size-5 shrink-0" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectFormLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "font-bold text-xs uppercase text-gray-300 group-focus-within:text-blue-base group-has-[button[data-state=open]]:text-blue-base group-aria-invalid:text-feedback-danger",
        className,
      )}
      {...props}
    />
  )
}

function SelectHelperText({
  className,
  ...props
}: React.ComponentProps<"small">) {
  return (
    <small
      className={cn(
        "mt-1.5 italic text-xs text-gray-400 group-focus-within:text-gray-400 group-aria-invalid:text-feedback-danger group-aria-invalid:not-italic",
        className,
      )}
      {...props}
    />
  )
}

export {
  Select,
  SelectContent,
  SelectFormLabel,
  SelectGroup,
  SelectHelperText,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
}
