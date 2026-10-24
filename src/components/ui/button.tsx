import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg font-medium whitespace-normal sm:whitespace-nowrap max-w-full text-center transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-slate-950 text-white hover:bg-slate-900 focus-visible:ring-amber-500",
        outline: "border border-slate-300 bg-transparent text-slate-800 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-amber-500",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-amber-500",
        ghost: "hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-amber-500",
        destructive: "bg-rose-600 text-white hover:bg-rose-500 focus-visible:ring-rose-500",
        link: "text-amber-700 underline-offset-4 hover:underline",
        amber: "bg-amber-500 text-slate-950 hover:bg-amber-400 focus-visible:ring-amber-500 font-bold",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm",
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-2",
        "icon-sm": "h-8 w-8 p-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
        className: cn(
          buttonVariants({ variant, size, className }),
          (children.props as { className?: string })?.className
        ),
        ...props,
      });
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
