import { type VariantProps, cva } from "class-variance-authority";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

import { cn } from "../lib/utils";

const buttonVariants = cva(
  "flex flex-row items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-zinc-400",
        secondary: "bg-sky-400",
        destructive: "bg-red-400",
        ghost: "bg-slate-700",
        link: "transparent border border-sky-500",
      },
      size: {
        default: "h-10 w-full",
        sm: "h-8 px-2",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const buttonTextVariants = cva("text-center", {
  variants: {
    variant: {
      default: "text-white",
      secondary: "text-white",
      destructive: "text-white",
      ghost: "text-primary-foreground",
      link: "text-white",
    },
    size: {
      default: "text-sm",
      sm: "text-sm",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends React.ComponentPropsWithoutRef<typeof TouchableOpacity>,
    VariantProps<typeof buttonVariants> {
  label: string;
  labelClasses?: string;
  isLoading?: boolean;
}
function Button({
  label,
  labelClasses,
  className,
  variant,
  size,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <TouchableOpacity
      disabled={isLoading}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text
          className={cn(
            buttonTextVariants({ variant, size, className: labelClasses })
          )}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

export { Button, buttonVariants, buttonTextVariants };
