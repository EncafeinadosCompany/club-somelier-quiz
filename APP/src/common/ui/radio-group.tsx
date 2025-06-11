import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "h-4 w-4  aspect-square  border border-white bg-white/10 shadow-sm outline-none transition-all",
        "hover:border-blue-500/70",
        "rounded-full cursor-pointer",
        "focus:outline-none focus:ring-2 focus:ring-blue-500/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-blue-500 data-[state=checked]:bg-transparent",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <div className="absolute h-2 w-2 rounded-full bg-blue-500"></div>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }