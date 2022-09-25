import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const defaultButtonClassName =
  "bg-blue-600 text-white px-3 py-1.5 border border-transparent text-md rounded-md hover:bg-blue-700 active:bg-blue-700 text-sm";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", children, ...props }, ref) => {
    return (
      <button
        {...props}
        className={twMerge(defaultButtonClassName, className)}
        type={type}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export const OutlinedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        {...props}
        className={twMerge(
          "bg-white text-black border border-blue-600 hover:bg-blue-600 active:bg-blue-600 hover:text-white active:text-white",
          className
        )}
        ref={ref}
      >
        {children}
      </Button>
    );
  }
);
