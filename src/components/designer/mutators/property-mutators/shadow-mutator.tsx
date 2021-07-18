import {fabric} from "fabric";
import {
    Box,
    FormControl,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon
} from "@chakra-ui/react";
import {AddIcon, RemoveIcon} from "chakra-ui-ionicons";
import {Flex} from "@chakra-ui/layout";
import {useEffect, useState} from "react";
import ColorMutator from "@property-mutator/color-mutator";
import NumberMutator from "@property-mutator/number-mutator";
import {useCanvas} from "@contexts/canvas-context";

interface ShadowMutatorState {
    object: fabric.Object
}

const ShadowMutator = ({object}: ShadowMutatorState) => {
    const {editor} = useCanvas();

    const [shadow, setShadow] = useState<fabric.Shadow>(object.shadow instanceof fabric.Shadow ? object.shadow : new fabric.Shadow({
        color: '',
        blur: 0,
        offsetX: 0,
        offsetY: 0
    }));

    useEffect(() => {
        object.set({shadow: shadow});
        editor.renderAll();
    }, [shadow])

    return (
        <Flex mt={2} direction={'column'}>
            <Box flex={1}><strong>Shadow</strong></Box>
            <Flex flex={1} direction={"column"}>
                <ColorMutator
                    object={object} property={''}
                    onChange={(color: string) => {
                        setShadow(new fabric.Shadow({...shadow, color: color}));
                    }}
                    initialValue={shadow.color}/>
                <NumberMutator
                    min={0}
                    step={1}
                    object={object}
                    initialValue={shadow.blur}
                    property={'Blur'}
                    onChange={(value: number) => {
                        setShadow(new fabric.Shadow({...shadow, blur: value}));
                    }}/>

                <NumberMutator
                    step={1}
                    object={object}
                    initialValue={shadow.offsetX}
                    property={'OffsetX'}
                    onChange={(value: number) => {
                        setShadow(new fabric.Shadow({...shadow, offsetX: value}));
                    }}/>

                <NumberMutator
                    step={1}
                    object={object}
                    initialValue={shadow.offsetY}
                    property={'OffsetY'}
                    onChange={(value: number) => {
                        setShadow(new fabric.Shadow({...shadow, offsetY: value}));
                    }}/>
            </Flex>
        </Flex>
    )
}

export default ShadowMutator;
