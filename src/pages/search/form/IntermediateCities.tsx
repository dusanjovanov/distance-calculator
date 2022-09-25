import React from "react";
import { append, remove, replace } from "react-nerd";
import { OutlinedButton } from "../../../components/Button";
import { Label } from "../../../components/Label";
import { City } from "../../../data";
import { CityField } from "./CityField";
import { useField } from "./Form";
import { isObject } from "fun-validation";
import { useSyncQueryParamWithField } from "../../../utils";

type Props = {
  cities: City[];
  rootClassName?: string;
  isLoading?: boolean;
};

export const IntermediateCities = ({
  cities,
  rootClassName,
  isLoading,
}: Props) => {
  const { value, setValue, validation } = useField({
    name: "intermediateCities",
    validate: (value) => value.map((item) => isObject(item)),
  });

  useSyncQueryParamWithField("intermediateCities", value);

  let content: React.ReactNode = (
    <div className="text-sm text-gray-500">No intermediate cities added.</div>
  );

  if (value.length > 0) {
    content = value.map((city, index) => {
      const itemError = validation?.[index] === false ? "Required" : undefined;
      return (
        <div
          key={`${city?.name ?? ""}${index}`}
          className="flex items-start gap-3 mb-3"
        >
          <div className="flex-1">
            <CityField
              value={city}
              onChange={(city) => {
                setValue(replace(value, index, city));
              }}
              cities={cities}
              error={itemError}
            />
          </div>
          <OutlinedButton
            className="bg-white border border-gray-400 hover:bg-gray-200 active:bg-gray-200 hover:text-black active:text-black"
            title="Remove city"
            onClick={() => {
              setValue(remove(value, index));
            }}
          >
            —
          </OutlinedButton>
        </div>
      );
    });
  }

  return (
    <div className={rootClassName}>
      <div className="mb-2">
        <Label className="mb-1" isLoading={isLoading}>
          Intermediate cities
        </Label>
        {content}
      </div>
      <OutlinedButton
        onClick={() => {
          setValue(append(value, null));
        }}
      >
        Add city +
      </OutlinedButton>
    </div>
  );
};
