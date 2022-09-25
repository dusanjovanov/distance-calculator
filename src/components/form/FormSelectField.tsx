import React from "react";
import { ErrorText } from "../ErrorText";
import { Label } from "../Label";
import { Select, SelectFieldProps } from "../Select";

export type FormSelectFieldProps<Item> = SelectFieldProps<Item> & {
  rootClassName?: string;
  labelText?: string;
  isLoading?: boolean;
  error?: string;
  labelErrorText?: string;
};

export const FormSelectField = <Item,>({
  rootClassName,
  labelText,
  isLoading,
  error,
  labelErrorText,
  ...props
}: FormSelectFieldProps<Item>) => {
  return (
    <div className={rootClassName}>
      {(labelText || labelErrorText) && (
        <Label className="mb-1" isLoading={isLoading}>
          {labelText}
          <span className="text-red-500">{labelErrorText}</span>
        </Label>
      )}
      <Select {...props} isError={!!error} />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
