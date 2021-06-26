import {fabric} from "fabric";
import {CanvasState} from "@contexts/canvas-context";
import {Box, createStandaloneToast} from "@chakra-ui/react";
import theme from "@themes/theme";


class EventManager {
    protected _clipboard;
    constructor(protected canvas: fabric.Canvas, protected context: Partial<CanvasState>, protected setIndex: CallableFunction) {
        this.registerEvents();
    }

    public static register(canvas: fabric.Canvas, canvasContext: Partial<CanvasState>, setIndex: CallableFunction) {
        return new EventManager(canvas, canvasContext, setIndex);
    }

    protected copy() {
        this.canvas.getActiveObject().clone((cloned) => {
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
                this.setIndex(0);
                this.setIndex(2);
            }
        });

        window.addEventListener('keydown', (event) => {
            const toast = createStandaloneToast({theme: theme});
            if (event.key === 'Delete') {
                if (this.canvas.getActiveObjects()) {
                    this.canvas.getActiveObjects().map((object) => {
                        this.canvas.remove(object)
                    });
                }
                this.canvas.remove(this.canvas.getActiveObject());
            }

            if (event.key === 's' && event.ctrlKey) {
                event.preventDefault()
                const json = JSON.stringify(this.canvas.toJSON());
                localStorage.setItem('canvasElements', json);
                toast({
                    position: 'bottom',
                    title: 'Saved',
                    status: 'success',
                    isClosable: true
                })
            }

            if (event.key === 'c' && event.ctrlKey) {
                this.copy();
            }

            if(event.key === 'x' && event.ctrlKey) {
                this.cut();
            }

            if(event.key === 'v' && event.ctrlKey) {
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
        this.canvas.on('selection:created', (e) => {
            if (e.target) {
                this.context?.setActiveObject(this.canvas.getActiveObjects() ?? this.canvas.getActiveObject());
            } else {
                this.context.setActiveObject(undefined);
            }
        });


        this.canvas.on('selection:updated', event => {
            if (event.target) {
                this.context?.setActiveObject(this.canvas.getActiveObjects() ?? this.canvas.getActiveObject());
            } else {
                this.context.setActiveObject(undefined);
            }
        });


        this.canvas.on('selection:cleared', (event) => {
            this.context.setActiveObject([]);
        });
    }
}

export default EventManager;
