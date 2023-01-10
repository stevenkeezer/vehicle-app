import React from "react";
import { Text, View } from "react-native";
import { Button, Circle, ScrollView, Square, XStack } from "tamagui";
import { BookingSheet } from "../components/BookingSheet";
import { VehicleCard } from "../components/VehicleCard";

export default function HomeScreen({ navigation }) {
  // create a hash map for carData
  const [carData, setCarData] = React.useState([]);

  React.useEffect(() => {
    fetch("https://myfakeapi.com/api/cars/")
      .then((response) => response.json())
      .then((json) => {
        console.log(json.cars, "JSON");
        setCarData(json.cars);
      })
      .catch((error) => console.error(error));
  }, []);

  // console.log(carData);

  return (
    <View>
      <Button
        onPress={() => navigation.navigate("Second", { language: "franch" })}
      >
        Navigatie to second screen
      </Button>

      <ScrollView horizontal w="100%" bc="$background" p="$4" br="$4">
        <XStack flexWrap="wrap" ai="center" jc="center">
          <VehicleCard />
          <VehicleCard />
          <VehicleCard />
          <VehicleCard />
        </XStack>

        <XStack flexWrap="wrap" ai="center" jc="center">
          {carData.map((car) => (
            <Text key={car.id}>{car.car_color}a</Text>
          ))}
        </XStack>
      </ScrollView>
    </View>
  );
}
