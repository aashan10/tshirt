import {fabric} from 'fabric';
import ColorMutator from '../color-mutator';
import NumberMutator from '../number-mutator';

interface FillMutatorProps {
    object: fabric.Object
}

const FillMutator = ({object}: FillMutatorProps) => {
    return (
        <>
            <ColorMutator object={object} property={'fill'} initialValue={object.fill} />
            <ColorMutator object={object} property={'opacity'} initialValue={object.opacity} />
        </>
    )
}

export default FillMutator;