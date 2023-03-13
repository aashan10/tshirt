import { fabric } from "fabric";
import { Flex, Grid } from "@chakra-ui/layout";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import theme from "@themes/theme";
import { useEffect, useMemo, useRef, useState } from "react";
import { useCanvas } from "@contexts/canvas-context";
import React from "react";

interface ColorMutatorProps {
  object?: fabric.Object;
  property?: string;
  initialValue: string | fabric.Pattern | fabric.Gradient;
  onChange?: CallableFunction;
}
const {blackAlpha,orange, blue, purple,cyan,green,red,pink,facebook,linkedin,messenger,twitter,whatsapp, yellow} = theme.colors;
const pallettes = [
  blackAlpha,
  purple,
  blue,
  linkedin,
  cyan,
  green,
  whatsapp,
  yellow,
  orange,
  red,
  pink,
];

const shuffleArray = (array: Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const ColorMutator = ({
  object,
  property,
  onChange,
  initialValue,
}: ColorMutatorProps) => {
  const initializer = initialValue ?? object[property];
  const [value, setValue] = useState<string>(initializer);
  const { editor } = useCanvas();
  const [isExpanded, setExpanded] = useState(false);
  const [rows, setRows] = useState(2);
  const ref = useRef(null);

  
  const shuffledPallettes = useMemo(() => {
    return shuffleArray(pallettes);
  }, []);

  

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
      setRows(pallettes.length);
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
          <Flex justify={'space-between'} my={4}>
            <Flex>
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
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              hidden
            />
            </Flex>
            <Flex my={4}>
            <Button variant={'link'} onClick={() => {
                  setExpanded(!isExpanded);
              }}>{isExpanded ? 'Less' : 'More'}</Button>
            </Flex>
          </Flex>

          <Grid w={'100%'} templateColumns={"repeat(9, 1fr)"} templateRows="auto" gap={4}>
            {shuffledPallettes.slice(0, rows).map((pallette, index) => {
              return (
                <React.Fragment key={index}>
                  {Object.keys(pallette).map((key, index) => {
                    if (key == '50') {
                      return;
                    }
                    const color = pallette[key];
                    return (
                      <Button
                        onClick={() => {
                          setValue(color);
                        }}
                        key={index}
                        borderWidth={2}
                        borderColor={"gray.300"}
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
        </FormControl>
        
      </Flex>
      <hr style={{marginTop: 10}}/>
    </>
  );
};

export default ColorMutator;
