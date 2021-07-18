import {useState} from "react";
import {useBetween} from "use-between";
import {fabric} from "fabric";


interface FileWithPreview extends File {
    preview?: string;
    fabricObject?: fabric.Image
}

const useFiles =  () => {
    const [uploadedFiles, setUploadedFiles] = useState<Array<FileWithPreview>>([]);

    return {
        uploadedFiles: uploadedFiles,
        setUploadedFiles: setUploadedFiles
    }
}

const useUploadedFiles = () => useBetween(useFiles);

export default useUploadedFiles;
