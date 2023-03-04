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
import {AlbumsOutlineIcon, ColorFillOutlineIcon} from "chakra-ui-ionicons";
import React from "react";
import ProductConfigurator from "@components/designer/configurator/product-configurator";

const Products = () => {

    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
            <IconButton variant={'ghost'} onClick={onOpen} aria-label={'Shapes'} icon={<AlbumsOutlineIcon w={6} h={6} />} />
            <Drawer isOpen={isOpen} placement={'bottom'} onClose={onClose}>
                <DrawerOverlay/>
                <DrawerContent height={'80vh'}>
                    <DrawerCloseButton colorScheme={'brand'}/>
                    <DrawerHeader>
                        Product Options
                    </DrawerHeader>
                    <DrawerBody>
                        <ProductConfigurator hideHeading={true}/>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export default Products;
