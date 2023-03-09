import {fabric} from "fabric";
import {CanvasState} from "@contexts/canvas-context";
import {createStandaloneToast} from "@chakra-ui/react";
import theme from "@themes/theme";


class EventManager {
    protected _clipboard;
    protected static instance?: EventManager = null;

    constructor(protected canvas: fabric.Canvas, protected context: Partial<CanvasState>, protected setIndex: CallableFunction, protected files: { uploadedFiles: Array<any>, setUploadedFiles: CallableFunction }) {
        this.registerEvents();
    }

    public static register(canvas: fabric.Canvas, canvasContext: Partial<CanvasState>, setIndex: CallableFunction, files: { uploadedFiles: Array<any>, setUploadedFiles: CallableFunction }) {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager(canvas, canvasContext, setIndex, files);
        }
        return EventManager.instance;
    }

    protected copy() {
        this.canvas?.getActiveObject().clone((cloned) => {
            this._clipboard = cloned;
        });
    }

    protected cut() {
        this.copy();
        this.canvas.remove(this.canvas.getActiveObject());
        this.canvas.renderAll();
    }

    protected paste() {
        this._clipboard.clone((clonedObj) => {
            this.canvas.discardActiveObject();
            clonedObj.set({
                left: clonedObj.left + 10,
                top: clonedObj.top + 10,
                evented: true,
            });
            if (clonedObj.type === 'activeSelection') {
                clonedObj.canvas = this.canvas;
                clonedObj.forEachObject((obj) => {
                    this.canvas.add(obj);
                });
                clonedObj.setCoords();
            } else {
                this.canvas.add(clonedObj);
            }
            this._clipboard.top += 10;
            this._clipboard.left += 10;
            this.canvas.setActiveObject(clonedObj);
            this.canvas.requestRenderAll();
        });
    }

    private registerEvents() {
        this.canvas.on('object:moving', function (e) {
            const obj = e.target;
            // if object is too big ignore
            // @ts-ignore
            if (obj.currentHeight > obj.canvas.height || obj.currentWidth > obj.canvas.width) {
                return;
            }
            obj.setCoords();
            // top-left  corner
            if (obj.getBoundingRect().top < 0 || obj.getBoundingRect().left < 0) {
                obj.top = Math.max(obj.top, obj.top - obj.getBoundingRect().top);
                obj.left = Math.max(obj.left, obj.left - obj.getBoundingRect().left);
            }
            // bot-right corner
            if (
                (obj.getBoundingRect().top + obj.getBoundingRect().height) > obj.canvas.height ||
                (obj.getBoundingRect().left + obj.getBoundingRect().width) > obj.canvas.width
            ) {
                obj.top = Math.min(
                    obj.top,
                    obj.canvas.height - obj.getBoundingRect().height + obj.top - obj.getBoundingRect().top
                );
                obj.left = Math.min(obj.left, obj.canvas.width - obj.getBoundingRect().width + obj.left - obj.getBoundingRect().left);
            }
        });

        this.registerSelectionEvents();

        this.canvas.on('mouse:dblclick', (event) => {
            if (event.target) {
                this.context.setActiveObject(event.target);
            }
        });

        window.addEventListener('keydown', (event) => {
            const ctrlPressed = event.ctrlKey || event.metaKey;
            const toast = createStandaloneToast({theme: theme});
            if (event.key === 'Delete') {
                if (this.canvas.getActiveObjects()) {
                    this.canvas.getActiveObjects().map((object) => {
                        this.canvas.remove(object)
                    });
                }
                this.canvas.remove(this.canvas.getActiveObject());
            }
            
            if (event.key === 's' && ctrlPressed) {
                event.preventDefault()
                const json = JSON.stringify(this.canvas.toJSON());
                localStorage.setItem('canvasElements', json);
                toast({
                    position: 'bottom',
                    description: 'Your art can now be continued on this device even if you close the browser!',
                    title: 'Saved',
                    status: 'success',
                    duration: 4000,
                    isClosable: true
                });
                this.canvas.renderAll();
            }

            if (event.key === 'c' && ctrlPressed) {
                this.copy();
            }

            if (event.key === 'x' && ctrlPressed) {
                this.cut();
            }

            if (event.key === 'v' && ctrlPressed) {
                this.paste();
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                if (this.canvas.getActiveObject()) {
                    this.canvas.getActiveObject().set('left', this.canvas.getActiveObject()['left'] - 1);
                    this.canvas.renderAll();
                }
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                if (this.canvas.getActiveObject()) {
                    this.canvas.getActiveObject().set('left', this.canvas.getActiveObject()['left'] + 1);
                    this.canvas.renderAll();
                }
            }

            if (event.key === 'ArrowUp') {
                event.preventDefault();
                if (this.canvas.getActiveObject()) {
                    this.canvas.getActiveObject().set('top', this.canvas.getActiveObject()['top'] - 1);
                    this.canvas.renderAll();
                }
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (this.canvas.getActiveObject()) {
                    this.canvas.getActiveObject().set('top', this.canvas.getActiveObject()['top'] + 1);
                    this.canvas.renderAll();
                }
            }
        });
    }

    private registerSelectionEvents() {

        const updater = (e) => {
            const {setActiveObject} =  this.context;

            setActiveObject(e.selected);
        }

        this.canvas.on('selection:created', updater);


        this.canvas.on('selection:updated', updater);


        this.canvas.on('selection:cleared', updater);
    }
}

export default EventManager;
