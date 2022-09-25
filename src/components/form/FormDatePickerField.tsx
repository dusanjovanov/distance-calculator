import React from "react";
import { DatePickerField, DatePickerFieldProps } from "../DatePickerField";
import { ErrorText } from "../ErrorText";
import { Label } from "../Label";

export type FormDatePickerFieldProps = DatePickerFieldProps & {
  labelText?: string;
  rootClassName?: string;
  error?: string;
};

export const FormDatePickerField = ({
  labelText,
  error,
  rootClassName,
  ...props
}: FormDatePickerFieldProps) => {
  return (
    <div className={rootClassName}>
      {labelText && <Label className="mb-1">{labelText}</Label>}
      <DatePickerField {...props} isError={!!error} />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
