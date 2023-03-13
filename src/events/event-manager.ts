import {Canvas, fabric} from 'fabric';
import { CanvasEvents, WindowEvents } from './events';
import {EventManagerCollection} from './types';

type EventManagerContext = {
    canvas: Canvas,
    setActiveObject: (object: fabric.Object) => void,
}

class EventManager {
    
    static instance: EventManager;
    private collection: EventManagerCollection;

    private activeEvents = {
        canvas: {},
        window: {},
    }

    private setCanvas(canvas: Canvas) {
        this.canvas = canvas;
    }

    public getContext() {
        return this.context;
    }

    private constructor(protected canvas: Canvas, protected context: EventManagerContext) {
        this.collection = {
            canvas: CanvasEvents,
            window: WindowEvents,
        };
    }

    static getInstance(context: EventManagerContext): EventManager {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager(context.canvas, context);
        }
        EventManager.instance.setCanvas(context.canvas);
        return EventManager.instance;
    }

    addEventListener(type: 'canvas' | 'window', event: string, listener: (context: {event: Event, canvas: Canvas}) => void): CallableFunction {
        
        if (!this.collection[type][event]) {
            this.collection[type][event] = [];
        }

        this.collection[type][event].push(listener);

        if (type === 'canvas') {
            this.canvas.on(event, listener);
        } else if (type === 'window') {
            // @ts-ignore
            window.addEventListener(event, listener);
        } else {
            throw new Error(`Unknown event type: ${type}`);
        }

        return () => {
            this.removeEventListener(type, event, listener);
        }
    }

    removeEventListener(type: string, event: string, listener: (context: { event: Event; canvas: Canvas; }) => void) {
        switch (type) {
            case 'canvas':
                if (!this.activeEvents.canvas[event]) return;
                this.activeEvents.canvas[event] = this.activeEvents.canvas[event].filter(l => l !== listener);
                this.canvas.off(event, listener);
                break;
            case 'window':
                if (!this.activeEvents.window[event]) return;
                this.activeEvents.window[event] = this.activeEvents.window[event].filter(l => l !== listener);
                // @ts-ignore
                window.removeEventListener(event, listener);
                break;
            default:
                throw new Error(`Unknown event type: ${type}`);
        }
    }

    removeAllEventListeners() {
        Object.keys(this.activeEvents.canvas).map((event) => {
            const listeners = this.activeEvents.canvas[event];
            listeners.forEach((listener) => {
                this.canvas.off(event, listener);
            });
        });

        Object.keys(this.activeEvents.window).map((event) => {
            const listeners = this.activeEvents.window[event];
            listeners.forEach((listener) => {
                // @ts-ignore
                window.removeEventListener(event, listener);
            });
        });
        
    }

    subscribe(): CallableFunction {

        Object.keys(this.collection.canvas).map((event) => {
            const listeners = this.collection.canvas[event];
            listeners.forEach((listener) => {
                const listenerWrapper = (e: Event) => {
                    listener({event: e, canvas: this.canvas, eventManager: this});
                }

                this.activeEvents.canvas[event] = this.activeEvents.canvas[event] || [];
                this.activeEvents.canvas[event].push(listener);

                this.canvas.on(event, listenerWrapper);
            });
        });

        Object.keys(this.collection.window).map((event) => {
            const listeners = this.collection.window[event];
            listeners.forEach((listener) => {
                const listenerWrapper = (e: Event) => {
                    listener({event: e, canvas: this.canvas, eventManager: this});
                }

                this.activeEvents.window[event] = this.activeEvents.window[event] || [];
                this.activeEvents.window[event].push(listenerWrapper);

                // @ts-ignore
                window.addEventListener(event, listenerWrapper);
            });
        });

        return () => {
            this.removeAllEventListeners();
        }
    }
}

export {EventManager}