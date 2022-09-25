import React from "react";
import { createForm } from "react-nerd";
import { Button } from "../../../components/Button";
import { City, getAllCities } from "../../../data";
import { DateOfTrip } from "./DateOfTrip";
import { FormCityField } from "./form-components/FormCityField";
import { IntermediateCities } from "./IntermediateCities";
import { NumberOfPassengers } from "./NumberOfPassengers";

type ExtractFieldKey<T> = T extends (args: { name: infer F }) => any
  ? F
  : unknown;

export type FieldKey = ExtractFieldKey<typeof useField>;

export const { FormProvider, useField, useFormActions } = createForm({
  initialValues: {
    cityOrigin: null as City | null,
    intermediateCities: [null, null, null] as (City | null)[],
    cityDestination: null as City | null,
    dateOfTrip: null as Date | null,
    numberOfPassengers: "2",
  },
});

const FormInner = () => {
  const { handleSubmit } = useFormActions();
  const [allCities, setAllCities] = React.useState<City[]>([]);
  const [isAllCitiesLoading, setIsAllCitiesLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      setIsAllCitiesLoading(true);
      setAllCities(await getAllCities());
      setIsAllCitiesLoading(false);
    })();
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
      <Button type="submit">Calculate</Button>
    </form>
  );
};

export const Form = () => {
  return (
    <FormProvider
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      <FormInner />
    </FormProvider>
  );
};
