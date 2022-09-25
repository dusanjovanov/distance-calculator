import React from "react";

export const AppBar = ({ children }: { children?: React.ReactNode }) => {
  return <div className="bg-gray-800 py-2">{children}</div>;
};
