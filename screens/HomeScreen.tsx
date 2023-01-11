import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Animated, StyleSheet } from "react-native";
import { ScrollView, XStack } from "tamagui";
import DynamicHeader from "../components/DynamicHeader";
import { FilterSheet } from "../components/FilterSheet";
import { VehicleCard } from "../components/VehicleCard";

export default function HomeScreen({ navigation }) {
  const [carData, setCarData] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://myfakeapi.com/api/cars/")
      .then((response) => response.json())
      .then((json) => {
        setCarData(json.cars.slice(0, 20));
      })
      .catch((error) => console.error(error));
  }, []);

  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  const filteredCars = carData.filter(
    (car) =>
      car.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.car_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.car_model_year === Number(searchTerm) ||
      car.car_color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.price.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <DynamicHeader
        animHeaderValue={scrollOffsetY}
        setOpenFilters={setOpenFilters}
        setSearchTerm={setSearchTerm}
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
      >
        <XStack $sm={{ flexDirection: "column" }} px="$2" w="100%" space>
          {(searchTerm === "" ? carData : filteredCars).map((car) => (
            <VehicleCard key={car.id} carData={car} navigation={navigation} />
          ))}
        </XStack>
        <FilterSheet
          setOpen={setOpenFilters}
          open={openFilters}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    margin: 0,
  },
  scrollText: {
    fontSize: 19,
    textAlign: "center",
    padding: 20,
    color: "#000",
  },
});

export const DATA = [
  {
    id: 1,
    title: "Modern JS: A curated collection",
  },
  {
    id: 2,
    title: "JavaScript notes for professionals",
  },
  {
    id: 3,
    title: "JavaScript: The Good Parts",
  },
  {
    id: 4,
    title: "JavaScript: The right way",
  },
  {
    id: 5,
    title: "Exploring ES6",
  },
  {
    id: 6,
    title: "JavaScript Enlightenment",
  },
  {
    id: 7,
    title: "You dont know JS",
  },
  {
    id: 8,
    title: "Learn JavaScript",
  },
  {
    id: 9,
    title: "JavaScript succintly",
  },
  {
    id: 10,
    title: "Human JavaScript",
  },
  {
    id: 11,
    title: "JavaScript design patterns",
  },
  {
    id: 12,
    title: "JS50: 50 illustrations in JS",
  },
  {
    id: 13,
    title: "Eloqent JavaScript",
  },
  {
    id: 14,
    title: "Practical ES6",
  },
  {
    id: 15,
    title: "Speaking JavaScript",
  },
];
