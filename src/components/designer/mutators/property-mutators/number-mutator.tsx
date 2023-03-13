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
  label?: string;
}

const NumberMutator = ({
  object,
  property,
  min,
  max,
  step,
  label,
  onChange,
  initialValue,
}: NumberMutatorProps) => {
  const initializer = initialValue ?? object[property] ?? 0;
  const [value, setValue] = useState<number>(initializer);
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
          alignItems={"center"}
        >
          <FormLabel
            display={"flex"}
            flex={1}
            textTransform={"capitalize"}
          >{`${label ?? property}`}</FormLabel>
          <Flex flex={1}>
            <Flex flex={3}>
              <Slider
                min={min}
                max={max}
                step={step ?? 1}
                initialValue={value}
                onChange={(value) => {
                  setValue(value);
                }}
              />
            </Flex>
            <Flex flex={1} ml={4}>
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
      <hr style={{marginTop: 10}}/>
    </>
  );
};

export default NumberMutator;
