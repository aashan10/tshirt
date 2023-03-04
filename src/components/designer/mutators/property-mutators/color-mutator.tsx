import {fabric} from "fabric";
import {Flex} from "@chakra-ui/layout";
import {FormControl, FormLabel, Input} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useCanvas} from "@contexts/canvas-context";

interface ColorMutatorProps {
    object: fabric.Object,
    property?: keyof fabric.Object | string,
    initialValue: string | fabric.Pattern | fabric.Gradient,
    onChange?: CallableFunction
}

const ColorMutator = ({object, property, onChange, initialValue}: ColorMutatorProps) => {

    const [value, setValue] = useState<string>(object[property] ?? initialValue)
    const {editor} = useCanvas();


    useEffect(() => {
        // @ts-ignore
        object.set(property, value);
        editor?.renderAll();
        if (onChange) {
            onChange(value);
        }
    }, [value])

    return (
        <>
            <Flex mt={2} flex={1}>
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
