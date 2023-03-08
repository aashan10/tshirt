import React, {useContext, useState} from "react";
import {fabric} from "fabric";
import { FontProvider } from "./font-context";

interface CanvasState {
    editor: fabric.Canvas,
    setEditor: (canvas: fabric.Canvas) => void
    activeObject: fabric.Object | Array<fabric.Object>,
    setActiveObject: (object: fabric.Object | Array<fabric.Object>) => void
}

const CanvasContext = React.createContext<Partial<CanvasState>>({});

const CanvasProvider = ({children} : {children: React.ReactElement}) => {
    const [editor, setEditor] = useState<fabric.Canvas | undefined>(undefined);
    const [activeObject, setActiveObject] = useState<fabric.Object | Array<fabric.Object>>([]);
    return (
        <CanvasContext.Provider value={{
            editor: editor,
            setEditor: setEditor,
            activeObject: activeObject,
            setActiveObject: setActiveObject
        }}>
            <FontProvider>
                {children}
            </FontProvider>
        </CanvasContext.Provider>
    )
}

const useCanvas = () : Partial<CanvasState> => {
    return useContext(CanvasContext);
}

export default CanvasContext;
export {CanvasProvider, useCanvas}
export type {CanvasState};
