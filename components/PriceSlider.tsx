import { Slider, SliderProps } from "tamagui";

function PriceSlider({ children, ...props }: any) {
  return (
    <Slider
      defaultValue={[2500]}
      onValueChange={props.setPrice}
      value={props.price}
      max={5000}
      step={500}
      {...props}
    >
      <Slider.Track>
        <Slider.TrackActive />
      </Slider.Track>
      <Slider.Thumb bordered circular elevate index={0} />
      {children}
    </Slider>
  );
}
export default PriceSlider;
