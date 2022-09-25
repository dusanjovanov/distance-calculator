import React from "react";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const PageHeader = ({ children, ...props }: Props) => {
  return (
    <h1 {...props} className="text-3xl font-bold text-white text-center">
      {children}
    </h1>
  );
};
