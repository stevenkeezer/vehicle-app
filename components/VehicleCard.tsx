import {
  Button,
  Card,
  H4,
  Image,
  Paragraph,
  Separator,
  XStack,
  YStack,
} from "tamagui";
import { FontAwesome } from "@expo/vector-icons";

export function VehicleCard({ carData, navigation }) {
  return (
    <Card
      onPress={() => navigation.navigate("Details", { carData })}
      theme="dark"
      mx="$3"
      mt="$3"
      br="$3"
      bordered
      borderWidth={1}
      borderColor="lightgray"
      elevate
    >
      <Card.Header pb="$16" pr="$3" pt="$3" ai="flex-end">
        <YStack>
          {carData.availability ? (
            <Button
              position="absolute"
              bc="white"
              w="23%"
              size="$2"
              br="$10"
              fontWeight="bold"
              color="#2373f1"
              right={0}
            >
              {carData.availability && "Available"}
            </Button>
          ) : (
            <Button
              right={0}
              top={-18}
              mb="$2"
              icon={<FontAwesome name="bell" size={15} color="gray" />}
              position="absolute"
              mt="$13"
              color="gray"
            >
              Notify Avaliable
            </Button>
          )}
        </YStack>
      </Card.Header>

      <Card.Footer bc="white">
        <XStack
          flex={1}
          flexWrap="wrap"
          backgroundColor="#fff"
          hoverStyle={{
            backgroundColor: "red",
          }}
          $gtSm={{
            flexDirection: "column",
            flexWrap: "nowrap",
          }}
        >
          <YStack w="100%">
            <YStack pt="$3" w="100%" pl="$4" pb="$4">
              <H4>{carData.car}</H4>
              <Paragraph>
                {carData.car_model_year} {carData.car_model} located in the city
                of San Franscisco
              </Paragraph>
            </YStack>
            <Separator />
            <XStack
              px="$4"
              py="$3"
              style={{ justifyContent: "space-between" }}
              h={73}
              w="100%"
              space
            >
              <YStack>
                <Paragraph color="gray">Price</Paragraph>
                <Paragraph>{carData.price}</Paragraph>
              </YStack>

              <YStack>
                <Paragraph color="gray">Model</Paragraph>
                <Paragraph>
                  {carData.car_model}
                  {carData.car_model_year}
                </Paragraph>
              </YStack>

              <YStack>
                <Paragraph color="gray">Color</Paragraph>
                <Paragraph>{carData.car_color}</Paragraph>
              </YStack>
            </XStack>
          </YStack>
        </XStack>
      </Card.Footer>
      <Card.Background>
        <Image
          pos="absolute"
          als="center"
          width="100%"
          height={170}
          src={`https://picsum.photos/500/220?random=${carData.id}`}
        />
      </Card.Background>
    </Card>
  );
}
