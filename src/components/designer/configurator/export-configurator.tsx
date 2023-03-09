import { Flex } from "@chakra-ui/layout";
import { Button, VStack } from "@chakra-ui/react";
import React from "react";
import { useCanvas } from "@contexts/canvas-context";
import { fabric } from "fabric";

interface ExportConfiguratorProps {
  hideHeading?: boolean;
}

fabric.Image.prototype.getSvgSrc = function() {
    return this.toDataURL();
}

const ExportConfigurator = ({ hideHeading }: ExportConfiguratorProps) => {
  const { editor } = useCanvas();

  const download = (filename: string, content: string) => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "s", ctrlKey: true })
    );
    const el = document.createElement("a");
    el.setAttribute("href", content);
    el.setAttribute("download", filename);
    el.style.display = "none";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
    window.location.reload();
  };

  return (
    <>
      <Flex direction={"column"}>
        <Flex display={hideHeading ? "none" : "flex"} flex={1} paddingY={4}>
          <strong>Export</strong>
        </Flex>
        <Flex
          mt={6}
          height={"calc(100vh - 192px)"}
          pb={10}
          mb={3}
          css={{
            "&::-webkit-scrollbar": {
              width: "0.5em",
              cursor: "pointer",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "darkgrey",
              borderRadius: "25px",
            },
          }}
          overflowY={"scroll"}
          direction={"column"}
        >
          <Flex direction={"column"}>
            <VStack spacing={"10px"} flex={1}>
              <Button
                w={"100%"}
                onClick={() => {
                  download(
                    "export_with_bg.svg",
                    "data:image/svg;charset=utf8," +
                      encodeURIComponent(editor.toSVG())
                  );
                }}
              >
                SVG
              </Button>
              <Button
                w={"100%"}
                onClick={() => {
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "s", ctrlKey: true })
                  );
                  const objects = [];
                  editor.getObjects().map((object) => {
                    objects.push(object);
                  });
                  let group = new fabric.Group(objects, { top: 0, left: 0 });
                  const newCanvas = new fabric.Canvas("exporter", {
                    height: group.height,
                    width: group.width,
                  });
                  newCanvas.add(group);

                  download(
                    "export.svg",
                    "data:image/svg;charset=utf8," +
                      encodeURIComponent(newCanvas.toSVG({ supressPreamble: true }))
                  );
                }}
              >
                SVG without Background
                <canvas
                  id={"exporter"}
                  style={{ display: "none", visibility: "hidden" }}
                />
              </Button>
              <Button
                w={"100%"}
                onClick={() => {
                  const dataUrl = editor.toDataURL({
                    format: "png",
                    multiplier: 1,
                    quality: 1,
                    left: 0,
                    top: 0,
                    width: editor.width,
                    height: editor.height,
                  });

                  download("export.png", dataUrl);
                }}
              >
                PNG
              </Button>

              <Button
                w={"100%"}
                onClick={() => {
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "s", ctrlKey: true })
                  );
                  const objects = [];
                  editor.getObjects().map((object) => {
                    objects.push(object);
                  });
                  let group = new fabric.Group(objects, { top: 0, left: 0 });
                  const newCanvas = new fabric.Canvas("exporter", {
                    height: group.height,
                    width: group.width,
                  });
                  newCanvas.add(group);

                  const dataUrl = newCanvas.toDataURL({
                    format: "png",
                    multiplier: 1,
                    quality: 1,
                    left: 0,
                    top: 0,
                    width: editor.width,
                    height: editor.height,
                  });

                  download("export.png", dataUrl);
                }}
              >
                PNG without Background
              </Button>
              <Button
                w={"100%"}
                onClick={() => {
                  const dataUrl = editor.toDataURL({
                    format: "jpg",
                    multiplier: 1,
                    quality: 1,
                    left: 0,
                    top: 0,
                    width: editor.width,
                    height: editor.height,
                  });

                  download("export.jpg", dataUrl);
                  editor.renderAll();
                }}
              >
                JPG
              </Button>
              <Button
                w={"100%"}
                onClick={() => {
                  window.dispatchEvent(
                    new KeyboardEvent("keydown", { key: "s", ctrlKey: true })
                  );
                }}
              >
                Save Locally
              </Button>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ExportConfigurator;
