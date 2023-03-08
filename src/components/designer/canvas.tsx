import { useCanvas } from '@contexts/canvas-context'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {fabric} from "fabric";
import { Flex } from '@chakra-ui/layout'
import EventManager from "@/events/editor";
import useSharedSelectedObject from "@hooks/use-selected-object";
import {Box, Button} from "@chakra-ui/react";
import useDrawingMode from '@hooks/use-drawing-mode';
import useUploadedFiles from "@hooks/use-uploaded-files";
import { useFonts } from '@/contexts/font-context';



interface CanvasProps {
    id: string
}

const Canvas = ({ id }: CanvasProps): React.ReactElement => {
    const {editor, setEditor, setActiveObject, activeObject} = useCanvas();
    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [index, setIndex] = useSharedSelectedObject();
    const [drawingMode, setDrawingMode] = useDrawingMode();
    const {addFont} = useFonts();
    const files = useUploadedFiles();
    const callback = useCallback((node) => {
        const change = () => {
            if (node) {
                setWidth(node.offsetWidth)
                setHeight(node.offsetHeight)
                if (canvasRef.current) {
                    canvasRef.current.style.height = node.offsetHeight
                    canvasRef.current.style.width = node.offsetWidth
                    canvasRef.current.height = node.offsetHeight
                    canvasRef.current.width = node.offsetWidth
                }
            }
        }
        window.onresize = change;
        change();
    }, [])

    useEffect(() => {                       
        if (!editor && setEditor) {
            const editor = new fabric.Canvas(id, {
                height: height,
                width: width,
            });
            setEditor(editor)
            const objects = localStorage.getItem('canvasElements');
            if(objects) {
                const data = JSON.parse(objects);
                data.objects.filter(object => object.type === 'i-text').map(object => {
                    addFont(object.fontFamily);
                });

                setTimeout(() => {
                    editor.loadFromJSON(objects, () => {
                        editor.renderAll();
                    });
                }, 2000);
            }
            EventManager.register(editor, {
                editor,
                setEditor,
                setActiveObject,
                activeObject,
            }, setIndex, files);
        }
        editor?.renderAll()
    }, [editor])

    return (
        <Flex flex={1} ref={callback} overflow={'hidden'} height={'100%'} width={'100%'}>
                <canvas id={id} ref={canvasRef} />
                {drawingMode ? (
                    <Box position={'absolute'} top={'80px'} right={'10px'}>
                        <Button onClick={() => {
                            setDrawingMode(false);
                        }}>
                            Disable Drawing Mode
                        </Button>
                    </Box>
                ) : null}
        </Flex>
    )
}


export default Canvas
