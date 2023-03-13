import { useCanvas } from "@/contexts/canvas-context";
import {
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { fabric } from "fabric";
import { property } from "lodash";
import { useEffect, useState } from "react";

interface AlignmentMutatorProps {
  object: fabric.Object;
  property: string;
  initialValue: string;
  label: string;
}

const AlignmentMutator = ({
  object,
  initialValue,
  label,
}: AlignmentMutatorProps) => {
  const [value, setValue] = useState<string>(object[property] ?? initialValue);
  const { editor } = useCanvas();

  useEffect(() => {
    object.set(property, value);
    editor?.renderAll();
  }, [value]);

  return (
    <>
      <Flex mt={2}>
        <FormControl
          id={`${object.type}_${property}`}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormLabel display={"flex"} flex={1} textTransform={"capitalize"}>{`${
            label ?? property
          }`}</FormLabel>
          <HStack></HStack>
        </FormControl>
      </Flex>
      <hr style={{ marginTop: 10 }} />
    </>
  );
};
