import {fabric} from "fabric";
import {Flex} from "@chakra-ui/layout";
import {FormControl, FormLabel, IconButton, Input, InputGroup, InputLeftAddon, InputRightAddon} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useCanvas} from "@contexts/canvas-context";
import {AddIcon, RemoveIcon} from "chakra-ui-ionicons";

interface IntegerMutatorProps {
    object: fabric.Object,
    property: keyof fabric.Object | keyof fabric.Circle,
    min?: number,
    max?: number,
    step?: number
}

const IntegerMutator = ({object, property, min, max, step}: IntegerMutatorProps) => {
    // @ts-ignore
    const [value, setValue] = useState<number>(object[property])
    const {editor} = useCanvas();
    useEffect(() => {
        // @ts-ignore
        object.set(property, value);
        editor.renderAll();
    }, [value]);

    return (
        <>
            <Flex mt={2}>
                <FormControl id={`${object.type}_${property}`} display={'flex'} flexDirection={'row'}
                             justifyContent={'space-between'}>
                    <FormLabel display={'flex'} flex={1} textTransform={'capitalize'}>{`${property}`}</FormLabel>
                    <InputGroup display={'flex'} flex={1}>
                        <InputLeftAddon padding={0}>
                            <IconButton disabled={value <= min} onClick={() => {

                                const newValue = value - (step ?? 1);
                                if(min && newValue < min) {
                                    setValue(min)
                                } else {
                                    setValue(newValue);
                                }
                            }} aria-label={`Increment ${property}`} icon={<RemoveIcon/>}/>
                        </InputLeftAddon>
                        <Input min={min} max={max} step={step} display={'flex'} flex={1} onInput={(event) => {
                            if (event.currentTarget.value) {
                                const number = parseFloat(event.currentTarget.value);
                                if (!isNaN(number)) {
                                    setValue(number);
                                } else {
                                    setValue(0)
                                }
                            }
                        }} type="number" value={value}/>
                        <InputRightAddon padding={0}>
                            <IconButton disabled={value >= max} onClick={() => {
                                const newValue = value + (step ?? 1);
                                if(max && newValue > max) {
                                    setValue(max)
                                } else {
                                    setValue(newValue);
                                }
                            }} aria-label={`Decrement ${property}`} icon={<AddIcon/>}/>
                        </InputRightAddon>
                    </InputGroup>
                </FormControl>
            </Flex>
        </>
    )
}

export default IntegerMutator;
