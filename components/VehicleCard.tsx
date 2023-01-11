import { Button, Card, CardProps, H2, Image, Paragraph, XStack } from "tamagui";

export function VehicleCard({ carData, navigation }) {
  return (
    <Card
      onPress={() => navigation.navigate("Details", { carData })}
      theme="dark"
      elevate
      size="$4"
      bordered
    >
      <Card.Header padded>
        <H2>{carData.car}</H2>
        <Paragraph theme="alt2">Now available</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack f={1} />
        <Button br="$10">Purchase</Button>
      </Card.Footer>
      <Card.Background>
        {/* <Image
          pos="absolute"
          width="100%"
          height={300}
          resizeMode="contain"
          als="center"
          src="https://picsum.photos/seed/picsum/500/500"
        /> */}
      </Card.Background>
    </Card>
  );
}
