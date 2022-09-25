import { AppBar } from "../components/AppBar";
import { PageHeader } from "../components/PageHeader";
import { useFormValuesFromParams } from "../utils";
import turfDistance from "@turf/distance";
import React from "react";
import { format } from "date-fns";

export const Result = () => {
  const formValues = useFormValuesFromParams();

  const {
    cityOrigin,
    cityDestination,
    intermediateCities,
    numberOfPassengers,
    dateOfTrip,
  } = formValues;

  const { totalDistance, route } = React.useMemo(() => {
    const allCities = [cityOrigin, ...intermediateCities, cityDestination];
    let totalDistance = 0;
    const route = [] as any[];
    for (let i = 0; i < allCities.length; i++) {
      const city = allCities[i];
      const nextCity = allCities[i + 1];
      if (!city || !nextCity) continue;
      const distance = turfDistance(city.coordinates, nextCity.coordinates, {
        units: "kilometers",
      });
      totalDistance += distance;
      route.push({
        city1: city,
        city2: nextCity,
        distance: distance,
      });
    }
    return {
      totalDistance,
      route,
    };
  }, [cityOrigin, intermediateCities, cityDestination]);

  if (Object.values(formValues).some((v) => v == null))
    return <h1>Incorrent URL</h1>;

  return (
    <div>
      <AppBar>
        <PageHeader>Result</PageHeader>
      </AppBar>

      <div className="font-bold bg-yellow-500">
        <span className="font-bold">Start:</span> {cityOrigin.name}
      </div>
      <div>
        {route.map(({ city1, city2, distance: _distance }, index) => {
          return (
            <div key={index}>
              {city1.name} → {city2.name}{" "}
              ({formatDistance(_distance)})
            </div>
          );
        })}
      </div>
      <div className="font-bold bg-green-500">
        Destination: {cityDestination.name}
      </div>
      <div className="border border-gray-400">
        Total distance: {formatDistance(totalDistance)}
      </div>
      <div>Number of passengers: {numberOfPassengers}</div>
      <div>Date of trip: {format(dateOfTrip, "MM/dd/yyyy")}</div>
    </div>
  );
};

const formatDistance = (n: number) => {
  return `${n.toFixed(2)}km`;
};
