import React from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const defaultInputClassName =
  "border border-gray-400 px-3 py-2 rounded-md outline-2 outline-blue-500 outline-offset-[-1px] focus:outline w-full text-sm h-full";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        className={twMerge(defaultInputClassName, className)}
        ref={ref}
      />
    );
  }
);
