import ColorMutator from "@property-mutator/color-mutator";
import {fabric} from "fabric";
import IntegerMutator from "@property-mutator/integer-mutator";
import {useState} from "react";

interface PolygonMutatorState {
    polygon: fabric.Polygon
}

const PolygonMutator = ({polygon}: PolygonMutatorState) => {

    const [defaultColor]  = useState<string>('#000000');

    return (
        <>
            <ColorMutator object={polygon} property={'fill'} initialValue={defaultColor}/>
            <ColorMutator object={polygon} property={'stroke'} initialValue={defaultColor}/>
            <IntegerMutator object={polygon} property={'height'}/>
            <IntegerMutator object={polygon} property={'width'}/>
            <IntegerMutator object={polygon} property={'strokeWidth'}/>
            <IntegerMutator object={polygon} property={'opacity'} min={0} max={1} step={0.1}/>
        </>
    )
}

export default PolygonMutator;
