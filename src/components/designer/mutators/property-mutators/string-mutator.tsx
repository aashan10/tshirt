import {fabric} from "fabric";
import {Flex} from "@chakra-ui/layout";
import {FormControl, FormLabel, IconButton, Input, InputGroup} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useCanvas} from "@contexts/canvas-context";

interface StringMutatorProps {
    object: fabric.Object,
    property?: keyof fabric.Object | any,
    onChange?: CallableFunction,
    initialValue?: String
}

const StringMutator = ({object, property, onChange, initialValue}: StringMutatorProps) => {
    const [value, setValue] = useState<string>(object[property] ?? initialValue)
    const {editor} = useCanvas();

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
                <FormControl id={`${object.type}_${property}`} display={'flex'} flexDirection={'row'}
                             justifyContent={'space-between'}>
                    <FormLabel display={'flex'} flex={1} textTransform={'capitalize'}>{`${property}`}</FormLabel>
                    <InputGroup display={'flex'} flex={1}>
                        <Input textAlign={'center'} display={'flex'} flex={1} onInput={(event) => {
                            if (event.currentTarget.value) {
                                setValue(event.currentTarget.value)
                            }
                        }} type="text" value={value}/>
                    </InputGroup>
                </FormControl>
            </Flex>
        </>
    )
}

export default StringMutator;
