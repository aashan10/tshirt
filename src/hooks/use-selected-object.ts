import {useState} from 'react';
import {useBetween} from "use-between";


const useSelectedObject = () => {
    return useState<number>(0);
}

const useSharedSelectedObject = () => useBetween(useSelectedObject);

export default useSharedSelectedObject;
