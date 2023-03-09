import {Flex} from "@chakra-ui/layout";
import {Grid, Image} from "@chakra-ui/react";
import {
    EllipseOutlineIcon,
    SquareOutlineIcon,
    TriangleOutlineIcon,
    RemoveOutlineIcon,
    PencilOutlineIcon,
    TextOutlineIcon,
    HeartOutlineIcon
} from 'chakra-ui-ionicons';
import {fabric} from "fabric";
import {useCanvas} from "@contexts/canvas-context";
import {useEffect} from "react";
import useDrawingMode from "@hooks/use-drawing-mode";
import {useDropzone} from "react-dropzone";
import useUploadedFiles from "@hooks/use-uploaded-files";

interface ShapesConfiguratorProps {
    hideHeading?: boolean,
    onClose?: CallableFunction
}

interface FileObject extends File {
    object?: fabric.Image,
    preview?: string
    isSvg?: boolean
}

const ShapesConfigurator = ({hideHeading, onClose}: ShapesConfiguratorProps) => {
    const {editor} = useCanvas();
    const {uploadedFiles, setUploadedFiles} = useUploadedFiles();
    const [drawingMode, setDrawingMode] = useDrawingMode();
    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/jpg': [],
            'image/png': [],
            'image/jpeg': [],
            'image/svg+xml': []
        },
        onDrop: (acceptedFiles) => {
            const droppedFiles = acceptedFiles.map(
                (file: FileObject) => {
                    return Object.assign(file,
                        {
                            preview: URL.createObjectURL(file)
                        }
                    )
                }
            )
            setUploadedFiles([...uploadedFiles, ...droppedFiles]);
        }
    });

    useEffect(() => {
        if (editor) {
            editor.isDrawingMode = drawingMode;
        }
    }, [drawingMode, editor])

    return (
        <>
            <Flex direction={'column'}>
                <Flex display={hideHeading ? 'none' : 'flex'} flex={1} paddingY={4}>
                    <strong>Shapes</strong>
                </Flex>
                <Flex mt={6} flex={1} direction={'column'}>
                    <Flex direction={'column'} flex={1}>
                        <Grid templateColumns={['30% 30% 30%', '18% 18% 18% 18% 18%']} columnGap={['5%', '2.5%']}
                              rowGap={'1em'}>
                            <Flex flex={1} flexDirection={'column'}
                                  onClick={() => {
                                      const circle = new fabric.Circle({
                                          radius: 30,
                                          top: (editor.height / 2) - 30,
                                          left: (editor.width / 2) - 30,
                                          strokeWidth: 3,
                                      });
                                      editor?.add(circle);
                                      editor?.setActiveObject(circle);
                                      if (onClose) {
                                          onClose();
                                      }
                                  }}
                                  cursor={'pointer'}>
                                <Flex>
                                    <EllipseOutlineIcon flex={1} w={10} h={10}/>
                                </Flex>
                                <Flex style={{textAlign: 'center'}}>
                                    <p style={{flex: 1}}>Circle</p>
                                </Flex>
                            </Flex>
                            <Flex flex={1} flexDirection={'column'}
                                  onClick={() => {
                                      const rect = new fabric.Rect({
                                          height: 60,
                                          width: 60,
                                          top: (editor.height / 2) - 30,
                                          left: (editor.width / 2) - 30
                                      });
                                      editor?.add(rect);
                                      editor?.setActiveObject(rect);
                                      if (onClose) {
                                          onClose();
                                      }
                                  }}
                                  cursor={'pointer'}>
                                <Flex>
                                    <SquareOutlineIcon flex={1} w={10} h={10}/>
                                </Flex>
                                <Flex style={{textAlign: 'center'}}>
                                    <p style={{flex: 1}}>Square</p>
                                </Flex>
                            </Flex>

                            <Flex flex={1} flexDirection={'column'}
                                  onClick={() => {
                                      const rect = new fabric.Rect({
                                          height: 60,
                                          width: 60,
                                          rx: 10,
                                          ry: 10,
                                          top: (editor.height / 2) - 30,
                                          left: (editor.width / 2) - 30
                                      });

                                      rect.on('scaling', function(e) {
                                        this.set({
                                            width: this.width * this.scaleX,
                                            height: this.height * this.scaleY,
                                            scaleX: 1,
                                            scaleY: 1
                                        })
                                      });
                                      editor?.add(rect);
                                      editor?.setActiveObject(rect);
                                      if (onClose) {
                                          onClose();
                                      }
                                  }}
                                  cursor={'pointer'}>
                                <Flex>
                                    <SquareOutlineIcon flex={1} w={10} h={10}/>
                                </Flex>
                                <Flex style={{textAlign: 'center'}}>
                                    <p style={{flex: 1}}>Rounded</p>
                                </Flex>
                            </Flex>
                            <Flex flex={1} flexDirection={'column'} onClick={() => {
                                const triangle = new fabric.Triangle({
                                    height: 60,
                                    width: 60,
                                    top: (editor.height / 2) - 30,
                                    left: (editor.width / 2) - 30
                                });
                                editor?.add(triangle);
                                editor?.setActiveObject(triangle);
                                if (onClose) {
                                    onClose();
                                }
                            }} cursor={'pointer'}>
                                <Flex>
                                    <TriangleOutlineIcon flex={1} w={10} h={10}/>
                                </Flex>
                                <Flex style={{textAlign: 'center'}}>
                                    <p style={{flex: 1}}>Triangle</p>
                                </Flex>
                            </Flex>

                            <Flex flex={1} flexDirection={'column'} onClick={() => {
                                const line = new fabric.Line([50, 100, 200, 200], {
                                    stroke: '#000000'
                                });
                                editor?.add(line);
                                if (onClose) {
                                    onClose();
                                }
                                editor?.setActiveObject(line);
                                editor?.renderAll();
                            }} cursor={'pointer'}>
                                <Flex>
                                    <RemoveOutlineIcon flex={1} w={10} h={10}/>
                                </Flex>
                                <Flex style={{textAlign: 'center'}}>
                                    <p style={{flex: 1}}>Line</p>
                                </Flex>
                            </Flex>

                            <Flex flex={1} flexDirection={'column'} onClick={() => {
                                setDrawingMode(!drawingMode);
                            }} cursor={'pointer'}>
                                <Flex>
                                    <PencilOutlineIcon flex={1} w={10} h={10}/>
                                </Flex>
                                <Flex style={{textAlign: 'center'}}>
                                    <p style={{flex: 1}}>Free Hand</p>
                                </Flex>
                            </Flex>


                            <Flex flex={1} flexDirection={'column'} onClick={() => {
                                const heart = new fabric.Path('M 272.70141,238.71731 ' +
                                    'C 206.46141,238.71731 152.70146,292.4773 152.70146,358.71731 ' +
                                    'C 152.70146,493.47282 288.63461,528.80461 381.26391,662.02535 ' +
                                    'C 468.83815,529.62199 609.82641,489.17075 609.82641,358.71731 ' +
                                    'C 609.82641,292.47731 556.06651,238.7173 489.82641,238.71731 ' +
                                    'C 441.77851,238.71731 400.42481,267.08774 381.26391,307.90481 ' +
                                    'C 362.10311,267.08773 320.74941,238.7173 272.70141,238.71731 ' +
                                    'z ', {});
                                editor.add(heart);
                                editor.renderAll();
                            }} cursor={'pointer'}>
                                <Flex>
                                    <HeartOutlineIcon flex={1} w={10} h={10}/>
                                </Flex>
                                <Flex style={{textAlign: 'center'}}>
                                    <p style={{flex: 1}}>Heart</p>
                                </Flex>
                            </Flex>

                            <Flex flex={1} flexDirection={'column'} onClick={() => {

                                const line = new fabric.IText('Double click to edit', {
                                    height: 60,
                                    width: 60,
                                    top: (editor.height / 2) - 30,
                                    left: (editor.width / 2) - 30
                                });
                                editor?.add(line);
                                if (onClose) {
                                    onClose();
                                }
                                editor?.setActiveObject(line);
                                editor?.renderAll();
                            }} cursor={'pointer'}>
                                <Flex>
                                    <TextOutlineIcon flex={1} w={10} h={10}/>
                                </Flex>
                                <Flex style={{textAlign: 'center'}}>
                                    <p style={{flex: 1}}>Text</p>
                                </Flex>
                            </Flex>
                        </Grid>
                    </Flex>
                </Flex>

                <Flex display={hideHeading ? 'none' : 'flex'} mt={10} flex={1} paddingTop={4}>
                    <strong>Images</strong>
                </Flex>
                <Flex mt={0} flex={1} direction={'column'}>
                    <Flex cursor={'pointer'}
                          {...getRootProps({className: 'dropzone'})}>
                        <Flex
                            flex={1}
                            my={4}
                            borderStyle={'dashed'}
                            borderWidth={1}
                            borderColor={'rgba(155,155,155,0.9)'}
                            bg={'rgba(155,155,155,0.5)'}
                            borderRadius={10}
                            height={'100px'}
                            alignItems={'center'}
                            justifyContent={'center'}>
                            <p style={{color: 'rgba(155,155,155,0.9)'}}>
                                Drag and drop file or click to upload!
                            </p>
                        </Flex>
                        <input {...getInputProps()} hidden={true} style={{visibility: 'hidden'}}/>
                    </Flex>
                    <Grid templateColumns={['30% 30% 30%', '18% 18% 18% 18% 18%']} mt={4} columnGap={['5%', '2.5%']}
                          rowGap={'1em'}>
                        {
                            uploadedFiles.map((file, index) => {
                                return (
                                    <Flex title="Insert Image" cursor={'pointer'} bg={'rgba(0,0,0,0.25)'} rounded={20} key={index} p={8} onClick={() => {
                                        fabric.Image.fromURL(URL.createObjectURL(file), (imageObject) => {
                                            if (imageObject.width > editor.width) {
                                                imageObject.scaleToWidth(editor.width / 2);
                                            }
                                            editor.add(imageObject);
                                        });
                                    }}>
                                        <Image src={file.preview} alt="Image"/>
                                    </Flex>
                                )
                            })
                        }

                    </Grid>
                </Flex>
            </Flex>
        </>
    );
}

export default ShapesConfigurator;
