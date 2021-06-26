import React, {useEffect, useState} from "react"
import 'focus-visible/dist/focus-visible';

import {Global, css} from '@emotion/react';
import {Progress, ChakraProvider} from "@chakra-ui/react";
import theme from "@themes/theme";
import {Router} from "next/router";

const GlobalStyles = css`
    .js-focus-visible :focus:not([data-focus-visible-added]) {
        outline: none;
        box-shadow: none;
        border: none;
    }
`

const MyApp = ({Component, pageProps}): React.ReactElement => {

    const [navigating, setNavigating] = useState<boolean>(false);
    useEffect(() => {
        Router.events.on('routeChangeStart', () => {
            setNavigating(true);
        });
        Router.events.on('routeChangeComplete', () => {
            setNavigating(false);
        });
    }, []);

    return (
        <ChakraProvider theme={theme}>
            <Global styles={GlobalStyles}/>
            {navigating ? (
                <Progress aria-label={'Loading ...'}
                          position={'absolute'}
                          zIndex={1000}
                          top={0}
                          width={'100%'}
                          size={'sm'}
                          colorScheme={'brand'}
                          isIndeterminate={true}/>
            ) : null}
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp;
