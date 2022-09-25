import React from "react";
import { twMerge } from "tailwind-merge";
import { Spinner } from "./Spinner";

type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  isLoading?: boolean;
};

export const Label = ({
  children,
  className,
  isLoading,
  ...props
}: LabelProps) => {
  return (
    <label
      className={twMerge("flex font-semibold text-sm gap-1", className)}
      {...props}
    >
      {children}
      {isLoading && <Spinner />}
    </label>
  );
};
