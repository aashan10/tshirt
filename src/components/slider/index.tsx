import {
  Slider as ChakraSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface SliderProps {
  onChange?: CallableFunction;
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

const Slider = ({ initialValue, onChange, min, max, step }: SliderProps) => {
  return (
    <ChakraSlider
      min={min}
      max={max}
      step={step}
      onChange={(value) => onChange(value)}
      defaultValue={initialValue}
    >
      <SliderTrack bg={"#fbd7d7"}>
        <SliderFilledTrack bg={"#f36347"} />
      </SliderTrack>
      <SliderThumb borderWidth={2} borderColor={"black"}>
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          className="css-tq928n"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M7 18h2V6H7v12zm4 4h2V2h-2v20zm-8-8h2v-4H3v4zm12 4h2V6h-2v12zm4-8v4h2v-4h-2z"></path>
        </svg>
      </SliderThumb>
    </ChakraSlider>
  );
};

export { Slider };
