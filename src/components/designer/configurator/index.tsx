import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/tabs";
import ExportConfigurator from "./export-configurator";
import { LayerConfigurator } from "./layer-configurator";
import ObjectConfigurator from "./object-configurator";
import ProductConfigurator from "./product-configurator";
import ShapesConfigurator from "./shapes-configurator";

const Configurator = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Background</Tab>
        <Tab>Shapes</Tab>
        <Tab>Layers</Tab>
        <Tab>Export</Tab>
      </TabList>

      <TabPanels id="configurator" overflowY={'scroll'} maxH={'calc(100vh - 140px)'}>
        <TabPanel>
          <ProductConfigurator />
        </TabPanel>
        <TabPanel>
          <ShapesConfigurator />
          <ObjectConfigurator />
        </TabPanel>
        <TabPanel>
          <LayerConfigurator />
        </TabPanel>
        <TabPanel>
          <ExportConfigurator />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Configurator;
