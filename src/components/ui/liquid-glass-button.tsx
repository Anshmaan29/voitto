import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variants = cva("button", {
  variants: {
    variant: {
      solid: "button-solid",
      glass: "button-glass",
      outline: "button-outline",
      light: "button-light",
    },
    size: { default: "", small: "button-small" },
  },
  defaultVariants: { variant: "solid", size: "default" },
});
type Props = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof variants> & { asChild?: boolean };
export function LiquidButton({
  asChild = false,
  variant,
  size,
  className,
  ...props
}: Props) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      className={cn(variants({ variant, size }), className)}
      {...props}
    />
  );
}
