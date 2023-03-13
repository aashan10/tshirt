import {fabric} from 'fabric';
import ColorMutator from '../color-mutator';
import NumberMutator from '../number-mutator';

interface StrokeMutatorProps {
    object: fabric.Object
}

const StrokeMutator = ({object}: StrokeMutatorProps) => {
    return (
        <>
            <NumberMutator object={object} property={'strokeWidth'} label={'Stroke Width'} />
            <NumberMutator object={object} property={'rx'} min={0} max={object.width} step={1} label={'Border Radius (X)'}/>
            <NumberMutator object={object} property={'ry'} min={0} max={object.height} step={1} label={'Border Radius (Y)'}/>
            <ColorMutator object={object} property={'stroke'} initialValue={object.stroke} />
        </>
    )
}

export default StrokeMutator;