import ColorMutator from "@property-mutator/color-mutator";
import {fabric} from "fabric";
import NumberMutator from "@property-mutator/number-mutator";
import {useState} from "react";
import ShadowMutator from "@property-mutator/shadow-mutator";

interface PolygonMutatorState {
    polygon: fabric.Polygon
}

const PolygonMutator = ({polygon}: PolygonMutatorState) => {

    const [defaultColor]  = useState<string>('#000000');

    return (
        <>
            <ColorMutator object={polygon} property={'fill'} initialValue={defaultColor}/>
            <ColorMutator object={polygon} property={'stroke'} initialValue={defaultColor}/>
            <NumberMutator object={polygon} property={'height'}/>
            <NumberMutator object={polygon} property={'width'}/>
            <NumberMutator object={polygon} property={'scaleX'} initialValue={polygon.scaleX} step={0.1}/>
            <NumberMutator object={polygon} property={'scaleY'} initialValue={polygon.scaleY} step={0.1}/>
            <NumberMutator object={polygon} property={'strokeWidth'}/>
            <NumberMutator object={polygon} property={'opacity'} min={0} max={1} step={0.1}/>
            <ShadowMutator object={polygon} />
        </>
    )
}

export default PolygonMutator;
