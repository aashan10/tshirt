import {useState} from 'react';
import {useBetween} from "use-between";




const useDrawingMode = () => {
    const data = useState<boolean>(false)

    return useBetween(() => data);
}

export default useDrawingMode;
