import "@/styles/globals.css";
import { Progress } from "@chakra-ui/progress";
import { ChakraProvider } from "@chakra-ui/provider";
import theme from "@chakra-ui/theme";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [navigating, setNavigating] = useState<boolean>(false);
  useEffect(() => {
    const onRouterChangeStart = () => {
      setNavigating(true);
    };
    const onRouterChangeComplete = () => {
      setNavigating(false);
    };

    Router.events.on("routeChangeStart", onRouterChangeStart);
    Router.events.on("routeChangeComplete", onRouterChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", onRouterChangeStart);
      Router.events.off("routeChangeComplete", onRouterChangeComplete);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      {navigating ? (
        <Progress
          aria-label={"Loading ..."}
          position={"absolute"}
          zIndex={1000}
          top={0}
          width={"100%"}
          size={"sm"}
          colorScheme={"brand"}
          isIndeterminate={true}
        />
      ) : null}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
