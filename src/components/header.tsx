import {
    Flex,
    IconButton,
    useColorModeValue,
    Drawer,
    Button,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerBody,
    useDisclosure,
    Stack,
    useColorMode,
    Box, DrawerHeader
} from "@chakra-ui/react";
import {MenuIcon} from 'chakra-ui-ionicons';
import React from "react";
import {MoonIcon, SunnyIcon} from "chakra-ui-ionicons";
import Image from 'next/image';
import Head from "next/head";

interface HeaderProps {
    maxWidth?: number | string
}

const Header = ({maxWidth}: HeaderProps) => {

    const headerBg = useColorModeValue('white', 'gray.900');
    const {isOpen, onOpen, onClose} = useDisclosure();
    const btnRef = React.useRef()
    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Flex position={'fixed'}
              top={0}
              left={0}
              shadow={'lg'}
              width={'100%'}
              height={'60px'}
              bg={headerBg}
              zIndex={1000}
              justifyContent={'center'}>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="description" content="T-Shirt Wine - Design your own t-shirts"/>
                <meta name="keywords" content="T-Shirt, Custom Print, T-Shirt print, T-Shirt design"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Design your T-Shirt</title>
            </Head>
            <Flex maxWidth={maxWidth ?? '1280px'}
                  padding={3}
                  flex={1}>
                <IconButton variant={'ghost'}
                            icon={<MenuIcon/>}
                            display={['block', 'block', 'none']}
                            aria-label={'Menu'}
                            onClick={onOpen}/>

                <Flex justifyContent={'space-between'} flex={1}>
                    <Stack spacing={2}>
                        <Box>
                            <Image src={'/logo.png'}
                                   alt={'T-Shirt Logo'}
                                   height={30} width={32}/>
                        </Box>
                    </Stack>
                    <Stack display={['none', 'none', 'flex']}
                           spacing={2}
                           direction={'row'}>
                        <Button display={['none', 'block', 'block']}
                                _hover={{color: 'white', bg: 'brand.500'}}
                                colorScheme={'brand'}>
                            Start Designing
                        </Button>
                        <Button variant={'ghost'} colorScheme={'blue'}>Signup</Button>
                        <Button>Login</Button>
                        <IconButton aria-label={'Color Mode'}
                                    onClick={toggleColorMode}
                                    icon={colorMode === 'light' ? <MoonIcon/> : <SunnyIcon/>}/>
                    </Stack>
                </Flex>

                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerCloseButton colorScheme={'brand'}/>
                        <DrawerHeader mt={5}/>
                        <DrawerBody>
                            <Stack display={['flex', 'flex', 'none']}
                                   spacing={2}
                                   direction={'column'}>
                                <Button display={['none', 'block', 'block']}
                                        _hover={{color: 'white', bg: 'brand.500'}}
                                        colorScheme={'brand'}
                                        variant={'ghost'}>
                                    Start Designing
                                </Button>
                                <Button>Signup</Button>
                                <Button>Login</Button>
                                <IconButton aria-label={'Color Mode'}
                                            onClick={toggleColorMode}
                                            icon={colorMode === 'light' ? <MoonIcon/> : <SunnyIcon/>}/>
                            </Stack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
        </Flex>
    )
}

export default Header;
