import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  SafeAreaView,
  Animated,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";
import { useQuery } from "react-query";
import { ScrollView, Spinner, Text, XStack, YStack } from "tamagui";
import DynamicHeader from "../components/DynamicHeader";
import { FilterSheet } from "../components/FilterSheet";
import { VehicleCard } from "../components/VehicleCard";

export default function HomeScreen({ navigation }) {
  const [openFilters, setOpenFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCars, setFilteredCars] = useState([]);

  const [make, setMake] = useState(undefined);
  const [year, setYear] = useState(undefined);
  const [price, setPrice] = useState(undefined);

  const isFiltered = make || year || price || searchTerm !== "";
  let scrollOffsetY = useRef(new Animated.Value(0)).current;

  const getCars = async () => {
    const res = await fetch("https://myfakeapi.com/api/cars/");
    return res.json();
  };

  const { isLoading, isError, data, error } = useQuery("cars", getCars);
  const cars = data?.cars;

  const searchFilters = (car) => {
    return (
      car?.car?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car?.car_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Number(car.car_model_year) === Number(searchTerm)
    );
  };

  const allFilters = (car) => {
    return (
      (make ? car?.car?.toLowerCase() === make.toLowerCase() : true) &&
      (year ? car.car_model_year === Number(year) : true) &&
      (price ? Number(car.price.split("$")[1]) <= Number(price[0]) : true) &&
      searchFilters(car)
    );
  };

  useEffect(() => {
    if (searchTerm !== "" || make || year || price) {
      setFilteredCars(cars?.filter((car) => allFilters(car)));
    }
  }, [searchTerm, make, year, price]);

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

  const renderItem = useMemo(
    () =>
      ({ item }) =>
        <VehicleCard carData={item} navigation={navigation} />,
    []
  );

  return (
    <>
      {isLoading ? (
        renderLoadingSpinner()
      ) : (
        <View
          style={{
            backgroundColor: "#fff",
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
          }}
        >
          <FlashList
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
              { useNativeDriver: false }
            )}
            data={isFiltered ? filteredCars : cars}
            renderItem={renderItem}
            estimatedItemSize={200}
            ListHeaderComponent={
              <DynamicHeader
                animHeaderValue={scrollOffsetY}
                setOpenFilters={setOpenFilters}
                setSearchTerm={setSearchTerm}
                filters={[make, year, price]}
              />
            }
            removeClippedSubviews
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              console.log("end reached");
            }}
            ListEmptyComponent={
              <XStack
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 10,
                }}
              >
                <Text>No cars found</Text>
              </XStack>
            }
          />
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
        </View>
      )}
    </>
  );
}
