import React from "react";
import { FieldKey, useField } from "../../pages/search/form/Form";
import { ErrorText } from "../ErrorText";
import { Input } from "../Input";
import { Label } from "../Label";
import { twMerge } from "tailwind-merge";
import { useSyncQueryParamWithField } from "../../utils";

type Props = {
  id: string;
  name: FieldKey;
  labelText?: string;
  rootClassName?: string;
  validate?: (value: any) => any;
  getError?: (validation: any) => string | undefined;
  inputProps?: Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "ref"
  >;
};

export const FormNumberField = ({
  id,
  name,
  labelText,
  rootClassName,
  validate,
  getError,
  inputProps,
}: Props) => {
  const { value, setValue, validation } = useField({
    name,
    validate,
  });

  useSyncQueryParamWithField(name, value);

  const error = getError && getError(validation);

  return (
    <div className={rootClassName}>
      {labelText && (
        <Label className="mb-1" htmlFor={id}>
          {labelText}
        </Label>
      )}
      <Input
        id={id}
        type="number"
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        className={twMerge(!!error && "border-red-500")}
        {...inputProps}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </div>
  );
};
