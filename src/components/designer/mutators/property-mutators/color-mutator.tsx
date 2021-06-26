import {fabric} from "fabric";
import {Flex} from "@chakra-ui/layout";
import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useCanvas} from "@contexts/canvas-context";

interface ColorMutatorProps {
    object: fabric.Object,
    property: keyof fabric.Object,
    initialValue: string
}

const ColorMutator = ({object, property, initialValue}: ColorMutatorProps) => {

    const [value, setValue] = useState<string>(object[property])
    const {editor} = useCanvas();

    useEffect(() => {
        object.set(property, value);
        editor?.renderAll();
    }, [value])

    return (
        <>
            <Flex mt={2}>
                <FormControl display={'flex'} flexDirection={'row'} id={`${object.type}_${property}`}>
                    <FormLabel display={'flex'} flex={1} textTransform={'capitalize'}>{`${property} Color`}</FormLabel>
                    <Input padding={0} display={'flex'} flex={1} onInput={(event) => {
                        // @ts-ignore
                        setValue(event?.target?.value);
                    }} type="color" value={value}/>
                </FormControl>
            </Flex>
        </>
    )
}

export default ColorMutator;
