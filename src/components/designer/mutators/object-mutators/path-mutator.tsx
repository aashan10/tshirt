import ColorMutator from "@property-mutator/color-mutator";
import {fabric} from "fabric";
import IntegerMutator from "@property-mutator/number-mutator";
import {useState} from "react";

interface PathMutatorState {
    path: fabric.Path
}

const PathMutator = ({path}: PathMutatorState) => {

    const [defaultColor] = useState<string>('#000000');

    return (
        <>
            <ColorMutator object={path} property={'fill'} initialValue={defaultColor}/>
            <ColorMutator object={path} property={'stroke'} initialValue={defaultColor}/>
            <IntegerMutator object={path} property={'width'}/>
            <IntegerMutator object={path} property={'height'}/>
            <IntegerMutator object={path} property={'top'}/>
            <IntegerMutator object={path} property={'left'}/>
            <IntegerMutator object={path} property={'scaleX'}/>
            <IntegerMutator object={path} property={'scaleY'}/>
            <IntegerMutator object={path} property={'strokeWidth'}/>
            <IntegerMutator object={path} property={'opacity'} min={0} max={1} step={0.1}/>
        </>
    )
}

export default PathMutator;
