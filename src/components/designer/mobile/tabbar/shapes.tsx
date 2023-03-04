import {
    IconButton,
    Drawer,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody, Stack
} from "@chakra-ui/react";
import {ColorFilterOutlineIcon} from "chakra-ui-ionicons";
import React from "react";
import ShapesConfigurator from "@components/designer/configurator/shapes-configurator";

const Shapes = () => {

    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <IconButton variant={'ghost'} onClick={onOpen} aria-label={'Shapes'} icon={<ColorFilterOutlineIcon w={6} h={6}/>} />
            <Drawer isOpen={isOpen} placement={'bottom'} onClose={onClose}>
                <DrawerOverlay/>
                <DrawerContent height={'80vh'}>
                    <DrawerCloseButton colorScheme={'brand'}/>
                    <DrawerHeader>
                        Shapes
                    </DrawerHeader>
                    <DrawerBody>
                        <ShapesConfigurator hideHeading={true} onClose={onClose}/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Shapes;
