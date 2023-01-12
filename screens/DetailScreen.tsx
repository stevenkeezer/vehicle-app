import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Image } from "tamagui";

export default function DetailScreen({ route }) {
  let carData = route.params.carData;
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { car_vin } = carData;
      const url =
        car_vin &&
        `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${car_vin}?format=json`;

      const response = await fetch(url);
      const json = await response.json();
      setSelectedCar(json.Results[0]);
    }
    fetchData();
  }, [carData]);

  return (
    <View style={{ padding: 14 }}>
      <Image
        src={{
          uri: "https://picsum.photos/200/300",
        }}
        style={{ borderRadius: 10 }}
        width="100%"
        height="50%"
      />
      <Text>Detail Screen</Text>
      <Text>{selectedCar?.DriveType}</Text>
      <Text>{selectedCar?.Manufacturer}</Text>
      <Text>{selectedCar?.VehicleType}</Text>
    </View>
  );
}
