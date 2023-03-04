import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/tabs";
import ExportConfigurator from "./export-configurator";
import ObjectConfigurator from "./object-configurator";
import ProductConfigurator from "./product-configurator";
import ShapesConfigurator from "./shapes-configurator";

const Configurator = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Product Variants</Tab>
        <Tab>Shapes</Tab>
        <Tab>Export</Tab>
      </TabList>

      <TabPanels id="configurator" overflowY={'scroll'} maxH={'80vh'}>
        <TabPanel>
          <ProductConfigurator />
        </TabPanel>
        <TabPanel>
          <ShapesConfigurator />
          <ObjectConfigurator />
        </TabPanel>
        <TabPanel>
          <ExportConfigurator />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Configurator;
