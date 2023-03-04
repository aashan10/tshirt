import { CanvasProvider } from "@contexts/canvas-context";
import Canvas from "@components/designer/canvas";
import { Flex } from "@chakra-ui/layout";
import { Grid, GridItem } from "@chakra-ui/react";
import Configurator from "@/components/designer/configurator";
import Header from "@/components/header";

const HomePage = () => {
  return (
    <CanvasProvider>
      <>
        <Header />
        <Flex height={"100vh"} width={"100vw"} p={2} paddingTop={"70px"}>
          <Grid flex={1} templateColumns={"repeat(2, 50%)"} gap={0}>
            <GridItem p={2} shadow={"md"} bg={"gray.700"}>
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
