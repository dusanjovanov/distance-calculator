import { AppBar } from "../components/AppBar";
import { PageHeader } from "../components/PageHeader";
import { useFormValuesFromParams } from "../utils";
import distance from "@turf/distance";

export const Result = () => {
  const formValues = useFormValuesFromParams();

  console.log(formValues);

  if (
    !formValues.cityOrigin ||
    !formValues.cityDestination ||
    // !formValues.numberOfPassengers ||
    !formValues.dateOfTrip
  )
    return <h1>Incorrent URL</h1>;

  const { cityOrigin, cityDestination, intermediateCities } = formValues;

  const totalDistance = distance(
    cityOrigin.coordinates,
    cityDestination.coordinates,
    { units: "kilometers" }
  );

  const allCities = [cityOrigin, ...intermediateCities, cityDestination];

  const renderIntermediate = () => {
    if (allCities.length < 3) return;
    const toRender = [];
    for (let i = 0; i < allCities.length; i++) {
      const city = allCities[i];
      const nextCity = allCities[i + 1];
      if (!city || !nextCity) continue;
      toRender.push(
        <div key={i}>
          {city.name} ⟶ {nextCity.name} (
          {formatDistance(distance(city.coordinates, nextCity.coordinates))})
        </div>
      );
    }
    return toRender;
  };

  return (
    <div>
      <AppBar>
        <PageHeader>Result</PageHeader>
      </AppBar>

      <div>Start: {cityOrigin.name}</div>
      <div>{renderIntermediate()}</div>
      <div>Destination: {cityDestination.name}</div>
      <div>Total distance: {formatDistance(totalDistance)}</div>
    </div>
  );
};

const formatDistance = (n: number) => {
  return `${n.toFixed(2)}km`;
};
