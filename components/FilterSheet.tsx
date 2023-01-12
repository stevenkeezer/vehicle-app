import { Sheet } from "@tamagui/sheet";
import { useRef, useState } from "react";
import { Button, XStack } from "tamagui";
import { Dropdown } from "./Dropdown";
import PriceSlider from "./PriceSlider";

export const FilterSheet = ({
  open,
  setOpen,
  make,
  setMake,
  year,
  setYear,
  price,
  setPrice,
}) => {
  const [position, setPosition] = useState(0);
  const [modal, setModal] = useState(true);

  return (
    <>
      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        snapPoints={[50]}
        dismissOnSnapToBottom
        position={position}
        onPositionChange={setPosition}
        zIndex={100_000}
      >
        <Sheet.Overlay style={{ backgroundColor: "rgba(0,0,0,0.5)" }} />
        <Sheet.Handle />
        <Sheet.Frame
          style={{ borderTopLeftRadius: 30, borderTopRightRadius: 20 }}
          f={1}
          p="$4"
          space="$5"
        >
          <Button size="$4" onPress={() => setOpen(false)}>
            Close
          </Button>
          <XStack space>
            <Dropdown val={year} setVal={setYear} data={years} label="Year" />
            <Dropdown val={make} setVal={setMake} data={makes} label="Make" />
          </XStack>
          <PriceSlider width="100%" price={price} setPrice={setPrice} />
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

const years = [
  { name: "2021" },
  { name: "2020" },
  { name: "2019" },
  { name: "2018" },
  { name: "2017" },
  { name: "2016" },
  { name: "2015" },
  { name: "2014" },
  { name: "2013" },
  { name: "2012" },
  { name: "2011" },
  { name: "2010" },
  { name: "2009" },
  { name: "2008" },
  { name: "2007" },
  { name: "2006" },
  { name: "2005" },
  { name: "2004" },
  { name: "2003" },
  { name: "2002" },
  { name: "2001" },
  { name: "2000" },
  { name: "1999" },
  { name: "1998" },
  { name: "1997" },
  { name: "1996" },
  { name: "1995" },
  { name: "1994" },
  { name: "1993" },
  { name: "1992" },
  { name: "1991" },
  { name: "1990" },
  { name: "1989" },
  { name: "1988" },
  { name: "1987" },
  { name: "1986" },
  { name: "1985" },
  { name: "1984" },
  { name: "1983" },
  { name: "1982" },
  { name: "1981" },
];

const makes = [
  { name: "Acura" },
  { name: "Alfa Romeo" },
  { name: "Aston Martin" },
  { name: "Audi" },
  { name: "Bentley" },
  { name: "BMW" },
  { name: "Bugatti" },
  { name: "Buick" },
  { name: "Cadillac" },
  { name: "Chevrolet" },
  { name: "Chrysler" },
  { name: "Dodge" },
  { name: "Ferrari" },
  { name: "Fiat" },
  { name: "Ford" },
  { name: "Genesis" },
  { name: "GMC" },
  { name: "Honda" },
  { name: "Hyundai" },
  { name: "Infiniti" },
  { name: "Jaguar" },
  { name: "Jeep" },
  { name: "Kia" },
  { name: "Lamborghini" },
  { name: "Land Rover" },
  { name: "Lexus" },
  { name: "Lincoln" },
  { name: "Lotus" },
  { name: "Maserati" },
  { name: "Mazda" },
  { name: "McLaren" },
  { name: "Mercedes-Benz" },
  { name: "Mini" },
  { name: "Mitsubishi" },
  { name: "Nissan" },
  { name: "Polestar" },
  { name: "Porsche" },
  { name: "Ram" },
  { name: "Rolls-Royce" },
  { name: "Scion" },
  { name: "Smart" },
  { name: "Subaru" },
  { name: "Tesla" },
  { name: "Toyota" },
  { name: "Volkswagen" },
  { name: "Volvo" },
];
