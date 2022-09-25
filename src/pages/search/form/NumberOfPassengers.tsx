import React from "react";
import { FormNumberField } from "../../../components/form/FormNumberField";
import {
  isStringLongerThan,
  isInteger,
  isNumberMoreThan,
} from "fun-validation";

type Props = {
  rootClassName?: string;
};

export const NumberOfPassengers = ({ rootClassName }: Props) => {
  return (
    <FormNumberField
      id="numberOfPassengers"
      name="numberOfPassengers"
      labelText="Number of passengers"
      inputProps={{
        min: 1,
        max: 50,
        step: 1,
      }}
      validate={(value: string) => {
        return {
          required: isStringLongerThan(0)(value),
          positiveInteger:
            isInteger(parseFloat(value as string)) &&
            isNumberMoreThan(0)(value),
        };
      }}
      getError={(validation) => {
        return validation?.required === false
          ? "Required"
          : validation?.positiveInteger === false
          ? "Must be a positive integer"
          : undefined;
      }}
      rootClassName={rootClassName}
    />
  );
};
