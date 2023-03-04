import {useCanvas} from "@contexts/canvas-context";
import {useEffect, useState} from "react";
import {fabric} from "fabric";
import {Flex} from "@chakra-ui/layout";
import {Box, Grid} from "@chakra-ui/react";
import Image from 'next/image';

interface ProductConfiguratorProps {
    hideHeading?: boolean
}

const ProductConfigurator = ({hideHeading}: ProductConfiguratorProps) => {
    const {editor} = useCanvas();
    const products = ['red', 'skyblue', 'darkgray', 'yellow', 'white', 'orange'];
    const positions = ['front', 'back'];

    const [activeColor, setActiveColor] = useState<string>('white');
    const [activePosition, setActivePosition] = useState<string>('front');
    useEffect(() => {
        fabric.Image.fromURL(`/bg/${activePosition}_${activeColor}.png`, (image) => {
            const scale = editor?.height / image.height;
            editor?.setBackgroundImage(image, editor?.renderAll.bind(editor), {
                scaleX: scale,
                scaleY: scale,
                originX: 'center',
                originY: 'center',
                top: editor?.height / 2,
                left: editor?.width / 2
            })
        });
    }, [activeColor, activePosition, editor]);
    return (
        <>
            <Flex direction={'column'}>
                <Flex display={hideHeading ? 'none' : 'flex'} flex={1} paddingY={4}>
                    <strong>Product Options</strong>
                </Flex>
                <Flex mt={6} flex={1} direction={'column'}>
                    <Flex direction={'column'} flex={1}>
                        <strong>Positions</strong>
                        <Grid templateColumns={['30% 30% 30%', '30% 30% 30%', '30% 30% 30%', '18% 18% 18% 18% 18%']}
                              columnGap={['5%', '5%', '5%', '2.5%']} rowGap={'1em'}>
                            {
                                positions.map((position, index) => {
                                    return (
                                        <Box
                                            flex={1}
                                            width={'100%'}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: position === activePosition ? 'red' : 'transparent',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => {
                                                setActivePosition(position)
                                            }}
                                            key={index}
                                            justifyContent={'center'}
                                            display={"flex"}>
                                            <Image width={128} height={150} alt={`${position} ${activeColor}`}
                                                 src={`/bg/${position}_${activeColor}.png`}
                                                 />
                                        </Box>
                                    )
                                })
                            }
                        </Grid>
                    </Flex>

                    <Flex mt={10} direction={'column'} flex={1}>
                        <strong>Color Configurations</strong>
                        <Grid templateColumns={['30% 30% 30%', '30% 30% 30%', '30% 30% 30%', '18% 18% 18% 18% 18%']}
                              columnGap={['5%', '5%', '5%', '2.5%']} rowGap={'1em'}>
                            {
                                products.map((product, index) => {
                                    return (
                                        <Box style={{
                                            borderWidth: 1,
                                            borderColor: product === activeColor ? 'red' : 'transparent'
                                        }}
                                             onClick={() => {
                                                 setActiveColor(product)
                                             }}
                                             width={'100%'}
                                             key={index}
                                             cursor={'pointer'}
                                             justifyContent={'center'}
                                             display={"flex"}>
                                            <Image width={128} height={150} alt={`${activePosition} ${product}`}
                                                 src={`/bg/${activePosition}_${product}.png`} />
                                        </Box>
                                    )
                                })
                            }
                        </Grid>

                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default ProductConfigurator;
