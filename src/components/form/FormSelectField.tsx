import React from "react";
import { ErrorText } from "../ErrorText";
import { Label } from "../Label";
import { Select, SelectFieldProps } from "../Select";

export type FormSelectFieldProps<Item> = SelectFieldProps<Item> & {
  rootClassName?: string;
  labelText?: string;
  isLoading?: boolean;
  error?: string;
};

export const FormSelectField = <Item,>({
  rootClassName,
  labelText,
  isLoading,
  error,
  ...props
}: FormSelectFieldProps<Item>) => {
  return (
    <div className={rootClassName}>
      {labelText && (
        <Label className="mb-1" isLoading={isLoading}>
          {labelText}
        </Label>
      )}
      <Select {...props} />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
