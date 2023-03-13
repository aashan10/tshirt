import {fabric} from "fabric";
import NumberMutator from "@property-mutator/number-mutator";
import ShadowMutator from "@/components/designer/mutators/property-mutators/groups/shadow-mutator";
import TransformationMutators from "../property-mutators/groups/transformation-mutators";

interface ImageMutatorState {
    image: fabric.Circle
}

const ImageMutator = ({image}: ImageMutatorState) => {
    return (
        <>
            <NumberMutator object={image} property={'opacity'} min={0} max={1} step={0.1}/>
            <ShadowMutator object={image} />
            <TransformationMutators object={image} />
        </>
    )
}

export default ImageMutator;
