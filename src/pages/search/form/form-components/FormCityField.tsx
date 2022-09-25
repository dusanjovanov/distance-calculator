import { isObject } from "fun-validation";
import { useSyncQueryParamWithField } from "../../../../utils";
import { CityField, CityFieldProps } from "../CityField";
import { useField } from "../Form";

type Props = Pick<
  CityFieldProps,
  "isLoading" | "cities" | "labelText" | "rootClassName"
> & {
  name: "cityOrigin" | "cityDestination";
};

export const FormCityField = ({ name, ...props }: Props) => {
  const { value, setValue, validation } = useField({
    name,
    validate: (value) => isObject(value),
  });
  useSyncQueryParamWithField(name, value);

  const error = validation === false ? "Required" : undefined;

  return (
    <div>
      <CityField
        {...props}
        value={value}
        onChange={setValue}
        error={error}
        {...props}
      />
    </div>
  );
};
