import ColorMutator from "@property-mutator/color-mutator";
import {fabric} from "fabric";
import NumberMutator from "@property-mutator/number-mutator";
import {useState} from "react";
import ShadowMutator from "@/components/designer/mutators/property-mutators/groups/shadow-mutator";
import TransformationMutators from "../property-mutators/groups/transformation-mutators";
import StrokeMutator from "../property-mutators/groups/stroke-mutator";
import FillMutator from "../property-mutators/groups/fill-mutator";

interface CircleMutatorState {
    circle: fabric.Circle
}

const CircleMutator = ({circle}: CircleMutatorState) => {
    return (
        <>
            <StrokeMutator object={circle} />
            <NumberMutator object={circle} property={'radius'}/>
            <FillMutator object={circle} />
            <ShadowMutator object={circle} />
            <TransformationMutators object={circle} />
        </>
    )
}

export default CircleMutator;
