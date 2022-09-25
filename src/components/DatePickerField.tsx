import { Popover } from "@headlessui/react";
import { format } from "date-fns";
import Calendar from "react-calendar";
import { Input } from "./Input";

export type DatePickerFieldProps = {
  value: Date | null;
  onChange: (value: Date) => void;
  minDate?: Date;
};

export const DatePickerField = ({
  value,
  onChange,
  minDate,
}: DatePickerFieldProps) => {
  return (
    <Popover className="relative">
      <Popover.Button className="w-full">
        <Input
          value={value ? format(value, "MM/dd/yyyy") : ""}
          onChange={() => {}}
        />
      </Popover.Button>
      <Popover.Panel className="absolute z-50 mt-1">
        <Calendar
          value={value}
          onChange={onChange}
          className="my-calendar"
          tileClassName="h-[35px] rounded-md hover:bg-gray-200"
          minDate={minDate}
        />
      </Popover.Panel>
    </Popover>
  );
};
