import {
    IconButton,
    Drawer,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody, Stack, useBreakpointValue, useBreakpoint
} from "@chakra-ui/react";
import {ColorFillOutlineIcon} from "chakra-ui-ionicons";
import React, {useEffect} from "react";
import useSharedSelectedObject from "../../../../hooks/use-selected-object";
import ObjectConfigurator from "@components/designer/configurator/object-configurator";

const Object = () => {

    const {isOpen, onOpen, onClose} = useDisclosure();
    const [index] = useSharedSelectedObject();
    const breakpoint = useBreakpoint();
    useEffect(() => {
        if (index === 2 && breakpoint === 'sm' || breakpoint === 'base') {
            onOpen();
        }
    }, [index]);
    return (
        <>
            <IconButton variant={'ghost'} onClick={onOpen} aria-label={'Shapes'}
                        icon={<ColorFillOutlineIcon w={6} h={6}/>}/>
            <Drawer isOpen={isOpen} placement={'bottom'} onClose={onClose}>
                <DrawerOverlay/>
                <DrawerContent height={'80vh'}>
                    <DrawerCloseButton colorScheme={'brand'}/>
                    <DrawerHeader>
                        Object
                    </DrawerHeader>
                    <DrawerBody>
                        <ObjectConfigurator hideHeading/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Object;
