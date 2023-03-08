import { fabric } from "fabric";
import { Flex, Grid } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useCanvas } from "@contexts/canvas-context";
import React from "react";

interface ColorMutatorProps {
  object?: fabric.Object;
  property?: string;
  initialValue: string | fabric.Pattern | fabric.Gradient;
  onChange?: CallableFunction;
}
const pallettes = [
    ['#F2F2F2', '#E5E5E5', '#B2B2B2', '#666666', '#4D4D4D', '#000000'],
    ['#CDF1FF', '#9BDEFF', '#6AC6FF', '#45AEFF', '#0787FF', '#034DB7'],
    ['#FDE599', '#F9D166', '#F3BC3F', '#ec9d04', '#CA7F02', '#884C01'],
    ['#718995', '#36454F', '#273643', '#1B2938', '#111D2D', '#0A1425'],

];
const ColorMutator = ({
  object,
  property,
  onChange,
  initialValue,
}: ColorMutatorProps) => {
  const [value, setValue] = useState<string>(object ? object[property] : initialValue);
  const { editor } = useCanvas();
  const [isExpanded, setExpanded] = useState(false);
  const [rows, setRows] = useState(2);
  const ref = useRef(null);

  useEffect(() => {
    // @ts-ignore
    object?.set(property, value);
    editor?.renderAll();
    if (onChange) {
      onChange(value);
    }
  }, [value]);

  useEffect(() => {
    if (isExpanded) {
      setRows(pallettes.length - 1);
    } else {
      setRows(2);
    }
  }, [isExpanded]);

  return (
    <>
      <Flex mt={2} flex={1}>
        <FormControl
          display={"flex"}
          flexDirection={"column"}
          id={`${object?.type}_${property}`}
        >
          <FormLabel
            display={"flex"}
            flex={1}
            textTransform={"capitalize"}
          >{`${property} Color`}</FormLabel>
          <Flex my={4}>
            <Button
              onClick={() => {
                setValue("rgba(0,0,0,0)");
              }}
              borderWidth={0}
              borderColor={"black"}
              rounded={5}
            >
              Transparent
            </Button>

            <Button
              title="Choose Color"
              ml={7}
              onClick={() => {
                ref.current.click();
              }}
              borderWidth={2}
              borderColor={"black"}
              bg={value}
              _hover={{ bg: value }}
              rounded={50}
            ></Button>

            <Input
              type={"color"}
              ref={ref}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              hidden
            />
          </Flex>

          <Grid templateColumns={"repeat(6, 1fr)"} gap={6}>
            {pallettes.slice(0, rows).map((pallette, index) => {
              return (
                <React.Fragment key={index}>
                  {pallette.map((color, index) => {
                    return (
                      <Button
                        onClick={() => {
                          setValue(color);
                        }}
                        key={index}
                        borderWidth={0}
                        borderColor={"black"}
                        color={color}
                        bg={color}
                        _hover={{ bg: color }}
                        rounded={5}
                      ></Button>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </Grid>
          <Flex my={4}>
            <Button variant={'link'} onClick={() => {
                setExpanded(!isExpanded);
            }}>Show {isExpanded ? 'Less' : 'More'}</Button>
          </Flex>
        </FormControl>
      </Flex>
    </>
  );
};

export default ColorMutator;
