import ColorMutator from "@property-mutator/color-mutator";
import {fabric} from "fabric";
import NumberMutator from "@property-mutator/number-mutator";
import {useState} from "react";
import ShadowMutator from "@property-mutator/shadow-mutator";

interface ImageMutatorState {
    image: fabric.Circle
}

const ImageMutator = ({image}: ImageMutatorState) => {
    return (
        <>
            <NumberMutator object={image} onChange={(val) => {
                image.set({
                    scaleY: val / image.height,
                    height: val
                })
            }} property={'height'} />
            <NumberMutator object={image} property={'width'} />
            <NumberMutator object={image} property={'scaleX'} step={0.1}/>
            <NumberMutator object={image} property={'scaleY'} step={0.1}/>
            <NumberMutator object={image} property={'opacity'} min={0} max={1} step={0.1}/>
            <ShadowMutator object={image} />
        </>
    )
}

export default ImageMutator;
