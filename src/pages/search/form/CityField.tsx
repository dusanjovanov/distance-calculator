import React from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  FormSelectField,
  FormSelectFieldProps,
} from "../../../components/form/FormSelectField";
import { City, searchCitiesByName } from "../../../data";

export type CityFieldProps = Pick<
  FormSelectFieldProps<City>,
  "isLoading" | "error"
> & {
  value: City | null;
  onChange: (value: City | null) => void;
  cities: City[];
  labelText?: string;
  placeholder?: string;
  rootClassName?: string;
  comboboxClassName?: string;
};

export const CityField = ({
  value,
  onChange,
  cities,
  isLoading,
  labelText,
  rootClassName,
  comboboxClassName,
  error,
}: CityFieldProps) => {
  const [isSearchLoading, setIsLoading] = React.useState(false);
  const [filteredCities, setFilteredCities] = React.useState<City[]>([]);
  const [apiError, setApiError] = React.useState<Error | null>(null);
  const refTimeout = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    setFilteredCities(cities);
  }, [cities]);

  React.useEffect(() => {
    if (apiError !== null) {
      refTimeout.current = setTimeout(() => setApiError(null), 2000);
    }
    return () => {
      clearTimeout(refTimeout.current);
    };
  }, [apiError]);

  const onSearch = useDebouncedCallback(async (search: string) => {
    if (search.length === 0) {
      return setFilteredCities(cities);
    }
    setApiError(null);
    setIsLoading(true);
    try {
      const result = await searchCitiesByName(search ?? "");
      setFilteredCities(result);
    } catch (err) {
      setApiError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  return (
    <FormSelectField
      value={value}
      onChange={(value) => {
        onChange(value);
        setApiError(null);
      }}
      items={filteredCities}
      itemToString={(city) => city?.name ?? ""}
      isLoading={isLoading || isSearchLoading}
      onSearch={onSearch}
      labelText={labelText}
      placeholder="Select a city..."
      rootClassName={rootClassName}
      comboboxClassName={comboboxClassName}
      error={error}
      labelErrorText={apiError?.message}
    />
  );
};
