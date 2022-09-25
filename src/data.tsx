export const cities = [
  { name: "Paris", coordinates: [2.326424, 48.848826] },
  { name: "Marseille", coordinates: [5.36978, 43.296482] },
  { name: "Lyon", coordinates: [4.835659, 45.764043] },
  { name: "Toulouse", coordinates: [1.444209, 43.604652] },
  { name: "Nice", coordinates: [7.261953, 43.710173] },
  { name: "Nantes", coordinates: [-1.553621, 47.218371] },
  { name: "Strasbourg", coordinates: [7.752111, 48.573405] },
  { name: "Montpellier", coordinates: [3.876716, 43.610769] },
  { name: "Bordeaux", coordinates: [-0.57918, 44.837789] },
  { name: "Lille", coordinates: [3.057256, 50.62925] },
  { name: "Rennes", coordinates: [-1.677793, 48.117266] },
  { name: "Reims", coordinates: [4.031696, 49.258329] },
  { name: "Le Havre", coordinates: [0.107929, 49.49437] },
  { name: "Saint-Étienne", coordinates: [4.387178, 45.439695] },
  { name: "Toulon", coordinates: [5.928, 43.124228] },
  { name: "Angers", coordinates: [-0.563166, 47.478419] },
  { name: "Grenoble", coordinates: [5.724524, 45.188529] },
  { name: "Dijon", coordinates: [5.04148, 47.322047] },
  { name: "Nîmes", coordinates: [4.360054, 43.836699] },
  { name: "Aix-en-Provence", coordinates: [5.447427, 43.529742] },
];

export type City = typeof cities[number];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const getAllCities = async () => {
  await sleep(500);
  return cities;
};

export const searchCitiesByName = async (searchInput: string) => {
  await sleep(500);
  if (searchInput === "fail") {
    throw new Error(`You entered the search term "fail"`);
  }
  return cities.filter(
    (city) => city.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
  );
};
