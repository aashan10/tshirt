import { fabric } from "fabric";
import { Flex } from "@chakra-ui/layout";
import FontFaceObserver from "fontfaceobserver";
import {
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  Select,
  ToastMessage,
  createStandaloneToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCanvas } from "@contexts/canvas-context";
import Head from "next/head";
import { useFonts } from "@/contexts/font-context";
import theme from "@themes/theme";

const toast = createStandaloneToast({ theme: theme });
interface FontFamilyMutatorProps {
  object: fabric.Object;
  property?: keyof fabric.Object | any;
  onChange?: CallableFunction;
  initialValue?: String;
}

const AvailableFonts = [
  "Climate Crisis",
  "Arial",
  "Helvetica",
  "Times New Roman",
  "sans-serif",
  "Poppins",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Raleway",
  "Oswald",
  "Lora",
  "Merriweather",
  "Nunito",
  "Playfair Display",
  "Source Sans Pro",
  "Noto Sans",
  "PT Sans",
  "Ubuntu",
  "Fira Sans",
  "Titillium Web",
  "Work Sans",
  "Muli",
  "Cabin",
  "PT Serif",
  "Libre Franklin",
  "Noto Serif",
  "Lobster",
  "Pacifico",
  "Caveat",
  "Shadows Into Light",
  "Great Vibes",
  "Dancing Script",
  "Satisfy",
  "Amatic SC",
  "Cookie",
  "Sacramento",
  "Kaushan Script",
  "Lobster Two",
  "Marck Script",
  "Courgette",
  "Permanent Marker",
  "Bangers",
  "Patrick Hand",
  "Sriracha",
  "Varela Round",
  "Loved by the King",
  "Handlee",
  "Mr Dafoe",
  "Mr De Haviland",
  "Sedgwick Ave Display",
  "Sedgwick Ave",
  "Sofia",
  "Yellowtail",
  "Rochester",
  "Rock Salt",
  "Parisienne",
  "Londrina Outline",
  "Londrina Shadow",
  "Londrina Sketch",
  "Londrina Solid",
];
const FontFamilyMutator = ({
  object,
  property,
  onChange,
  initialValue,
}: FontFamilyMutatorProps) => {
  const [value, setValue] = useState<string>(
    object["fontFamily"] ?? initialValue
  );
  const { addFont } = useFonts();
  const { editor } = useCanvas();
  useEffect(() => {
    addFont(value);

    const observer = new FontFaceObserver(value);
    observer
      .load()
      .then(() => {
        object.set("fontFamily", value);
        editor.renderAll();
      })
      .catch(() => {
        toast({
          title: "Could not load font!",
          description: `The font '${value}' is not available on your system. Please select another font.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });

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
          <FormLabel display={"flex"} flex={1}>
            Font Family
          </FormLabel>
          <InputGroup display={"flex"} flex={1}>
            <Select
              defaultValue={value}
              onChange={(event) => {
                setValue(event.currentTarget.value);
              }}
            >
              {AvailableFonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </Select>
          </InputGroup>
        </FormControl>
      </Flex>
    </>
  );
};

export default FontFamilyMutator;
