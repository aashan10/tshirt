import { useCanvas } from '@/contexts/canvas-context';
import { Flex, Heading } from '@chakra-ui/react';
import {fabric} from 'fabric'
import NumberMutator from '../number-mutator';

interface TransformationMutatorsProps {
    object: fabric.Object,

}

const TransformationMutators = ({object}: TransformationMutatorsProps) => {

    const {editor} = useCanvas();

    return (
        <>
            <Flex mt={2} flex={1} flexDirection={'column'}>
                <Heading size={'md'} py={4}>Transformations</Heading>
                <NumberMutator object={object} property={'height'} />
                <NumberMutator object={object} property={'width'} />
                <NumberMutator object={object} property={'angle'} initialValue={object.angle ?? 0} min={0} max={360} label={"Rotation"} />
                <NumberMutator object={object} property={'skewX'} initialValue={object.skewX ?? 0} min={0} max={360} label={"Skew X"} />
                <NumberMutator object={object} property={'skewY'} initialValue={object.skewY ?? 0} min={0} max={360} label={"Skew Y"} />
                <NumberMutator object={object} property={'scaleX'} initialValue={object.scaleX} min={0.0} max={10} step={0.1} label={"Scale X"}/>
                <NumberMutator object={object} property={'scaleY'} initialValue={object.scaleY} min={0.0} max={10} step={0.1} label={"Scale Y"}/>
            </Flex>
        </>
    )
}

export default TransformationMutators;