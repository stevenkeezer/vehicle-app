import React, { useEffect, useState } from "react";
import { Button, H3, H4, H5, H6, Image, YStack, Text } from "tamagui";
import { FontAwesome } from "@expo/vector-icons";

export default function DetailScreen({ route, navigation }) {
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
    <YStack>
      <Image
        src={{
          uri: "https://picsum.photos/200/300",
        }}
        width="100%"
        height="50%"
      />
      {carData.availability ? (
        <Button
          position="absolute"
          bc="white"
          w="23%"
          right="$3"
          mt="$7"
          size="$2"
          br="$10"
          fontWeight="bold"
          color="#2373f1"
          zIndex={1}
        >
          {carData.availability && "Available"}
        </Button>
      ) : (
        <Button
          right="$3"
          mb="$2"
          icon={<FontAwesome name="bell" size={15} color="gray" />}
          position="absolute"
          mt="$6"
          zIndex={1}
          color="gray"
        >
          Notify Avaliable
        </Button>
      )}
      <Button
        onPress={() => navigation.goBack()}
        position="absolute"
        zIndex={1}
        circular
        bg="black"
        top="$6"
        left="$3"
        p="$2"
      >
        <FontAwesome name="arrow-left" color="white" size={16} />
      </Button>
      <YStack p="$3">
        <H3>
          {carData.car_model_year} {carData.car} {carData.car_model}
        </H3>
        {carData.availability && (
          <Text>{carData.availability && "Available"}</Text>
        )}
        <Text>36 miles from you</Text>

        <YStack pt="$5">
          <Text fontWeight="bold" fontSize="$2" pb="$2" color="gray">
            Details
          </Text>
          <Text>{selectedCar?.DriveType}</Text>
          <Text>{selectedCar?.Manufacturer}</Text>
          <Text>{selectedCar?.VehicleType}</Text>
        </YStack>
      </YStack>
    </YStack>
  );
}
