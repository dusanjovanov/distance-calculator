import React from "react";

type ErrorTextProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const ErrorText = ({ children, ...props }: ErrorTextProps) => {
  return (
    <div className="text-red-500 text-sm" {...props}>
      {children}
    </div>
  );
};
