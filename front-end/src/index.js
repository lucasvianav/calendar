import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';


ReactDOM.render(<ChakraProvider><App/></ChakraProvider>, document.getElementById('root'));