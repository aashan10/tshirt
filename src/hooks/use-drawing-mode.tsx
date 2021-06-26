import {useState} from 'react';
import {useBetween} from "use-between";


const isDrawingMode = () => {
    return useState<boolean>(false);
}

const useDrawingMode = () => {
    return useBetween(isDrawingMode);
}

export default useDrawingMode;
