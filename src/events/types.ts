import {Canvas} from 'fabric';
import { EventManager } from './event-manager';

type EventContext<T> = {
    event: T,
    canvas: Canvas,
    eventManager: EventManager
}

type EventListener<T> = (context: EventContext<T>) => void;

type CanvasEventCollection<T> = {
    [key: string]: EventListener<T>[],
}

type WindowEventCollection<T> = {
    [key: string]: EventListener<T>[],
}

type EventManagerCollection = {
    canvas: CanvasEventCollection<any>,
    window: WindowEventCollection<any>,
}

type FabricWheelEvent = {
    e: WheelEvent,
    target: any,
    transform: any,
    pointer: {
        x: number,
        y: number,
    },
    absolutePointer: {
        x: number,
        y: number,
    },
    button: number,
    isClick: boolean,
}

type FabricMouseEvent = {
    e: MouseEvent,   
}

export type {EventContext, EventListener, CanvasEventCollection, WindowEventCollection, EventManagerCollection, FabricWheelEvent, FabricMouseEvent}