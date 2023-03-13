import React from "react";
import {fabric} from "fabric";
import StringMutator from "@property-mutator/string-mutator";
import ColorMutator from "@property-mutator/color-mutator";
import NumberMutator from "@property-mutator/number-mutator";
import FontFamilyMutator from "../property-mutators/font-family-mutator";
import ShadowMutator from "../property-mutators/groups/shadow-mutator";

interface TextMutatorProps {
    text: fabric.Text | fabric.IText
}

const TextMutator = ({text}: TextMutatorProps): React.ReactElement => {
    // @ts-ignore
    return (
        <>
            <StringMutator object={text} initialValue={text.text} property={'text'} />
            <FontFamilyMutator object={text} initialValue={text.fontFamily} />
            <ColorMutator object={text} initialValue={text.stroke} property={'stroke'} />
            <ColorMutator object={text} initialValue={text.fill} property={'fill'} />
            <NumberMutator object={text} initialValue={text.fontSize} property={'fontSize'} />
            <NumberMutator object={text} initialValue={text.strokeWidth} property={'strokeWidth'} min={0} max={5} step={1} />
            <NumberMutator object={text} initialValue={text.scaleX} property={'scaleX'} step={0.1} />
            <NumberMutator object={text} initialValue={text.scaleY} property={'scaleY'} step={0.1} />
            <ShadowMutator object={text} />
        </>
    )
}

export default TextMutator;
