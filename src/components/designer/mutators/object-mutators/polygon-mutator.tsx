import ColorMutator from "@property-mutator/color-mutator";
import {fabric} from "fabric";
import NumberMutator from "@property-mutator/number-mutator";
import {useState} from "react";
import ShadowMutator from "@/components/designer/mutators/property-mutators/groups/shadow-mutator";
import TransformationMutators from "../property-mutators/groups/transformation-mutators";
import StrokeMutator from "../property-mutators/groups/stroke-mutator";
import FillMutator from "../property-mutators/groups/fill-mutator";

interface PolygonMutatorState {
    polygon: fabric.Polygon
}

const PolygonMutator = ({polygon}: PolygonMutatorState) => {
    return (
        <>
            <StrokeMutator object={polygon} />
            <FillMutator object={polygon} />
            <ShadowMutator object={polygon} />
            <TransformationMutators object={polygon} />
        </>
    )
}

export default PolygonMutator;
