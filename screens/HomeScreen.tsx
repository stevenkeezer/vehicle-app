import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, Animated, StyleSheet } from "react-native";
import { ScrollView, Spinner, XStack } from "tamagui";
import DynamicHeader from "../components/DynamicHeader";
import { FilterSheet } from "../components/FilterSheet";
import { VehicleCard } from "../components/VehicleCard";

export default function HomeScreen({ navigation }) {
  const [carData, setCarData] = useState([]);
  const [openFilters, setOpenFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingData, setLoadingData] = useState(true);

  const [make, setMake] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [price, setPrice] = useState(undefined);

  const isFiltered = (!make && !year && !price) || false;
  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setLoadingData(true);
    fetch("https://myfakeapi.com/api/cars/")
      .then((response) => response.json())
      .then((json) => {
        setCarData(json.cars.slice(0, 20));
        setLoadingData(false);
      })
      .catch((error) => setLoadingData(false));
  }, []);

  const searchFilters = (car) => {
    return (
      car.car.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.car_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.car_model_year === Number(searchTerm) ||
      car.car_color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.price.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  let filteredCars = carData.filter(
    (car) =>
      (make ? car.car.toLowerCase() === make.toLowerCase() : true) &&
      (year ? car.car_model_year === Number(year) : true) &&
      (price ? Number(car.price.split("$")[1]) <= Number(price[0]) : true) &&
      (searchTerm ? searchFilters(car) : true)
  );

  const renderLoadingSpinner = () => (
    <Spinner
      size="small"
      color="#000"
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 10,
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <DynamicHeader
        animHeaderValue={scrollOffsetY}
        setOpenFilters={setOpenFilters}
        setSearchTerm={setSearchTerm}
        filters={[make, year, price]}
      />
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
      >
        {loadingData ? (
          renderLoadingSpinner()
        ) : (
          <>
            <XStack $sm={{ flexDirection: "column" }} w="100%" pt="$2" space>
              {(searchTerm === "" && isFiltered ? carData : filteredCars).map(
                (car) => (
                  <VehicleCard
                    key={car.id}
                    carData={car}
                    navigation={navigation}
                  />
                )
              )}
            </XStack>
            <FilterSheet
              setOpen={setOpenFilters}
              open={openFilters}
              make={make}
              setMake={setMake}
              year={year}
              setYear={setYear}
              price={price}
              setPrice={setPrice}
            />
          </>
        )}
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
