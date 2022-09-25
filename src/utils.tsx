import { isDate } from "date-fns";
import React from "react";
import { useSearchParams } from "react-router-dom";

export const useSyncQueryParamWithField = (name: string, value: any) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const prevValue = React.useRef(value);

  React.useEffect(() => {
    if (value === prevValue.current) return;
    prevValue.current = value;
    if (value == null) {
      if (searchParams.has(name)) {
        searchParams.delete(name);
        setSearchParams(searchParams);
      }
      return;
    }
    let urlValue;
    if (typeof value === "string") {
      urlValue = value;
    } else if (Array.isArray(value)) {
      const filteredArray = value.filter(Boolean);
      if (filteredArray.length > 0) {
        urlValue = JSON.stringify(filteredArray);
      }
    } else if (isDate(value)) {
      urlValue = value.getTime();
    } else {
      urlValue = JSON.stringify(value.name);
    }
    if (urlValue == null) {
      if (searchParams.has(name)) {
        searchParams.delete(name);
        setSearchParams(searchParams);
      }
      return;
    }
    searchParams.set(name, urlValue);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, value, name]);
};

export const useFormValuesFromParams = () => {
  const [searchParams] = useSearchParams();

  const result = {} as any;

  for (const [name, value] of searchParams.entries()) {
    if (value == null) continue;

    const parsed = tryParse(value);

    if (parsed == null) continue;

    let finalValue = parsed;

    if (name === "dateOfTrip") {
      finalValue = new Date(parsed);
    }

    result[name] = finalValue;
  }

  return result;
};

export const tryParse = (param: string) => {
  try {
    return JSON.parse(param);
  } catch (err) {
    return null;
  }
};
