import { addDays, isDate, isFuture } from "date-fns";
import {
  FormDatePickerField,
  FormDatePickerFieldProps,
} from "../../../components/form/FormDatePickerField";
import { useField } from "./Form";

type Props = Pick<FormDatePickerFieldProps, "rootClassName">;

export const DateOfTrip = (props: Props) => {
  const { value, setValue, validation } = useField({
    name: "dateOfTrip",
    validate: (value) => isDate(value) && isFuture(value as Date),
  });

  const error =
    validation === false ? "You must select a future date." : undefined;

  return (
    <FormDatePickerField
      value={value}
      onChange={setValue}
      labelText="Date of trip"
      minDate={addDays(new Date(), 1)}
      error={error}
      {...props}
    />
  );
};
