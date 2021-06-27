import {Flex} from "@chakra-ui/layout";
import {Button, HStack} from "@chakra-ui/react";
import React from "react";
import {useCanvas} from "@contexts/canvas-context";
import {fabric} from "fabric";

interface ExportConfiguratorProps {
    hideHeading?: boolean;
}

const ExportConfigurator = ({hideHeading}: ExportConfiguratorProps) => {

    const {editor} = useCanvas();

    const download = (filename: string, content: string) => {
        const el = document.createElement('a');
        el.setAttribute('href', 'data:image/svg;charset=utf8, ' + encodeURIComponent(content));
        el.setAttribute('download', filename);
        el.style.display = 'none';
        document.body.appendChild(el);
        el.click();
        document.body.removeChild(el);
    }

    return (
        <>
            <Flex direction={'column'}>
                <Flex display={hideHeading ? 'none' : 'flex'} flex={1} paddingY={4}>
                    <strong>Export</strong>
                </Flex>
                <Flex mt={6}
                      height={'calc(100vh - 192px)'}
                      pb={10}
                      mb={3}
                      css={{
                          '&::-webkit-scrollbar': {
                              width: '0.5em',
                              cursor: 'pointer'
                          },
                          '&::-webkit-scrollbar-thumb': {
                              backgroundColor: 'darkgrey',
                              borderRadius: '25px'

                          },
                      }}
                      overflowY={'scroll'} direction={'column'}>
                    <Flex direction={'column'}>
                        <HStack spacing={'10px'} flex={1}>
                            <Button onClick={() => {
                                download('export_with_bg.svg', editor.toSVG());
                            }}>Export as SVG</Button>
                            <Button onClick={() => {
                                localStorage.setItem('canvasElements', JSON.stringify(editor.toJSON()))
                                const objects = [];
                                editor.getObjects().map((object) => {
                                    objects.push(object);
                                });
                                let group = new fabric.Group(objects, {top: 0, left: 0});
                                const newCanvas = new fabric.Canvas('exporter', {
                                    height: group.height,
                                    width: group.width,
                                });
                                newCanvas.add(group);
                                download('export.svg', newCanvas.toSVG());
                                window.location.reload();
                            }}>
                                Export as SVG without Background
                                <canvas id={'exporter'} style={{display: 'none'}} />
                            </Button>
                        </HStack>
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

export default ExportConfigurator;
