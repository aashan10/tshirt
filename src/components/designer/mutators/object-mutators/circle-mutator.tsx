import ColorMutator from "@property-mutator/color-mutator";
import {fabric} from "fabric";
import NumberMutator from "@property-mutator/number-mutator";
import {useState} from "react";
import ShadowMutator from "@property-mutator/shadow-mutator";

interface CircleMutatorState {
    circle: fabric.Circle
}

const CircleMutator = ({circle}: CircleMutatorState) => {

    const [defaultColor]  = useState<string>('#000000');

    return (
        <>
            <ColorMutator object={circle} property={'fill'} initialValue={defaultColor}/>
            <ColorMutator object={circle} property={'stroke'} initialValue={defaultColor}/>
            <NumberMutator object={circle} property={'radius'}/>
            <NumberMutator object={circle} property={'strokeWidth'}/>
            <NumberMutator object={circle} property={'scaleX'} step={0.1}/>
            <NumberMutator object={circle} property={'scaleY'} step={0.1}/>
            <NumberMutator object={circle} property={'opacity'} min={0} max={1} step={0.1}/>
            <ShadowMutator object={circle} />
        </>
    )
}

export default CircleMutator;
