import ColorMutator from "@property-mutator/color-mutator";
import {fabric} from "fabric";
import NumberMutator from "@property-mutator/number-mutator";
import {useState} from "react";
import ShadowMutator from "@/components/designer/mutators/property-mutators/groups/shadow-mutator";
import FillMutator from "../property-mutators/groups/fill-mutator";
import StrokeMutator from "../property-mutators/groups/stroke-mutator";
import TransformationMutators from "../property-mutators/groups/transformation-mutators";

interface PathMutatorState {
    path: fabric.Path
}

const PathMutator = ({path}: PathMutatorState) => {
    return (
        <>
            <FillMutator object={path} />
            <StrokeMutator object={path} />
            <NumberMutator object={path} property={'top'}/>
            <NumberMutator object={path} property={'left'}/>
            <TransformationMutators object={path} />
            <NumberMutator object={path} property={'opacity'} min={0} max={1} step={0.1}/>
            <ShadowMutator object={path} />
        </>
    )
}

export default PathMutator;
