import {EventContext, EventListener, FabricMouseEvent, FabricWheelEvent} from './types';
import {fabric, Group} from 'fabric';
import { KeyboardEvent, MouseEvent } from 'react';

const isCtrlOrCmd = (event: KeyboardEvent) => {
    return event.ctrlKey || event.metaKey;
}

const isShift = (event: KeyboardEvent) => {
    return event.shiftKey;
}

function withinCanvas <T>(listener: EventListener<T>) {
    return (context: EventContext<T>) => {        
        const {canvas, event} = context;
        
        
        if (event['target'] !== undefined) {
            // @ts-ignore
            const {target} = event;
            if (target === document.body) {
                listener(context);
            }
        } else if (event['e'] !== undefined && event['e']['target'] !== undefined) {
            const {target} = event['e'];
            if (target === canvas.upperCanvasEl) {
                listener(context);
            }
        }

    }
}

function withActiveObject <T>(listener: EventListener<T>) {
    return (context: EventContext<T>) => {
        const {canvas} = context;
        if (canvas.getActiveObject()) {
            listener(context);
        }
    }
}

const onCopy = withinCanvas(
    withActiveObject(
        (context: EventContext<KeyboardEvent>) => {
            const {event, canvas} = context;
            if (event.key === 'c' && isCtrlOrCmd(event)) {                
                event.preventDefault();
                canvas.getActiveObject().clone((cloned) => {
                    canvas.clipboard = cloned;
                });
            }
        }
    )
);

const onSave: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (isCtrlOrCmd(event) && event.key === 's') {
        event.preventDefault();
        canvas.renderAll();
        const json = JSON.stringify(canvas);
        
    }
}


const onPaste: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'v' && isCtrlOrCmd(event)) {
        event.preventDefault();
        if (canvas.clipboard) {
            canvas.clipboard.clone((clonedObj) => {
                canvas.discardActiveObject();
                clonedObj.set({
                    left: clonedObj.left + 10,
                    top: clonedObj.top + 10,
                    evented: true,
                });
                if (clonedObj.type === 'activeSelection') {
                    clonedObj.canvas = canvas;
                    clonedObj.forEachObject((obj: any) => {
                        canvas.add(obj);
                    });
                    clonedObj.setCoords();
                } else {
                    canvas.add(clonedObj);
                }
                canvas.setActiveObject(clonedObj);
                canvas.requestRenderAll();
            });
        }
    }
})

const onCut: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'x' && isCtrlOrCmd(event)) {
        canvas.getActiveObject().clone((cloned) => {
            canvas.clipboard = cloned;
        });
        canvas.remove(canvas.getActiveObject());
        canvas.renderAll();
    }
});

const onSelectAll: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'a' && isCtrlOrCmd(event)) {
        event.preventDefault();
        canvas.discardActiveObject();

        const selection = new fabric.ActiveSelection(canvas.getObjects(), {
            canvas,
        });
        canvas.setActiveObject(selection);
        canvas.requestRenderAll();

    }
})

const onUndo: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'z' && isCtrlOrCmd(event)) {
        event.preventDefault();
        canvas.undo();
    }
}

const onRedo: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'y' && isCtrlOrCmd(event)) {
        event.preventDefault();
        canvas.redo();
    }
}

const onClear: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'l' && isCtrlOrCmd(event)) {
        event.preventDefault();
        canvas.clear();
    }
});

const onRemove: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'Backspace' || event.key === 'Delete') {

        event.preventDefault();
        const activeObjects = canvas.getActiveObjects() ?? [canvas.getActiveObject()];
        if (activeObjects) {
            activeObjects.map((object) => {
                canvas.remove(object);
            });
        }
        canvas.discardActiveObject();
        canvas.renderAll();
    }
})

const onDuplicate: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'd' && isShift(event)) {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            const clone = activeObject.clone();
            canvas.add(clone);
        }
    }
});

const onMoveUp: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    const delta = isShift(event) ? 10 : 1;
    if (event.key === 'ArrowUp') {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.top -= delta;
            canvas.renderAll();
        }
    }
})

const onMoveDown: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    const delta = isShift(event) ? 10 : 1;
    if (event.key === 'ArrowDown') {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.top += delta;
            canvas.renderAll();
        }
    }
})

const onMoveLeft: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    const delta = isShift(event) ? 10 : 1;

    if (event.key === 'ArrowLeft') {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.left -= delta;
            canvas.renderAll();
        }
    }
})

const onMoveRight: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    const delta = isShift(event) ? 10 : 1;

    if (event.key === 'ArrowRight') {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.left += delta;
            canvas.renderAll();
        }
    }
});

const onZoomIn: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (canvas.getActiveObject()) {
        return;
    }
    
    const delta = isCtrlOrCmd(event) ? 0.01 : 0.001;
    let zoom = canvas.getZoom() + delta;
    if (zoom > 20) zoom = 20;    
    
    if (event.key === '[') {
        event.preventDefault();
        if (canvas.mousePosition) {
            canvas.zoomToPoint({ x: canvas.mousePosition.x, y: canvas.mousePosition.y }, zoom);
        } else {
            canvas.setZoom(zoom);
        }
        canvas.renderAll();
    }
}

const onZoomOut: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (canvas.getActiveObject()) {
        return;
    }

    const delta = isCtrlOrCmd(event) ? 0.01 : 0.001;
    let zoom = canvas.getZoom() - delta;
    if (zoom < 0.01) zoom = 0.01;
    if (event.key === ']') {
        event.preventDefault();
        if (canvas.mousePosition) {
            canvas.zoomToPoint({ x: canvas.mousePosition.x, y: canvas.mousePosition.y }, zoom);
        } else {
            canvas.setZoom(zoom);
        }
        canvas.renderAll();
    }
}

const scaleActiveObject: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (!canvas.getActiveObject()) {
        return;
    }

    if (['[', ']'].includes(event.key)) {
        event.preventDefault();
        const delta = isCtrlOrCmd(event) ? 0.1 : 0.01;
        const object = canvas.getActiveObject();
        const scaleX = object.scaleX;
        const scaleY = object.scaleY;
        if (event.key === '[') {
            object.set({
                scaleX: scaleX - delta,
                scaleY: scaleY - delta
            });
        } else {
            object.set({
                scaleX: scaleX + delta,
                scaleY: scaleY + delta
            });
        }
        canvas.renderAll();
    }
}

const onZoomReset: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === '0' && isCtrlOrCmd(event)) {
        event.preventDefault();
        canvas.setViewportTransform([1,0,0,1,0,0]);
        canvas.renderAll();
    }
}

const onRotateLeft: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    
    if (event.key === 'q' && isCtrlOrCmd(event)) {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        
        if (activeObject) {
            activeObject.rotate(activeObject.angle - 1);
            canvas.renderAll();
        }
    }
}

const onRotateRight: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'e' && isCtrlOrCmd(event)) {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.rotate(activeObject.angle + 1);
            canvas.renderAll();
        }
    }
}

const onFlipHorizontal: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'h' && isShift(event)) {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.flipX = !activeObject.flipX;
            canvas.renderAll();
        }
    }
});

const onFlipVertical: EventListener<KeyboardEvent> = withinCanvas((context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'v' && isShift(event)) {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            activeObject.flipY = !activeObject.flipY;
            canvas.renderAll();
        }
    }
})

const onGroup: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'g' && isCtrlOrCmd(event)) {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            const group = new Group([activeObject]);
            canvas.add(group);
            canvas.setActiveObject(group);
        }
    }
}

const onUngroup: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'u' && isCtrlOrCmd(event)) {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'group') {
            const objects = activeObject.getObjects();
            canvas.remove(activeObject);
            objects.forEach(object => canvas.add(object));
        }
    }
}

const onExport: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'e' && isCtrlOrCmd(event)) {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            const data = activeObject.toDataURL();
            const link = document.createElement('a');
            link.download = 'image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

const onExportSvg: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 's' && isCtrlOrCmd(event)) {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            const data = activeObject.toSVG();
            const link = document.createElement('a');
            link.download = 'image.svg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

const onExportJson: EventListener<KeyboardEvent> = (context: EventContext<KeyboardEvent>) => {
    const {event, canvas} = context;
    if (event.key === 'j' && isCtrlOrCmd(event)) {
        event.preventDefault();
        const activeObject = canvas.getActiveObject();
        if (activeObject) {
            const data = JSON.stringify(activeObject.toJSON());
            const link = document.createElement('a');
            link.download = 'image.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

const onMouseWheel: EventListener<FabricWheelEvent> = (context: EventContext<FabricWheelEvent>) => {
    const {event, canvas} = context;
    event.e.preventDefault();


    var delta = event.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    

    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);


    canvas.renderAll();
}

const onMouseDown: EventListener<FabricMouseEvent> = (context: EventContext<FabricMouseEvent>) => {
    const {event, canvas} = context;
    if (event.e.altKey === true) {
        canvas.isDragging = true;
        canvas.selection = false;
        canvas.lastPosX = event.e.clientX;
        canvas.lastPosY = event.e.clientY;
    }
}

const onMouseMove: EventListener<FabricMouseEvent> = (context: EventContext<FabricMouseEvent>) => {
    const {event, canvas} = context;
    
    
    if (canvas.isDragging) {
        const vpt = canvas.viewportTransform;
        vpt[4] += event.e.clientX - canvas.lastPosX;
        vpt[5] += event.e.clientY - canvas.lastPosY;
        canvas.requestRenderAll();
        canvas.lastPosX = event.e.clientX;
        canvas.lastPosY = event.e.clientY;
    }
}

const trackMouseMovement = (context: EventContext<MouseEvent>) => {
    const {event, canvas} = context;
    
    if (event.target === canvas.upperCanvasEl) {       
        canvas.mousePosition = {x: event.clientX, y: event.clientY};
    }
    
}

const onMouseUp: EventListener<FabricMouseEvent> = (context: EventContext<FabricMouseEvent>) => {
    const {canvas} = context;
    canvas.isDragging = false;
    canvas.selection = true;
}

const onResize: EventListener<UIEvent> = (context: EventContext<UIEvent>) => {
    const {canvas} = context;
    
    canvas.calcOffset();
    canvas.renderAll();
}

const onSelection: EventListener<any> = (context: EventContext<any>) => {
    const {event, eventManager} = context;    
    eventManager.getContext().setActiveObject(event.selected);
}



export {
    onMoveUp,
    onMoveDown,
    onMoveLeft,
    onMoveRight,

    onZoomIn,
    onZoomOut,
    onZoomReset,

    onRotateLeft,
    onRotateRight,

    onFlipHorizontal,
    onFlipVertical,

    onGroup,
    onUngroup,

    onExport,
    onExportSvg,
    onExportJson,

    onRemove,
    onDuplicate,
    onClear,
    onUndo,
    onRedo,
    onSave,
    onCopy,
    onPaste,
    onCut,

    onMouseWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,

    onResize,
    onSelectAll,
    trackMouseMovement,

    scaleActiveObject,
    onSelection
}