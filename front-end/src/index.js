import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ChakraProvider, extendTheme, ColorModeScript } from '@chakra-ui/react'

const theme = extendTheme({ useSystemColorMode: true })

ReactDOM.render(
    // <ChakraProvider theme={theme}>
    <ChakraProvider>
    <App/>
        {/* <ColorModeScript>
            <App/>
        </ColorModeScript> */}
    </ChakraProvider>, 

    document.getElementById('root'));