import { AnimatePresence } from "@tamagui/animate-presence";
import { ArrowLeft, ArrowRight } from "@tamagui/lucide-icons";
import { useRef, useState } from "react";
import { Button, Image, XStack, YStack, styled } from "tamagui";

const photo1 = "https://source.unsplash.com/400x411/?car";
const photo2 = "https://source.unsplash.com/400x412/?car";
const photo3 = "https://source.unsplash.com/400x413/?car";

export const images = [photo1, photo2, photo3].map((x) => x);

const YStackEnterable = styled(YStack, {
  variants: {
    isLeft: { true: { x: -300, opacity: 0 } },
    isRight: { true: { x: 300, opacity: 0 } },
  } as const,
});

export function ImageSlider() {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const enterVariant =
    direction === 1 || direction === 0 ? "isRight" : "isLeft";
  const exitVariant = direction === 1 ? "isLeft" : "isRight";

  const touchYRef = useRef(null);

  const handleTouchStart = (e) => {
    touchYRef.current = e.nativeEvent.pageX;
  };

  const handleTouchEnd = (e) => {
    if (touchYRef.current - e.nativeEvent.pageX > 20) {
      paginate(1);
    }
    if (touchYRef.current - e.nativeEvent.pageX < 20) {
      paginate(-1);
    }
  };

  return (
    <XStack ov="hidden" bc="#000" pos="relative" h={240} w="100%" ai="center">
      <AnimatePresence enterVariant={enterVariant} exitVariant={exitVariant}>
        <YStackEnterable key={page} animation="quick" fullscreen x={0} o={1}>
          <Image
            src={images[imageIndex]}
            width={420}
            height={420}
            als="center"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
        </YStackEnterable>
      </AnimatePresence>
    </XStack>
  );
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
