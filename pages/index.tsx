import {
    Box,
    Flex,
    useColorModeValue,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Stack, Button
} from "@chakra-ui/react";
import {
    SaveOutlineIcon,
    AlbumsOutlineIcon,
    ColorFilterOutlineIcon,
    CubeOutlineIcon,
    FileTrayFullOutlineIcon
} from "chakra-ui-ionicons";
import Header from "@components/header";
import React, {useEffect} from "react";
import Shapes from "@components/designer/mobile/tabbar/shapes";
import Object from "@components/designer/mobile/tabbar/object";
import {CanvasProvider, useCanvas} from "@contexts/canvas-context";
import Canvas from "@components/designer/canvas";
import ProductConfigurator from "@components/designer/configurator/product-configurator";
import Products from "@components/designer/mobile/tabbar/products";
import ShapesConfigurator from "@components/designer/configurator/shapes-configurator";
import useSelectedObject from "../src/hooks/use-selected-object";
import useSharedSelectedObject from "../src/hooks/use-selected-object";
import ObjectConfigurator from "@components/designer/configurator/object-configurator";
import editor from "../src/events/editor";
import ExportConfigurator from "@components/designer/configurator/export-configurator";


const HomePage = () => {
    const sidebarBg = useColorModeValue('white', '#444444');
    const tabBarBg = useColorModeValue('white', 'gray.900');
    const [index, setIndex] = useSharedSelectedObject();
    const tabStyle = {
        backgroundColor: useColorModeValue('#454545', '#252525'),
        color: 'white',
        fontWeight: 'bold'
    };
    const isEmpty = (obj) => !obj || obj === {} || obj === [];
    return (
        <>
            <CanvasProvider>
                <>
                    <Flex>
                        <Header maxWidth={'100%'}/>
                        <Flex
                            height={'100vh'}
                            width={'100vw'}
                            paddingTop={'70px'}>
                            <Box
                                bg={sidebarBg}
                                shadow={'lg'}
                                display={['none', 'none', 'flex']}
                                marginX={[0, 0, '10px']}
                                height={'calc(100vh - 80px)'}
                                flex={3}>
                                <Tabs
                                    overflow={'hidden'}
                                    variant={'unstyled'}
                                    flex={1}
                                    shadow={'lg'}
                                    index={index}
                                    onChange={(idx) => {
                                        setIndex(idx);
                                    }}
                                    orientation={'vertical'}>
                                    <TabList
                                        minWidth={'120px'}
                                        color={'white'}
                                        height={'100%'}
                                        bg={useColorModeValue('#777777', '#000000')}>
                                        <Tab _selected={tabStyle}>
                                            <Stack spacing={4}
                                                alignItems={'center'}
                                                direction={'column'}>
                                                <AlbumsOutlineIcon w={6} h={6}/>
                                                <p>Products</p>
                                            </Stack>
                                        </Tab>
                                        <Tab _selected={tabStyle}>
                                            <Stack spacing={4}
                                                alignItems={'center'}
                                                direction={'column'}>
                                                <ColorFilterOutlineIcon w={6} h={6}/>
                                                <p>Shapes</p>
                                            </Stack>
                                        </Tab>
                                        <Tab _selected={tabStyle}>
                                            <Stack spacing={4}
                                                alignItems={'center'}
                                                direction={'column'}>
                                                <CubeOutlineIcon w={6} h={6}/>
                                                <p>Object</p>
                                            </Stack>
                                        </Tab>
                                        <Tab _selected={tabStyle}>
                                            <Stack spacing={4}
                                                alignItems={'center'}
                                                direction={'column'}>
                                                <FileTrayFullOutlineIcon w={6} h={6}/>
                                                <p>Layers</p>
                                            </Stack>
                                        </Tab>
                                        <Tab _selected={tabStyle}>
                                            <Stack spacing={4}
                                                alignItems={'center'}
                                                direction={'column'}>
                                                <SaveOutlineIcon w={6} h={6}/>
                                                <p>Export</p>
                                            </Stack>
                                        </Tab>
                                    </TabList>
                                    <TabPanels>
                                        <TabPanel>
                                            <ProductConfigurator/>
                                        </TabPanel>
                                        <TabPanel>
                                            <ShapesConfigurator/>
                                        </TabPanel>
                                        <TabPanel>
                                            <ObjectConfigurator />
                                        </TabPanel>
                                        <TabPanel>Asset</TabPanel>
                                        <TabPanel>
                                            <ExportConfigurator />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </Box>
                            <Box height={'calc(100vh - 80px)'}
                                 flex={4}
                                 marginX={[0, 0, '10px']}>
                                <Canvas id={'editor'}/>
                            </Box>
                            <Box position={'fixed'}
                                 shadow={'lg'}
                                 display={['flex', 'flex', 'none']}
                                 bottom={0}
                                 left={0}
                                 padding={2}
                                 backgroundColor={tabBarBg}
                                 width={'100vw'}
                                 height={'60px'}>
                                <Flex justifyContent={'space-around'}
                                      direction={'row'}
                                      flex={1}>
                                    <Products/>
                                    <Shapes/>
                                    <Object/>
                                </Flex>
                            </Box>
                        </Flex>
                    </Flex>
                </>
            </CanvasProvider>
        </>
    )
}

export default HomePage;
