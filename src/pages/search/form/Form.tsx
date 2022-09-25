import { addDays, isDate } from "date-fns";
import React from "react";
import { createForm } from "react-nerd";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { City, getAllCities } from "../../../data";
import { useFormValuesFromParams } from "../../../utils";
import { DateOfTrip } from "./DateOfTrip";
import { FormCityField } from "./form-components/FormCityField";
import { IntermediateCities } from "./IntermediateCities";
import { NumberOfPassengers } from "./NumberOfPassengers";

type ExtractFieldKey<T> = T extends (args: { name: infer F }) => any
  ? F
  : unknown;

export type FieldKey = ExtractFieldKey<typeof useField>;

const formEmptyValues = {
  cityOrigin: null as City | null,
  intermediateCities: [] as (City | null)[],
  cityDestination: null as City | null,
  dateOfTrip: null as Date | null,
  numberOfPassengers: "",
};

export const { FormProvider, useField, useFormActions, useIsValid } =
  createForm({
    initialValues: formEmptyValues,
  });

const FormInner = () => {
  const { handleSubmit, resetForm } = useFormActions();
  const [allCities, setAllCities] = React.useState<City[]>([]);
  const [isAllCitiesLoading, setIsAllCitiesLoading] = React.useState(false);
  const formValues = useFormValuesFromParams();

  React.useEffect(() => {
    (async () => {
      setIsAllCitiesLoading(true);
      setAllCities(await getAllCities());
      setIsAllCitiesLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    if (formValues) {
      resetForm({ values: formValues });
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mx-auto max-w-[350px]"
      noValidate
    >
      <FormCityField
        name="cityOrigin"
        labelText="From"
        cities={allCities}
        isLoading={isAllCitiesLoading}
        rootClassName="mb-3"
      />
      <IntermediateCities
        cities={allCities}
        isLoading={isAllCitiesLoading}
        rootClassName="mb-3"
      />
      <FormCityField
        name="cityDestination"
        labelText="To"
        cities={allCities}
        isLoading={isAllCitiesLoading}
        rootClassName="mb-3"
      />
      <DateOfTrip rootClassName="mb-3" />
      <NumberOfPassengers rootClassName="mb-3" />
      <SubmitButton />
      {/* <Button onClick={() => resetForm({ values: formEmptyValues })}>
        Reset
      </Button> */}
    </form>
  );
};

const SubmitButton = () => {
  const isValid = useIsValid();

  return (
    <Button type="submit" disabled={!isValid}>
      Calculate
    </Button>
  );
};

export const Form = () => {
  const navigate = useNavigate();

  return (
    <FormProvider
      onSubmit={(data) => {
        navigate(`/result?${formValuesToUrlParams(data as any).toString()}`);
      }}
    >
      <FormInner />
      <div>
        <Link to={`?${formValuesToUrlParams(testSearchFormState)}`}>
          <Button>Test url params</Button>
        </Link>
        <Link to={""}>
          <Button>No params</Button>
        </Link>
      </div>
    </FormProvider>
  );
};

const formValuesToUrlParams = (formValues: {
  cityOrigin: City;
  intermediateCities: City[];
  cityDestination: City;
  dateOfTrip: Date;
  numberOfPassengers: number;
}) => {
  const obj = {} as any;

  if (formValues.cityOrigin) {
    obj.cityOrigin = JSON.stringify(formValues.cityOrigin);
  }

  if (Array.isArray(formValues.intermediateCities)) {
    obj.intermediateCities = JSON.stringify(formValues.intermediateCities);
  }

  if (formValues.cityDestination) {
    obj.cityDestination = JSON.stringify(formValues.cityDestination);
  }

  if (isDate(formValues.dateOfTrip)) {
    obj.dateOfTrip = formValues.dateOfTrip.getTime();
  }

  if (typeof formValues.numberOfPassengers === "number") {
    obj.numberOfPassengers = formValues.numberOfPassengers;
  }

  return new URLSearchParams(obj);
};

const testSearchFormState = {
  cityOrigin: { name: "Paris", coordinates: [1, 2] },
  intermediateCities: [
    { name: "Lyon", coordinates: [4.835659, 45.764043] },
    { name: "Toulouse", coordinates: [1.444209, 43.604652] },
  ],
  cityDestination: { name: "Strasbourg", coordinates: [7.752111, 48.573405] },
  dateOfTrip: addDays(new Date(), 1),
  numberOfPassengers: 2,
};
