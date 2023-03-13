import { onCopy, onDuplicate, onMouseDown, onMouseMove, onMouseUp, onMouseWheel, onPaste, onRedo, onRemove, onSave, onUndo, onZoomIn, onZoomOut, onZoomReset, onResize, onSelectAll, trackMouseMovement, scaleActiveObject, onRotateLeft, onRotateRight, onSelection, onMoveDown, onMoveLeft, onMoveRight, onMoveUp } from './listeners';
import { CanvasEventCollection, WindowEventCollection } from './types';

const CanvasEvents: CanvasEventCollection<any> = {
    'mouse:down': [
        onMouseDown
    ],
    'mouse:move': [
        onMouseMove
    ],
    'mouse:over': [
        trackMouseMovement
    ],
    'mouse:up': [
        onMouseUp
    ],
    'mouse:wheel': [
        onMouseWheel
    ],
    'selection:created' : [
        onSelection
    ],
    'selection:updated' : [
        onSelection
    ],
    'selection:cleared' : [
        onSelection
    ]
}

const WindowEvents: WindowEventCollection<any> = {
    'keydown': [
        onSave,
        onCopy,
        onPaste,
        onDuplicate,
        onUndo,
        onRedo,
        onRemove,
        onZoomIn,
        onZoomOut,
        onZoomReset,
        onSelectAll,
        scaleActiveObject,
        onRotateLeft,
        onRotateRight,
        onMoveUp,
        onMoveDown,
        onMoveLeft,
        onMoveRight,
    ],
    'resize': [
        onResize
    ],
    'mousemove': [
        trackMouseMovement
    ]
}

export {CanvasEvents, WindowEvents}