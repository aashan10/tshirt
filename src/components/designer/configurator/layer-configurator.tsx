import { useCanvas } from "@/contexts/canvas-context"
import { Button, Flex, Spacer } from "@chakra-ui/react";
import {ArrowUpIcon, ArrowDownIcon, DiscIcon, ReturnUpBackIcon, ReturnDownForwardIcon } from 'chakra-ui-ionicons';
import { useEffect, useState } from "react";

const LayerConfigurator = () => {

    const {editor} = useCanvas();
    const [activeObject, setActiveObject] = useState(editor?.getActiveObject());

    useEffect(() => {
        const updater = (event) => {                 
            setActiveObject(event.selected);
        }
        editor?.on('selection:created', updater);
        editor?.on('selection:updated', updater);
        editor?.on('selection:cleared', updater);

        return () => {
            editor?.off('selection:created', updater);
            editor?.off('selection:updated', updater);
            editor?.off('selection:cleared', updater);
        }
    }, [editor]);

    return (
        <Flex direction={'column'}>
            {editor?.getObjects().map((object, index) => {
                
                const isActive =  activeObject && activeObject.indexOf(object) > -1;
                return (
                    <Flex rounded={10} mt={4} px={4} py={2} justify={'space-between'} align={'center'} bg={isActive ? 'rgba(0,0,0,0.25)' : ''} key={index} flexDirection='row' flex={1} justifyContent={'space-between'} autoCapitalize={'true'}>
                        {object.type}
                        <Flex>
                            <Button title="Highlight Layer" variant={'ghost'} colorScheme={'blue'} onClick={() => {
                                editor.setActiveObject(object);
                            }}>
                                <DiscIcon/>
                            </Button>
                            <Spacer />
                            <Button title="Bring Forward" variant={'ghost'} colorScheme={'blue'} onClick={() => {
                                editor.bringForward(object);
                            }}>
                                <ArrowUpIcon/>
                            </Button>
                            <Spacer />
                            <Button title="Send Backwards" variant={'ghost'} colorScheme={'blue'} onClick={() => {
                                editor.sendBackwards(object);
                            }}>
                                <ArrowDownIcon/>
                            </Button>
                            <Button title="Bring to Front" variant={'ghost'} colorScheme={'blue'} onClick={() => {
                                editor.bringToFront(object);
                            }}>
                                <ReturnUpBackIcon/>
                            </Button>
                            <Spacer />
                            <Button title="Send Back" variant={'ghost'} colorScheme={'blue'} onClick={() => {
                                editor.sendToBack(object);
                            }}>
                                <ReturnDownForwardIcon/>
                            </Button>
                        </Flex>
                    </Flex>
                )
            })}
        </Flex>
    )
}

export{LayerConfigurator}