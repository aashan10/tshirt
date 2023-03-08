import { CanvasProvider } from "@contexts/canvas-context";
import Canvas from "@components/designer/canvas";
import { Flex } from "@chakra-ui/layout";
import { Grid, GridItem, useColorModeValue } from "@chakra-ui/react";
import Configurator from "@/components/designer/configurator";
import Header from "@/components/header";
import { useFonts } from "@/contexts/font-context";

const HomePage = () => {
  const bg = useColorModeValue("gray.100", "gray.700");
  const card = useColorModeValue("white", "gray.800");
  const {fonts} = useFonts();
  
  return (
    <CanvasProvider>
      <>
        <Header />
        <Flex bg={bg} height={"100vh"} width={"100vw"} p={2} paddingTop={"70px"}>
          <Grid flex={1} templateColumns={"30% 70%"} gap={0}>
            <GridItem p={2} shadow={"md"} bg={card}>
              <Configurator />
            </GridItem>
            <GridItem>
              <Canvas id="editor" />
            </GridItem>
          </Grid>
        </Flex>
      </>
    </CanvasProvider>
  );
};

export default HomePage;
