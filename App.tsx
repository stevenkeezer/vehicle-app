import { StyleSheet } from "react-native";
import { TamaguiProvider, Text } from "tamagui";
import appConfig from "./tamagui.config";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import { QueryClient, QueryClientProvider } from "react-query";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  if (!loaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={appConfig}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "transparent",
              },
            }}
          >
            <Stack.Screen
              name="Cars"
              component={HomeScreen}
              // add icons left and right to header
              options={{
                headerLeft: () => (
                  <Ionicons name="menu" size={24} color="gray" />
                ),
                headerRight: () => (
                  <Ionicons name="notifications" size={24} color="gray" />
                ),
              }}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Details"
              component={DetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
