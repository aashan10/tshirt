import {Flex} from "@chakra-ui/layout";
import {Box, Button, Grid, IconButton, useColorModeValue} from "@chakra-ui/react";
import {fabric} from "fabric";
import {
    CloseIcon
} from "chakra-ui-ionicons";
import {useEffect, useState} from "react";
import {useCanvas} from "@contexts/canvas-context";
import CircleMutator from "@object-mutator/circle-mutator";
import PolygonMutator from "@object-mutator/polygon-mutator";
import PathMutator from "@object-mutator/path-mutator";


interface ObjectConfiguratorProps {
    hideHeading?: boolean;
}

const ObjectConfigurator = ({hideHeading}: ObjectConfiguratorProps) => {
    const [object, setObject] = useState<fabric.Object | null>(null);
    const [objects, setObjects] = useState<Array<fabric.Object> | null>(null);
    const {activeObject, editor} = useCanvas();
    const scrollbarColor = useColorModeValue('#ccc', '#111');
    useEffect(() => {
        if (activeObject) {
            if (activeObject instanceof Array) {
                setObjects(activeObject)
            } else {
                setObject(activeObject);
            }
        }
    }, [activeObject]);

    let Mutator = ({object}: { object: fabric.Object }) => {
        switch (object.type) {
            case 'circle':
                return (
                    // @ts-ignore
                    <CircleMutator circle={object}/>
                )

            case 'rect':
            case 'polygon':
            case 'triangle':
                return (
                    // @ts-ignore
                    <PolygonMutator polygon={object} />
                )
            case 'path':
                return (
                    // @ts-ignore
                    <PathMutator path={object} />
                )
            default:
                return <></>
        }
    };

    return (
        <>
            <Flex direction={'column'}>
                <Flex display={hideHeading ? 'none' : 'flex'} flex={1} paddingY={4}>
                    <strong>Object</strong>
                </Flex>
                <Flex mt={6}
                      height={'calc(100vh - 192px)'}
                      pb={10}
                      mb={3}
                      css={{
                          '&::-webkit-scrollbar': {
                              width: '0.5em',
                              cursor: 'pointer'
                          },
                          '&::-webkit-scrollbar-thumb': {
                              backgroundColor: 'darkgrey',
                              borderRadius: '25px'

                          },
                      }}
                      overflowY={'scroll'} direction={'column'}>
                    <Flex direction={'column'}>
                        {
                            objects?.map((obj, idx) => {
                                return (
                                    <Flex key={idx} direction={'column'} marginBottom={5}>
                                        <Flex justifyContent={'space-between'}>
                                            <Box fontSize={30} textTransform={'capitalize'}>
                                                {obj.type}
                                            </Box>
                                            <Button variant={'ghost'} title={'Remove Object'}
                                                    onClick={() => {
                                                        editor?.remove(obj);
                                                        editor?.renderAll();
                                                        const activeObjects = objects.filter((activeObject) => {
                                                            return activeObject !== obj;
                                                        });
                                                        setObjects(activeObjects);
                                                    }}
                                                    colorScheme={'red'}
                                                    position={'relative'}
                                                    top={0}
                                                    right={0}
                                                    leftIcon={<CloseIcon/>}
                                            >
                                                Remove Object
                                            </Button>

                                        </Flex>
                                        <Mutator object={obj}/>
                                    </Flex>
                                )
                            })
                        }
                        {
                            objects?.length === 0 ? <>Please click on an object or select multiple objects!</> : <></>
                        }
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default ObjectConfigurator;
