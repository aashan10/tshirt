import { fabric } from "fabric";
import { Flex } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCanvas } from "@contexts/canvas-context";
import { Slider } from "@/components/slider";

interface NumberMutatorProps {
  object: fabric.Object;
  property?: keyof fabric.Object | any;
  min?: number;
  max?: number;
  step?: number;
  onChange?: CallableFunction;
  initialValue?: number;
}

const NumberMutator = ({
  object,
  property,
  min,
  max,
  step,
  onChange,
  initialValue,
}: NumberMutatorProps) => {
  const [value, setValue] = useState<number>(object[property] ?? initialValue);
  const { editor } = useCanvas();

  useEffect(() => {
    // @ts-ignore
    object.set(property, value);
    editor.renderAll();
    if (onChange) {
      onChange(value);
    }
  }, [value]);

  return (
    <>
      <Flex mt={2}>
        <FormControl
          id={`${object.type}_${property}`}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          <FormLabel
            display={"flex"}
            flex={1}
            textTransform={"capitalize"}
          >{`${property}`}</FormLabel>
          <Flex flex={1}>
            <Flex flex={3}>
              <Slider
                min={min}
                max={max}
                initialValue={value}
                onChange={(value) => {
                  setValue(value);
                }}
              />
            </Flex>
            <Flex flex={1} px={4}>
              <Input
                value={value}
                onChange={(v) => {
                  setValue(Number(v.target.value));
                }}
                type="number"
              />
            </Flex>
          </Flex>
        </FormControl>
      </Flex>
    </>
  );
};

export default NumberMutator;
