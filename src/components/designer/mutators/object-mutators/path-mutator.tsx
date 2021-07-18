import ColorMutator from "@property-mutator/color-mutator";
import {fabric} from "fabric";
import NumberMutator from "@property-mutator/number-mutator";
import {useState} from "react";
import ShadowMutator from "@property-mutator/shadow-mutator";

interface PathMutatorState {
    path: fabric.Path
}

const PathMutator = ({path}: PathMutatorState) => {

    const [defaultColor] = useState<string>('#000000');

    return (
        <>
            <ColorMutator object={path} property={'fill'} initialValue={defaultColor}/>
            <ColorMutator object={path} property={'stroke'} initialValue={defaultColor}/>
            <NumberMutator object={path} property={'width'}/>
            <NumberMutator object={path} property={'height'}/>
            <NumberMutator object={path} property={'top'}/>
            <NumberMutator object={path} property={'left'}/>
            <NumberMutator object={path} property={'scaleX'}/>
            <NumberMutator object={path} property={'scaleY'}/>
            <NumberMutator object={path} property={'strokeWidth'}/>
            <NumberMutator object={path} property={'opacity'} min={0} max={1} step={0.1}/>
            <ShadowMutator object={path} />
        </>
    )
}

export default PathMutator;
