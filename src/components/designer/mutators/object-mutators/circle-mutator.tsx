import ColorMutator from "@property-mutator/color-mutator";
import {fabric} from "fabric";
import IntegerMutator from "@property-mutator/number-mutator";
import {useState} from "react";

interface CircleMutatorState {
    circle: fabric.Circle
}

const CircleMutator = ({circle}: CircleMutatorState) => {

    const [defaultColor]  = useState<string>('#000000');

    return (
        <>
            <ColorMutator object={circle} property={'fill'} initialValue={defaultColor}/>
            <ColorMutator object={circle} property={'stroke'} initialValue={defaultColor}/>
            <IntegerMutator object={circle} property={'radius'}/>
            <IntegerMutator object={circle} property={'strokeWidth'}/>
        </>
    )
}

export default CircleMutator;
