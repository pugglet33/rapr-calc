import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#0A0A0A',
        color: '#00FF00',
        minHeight: '100vh',
      },
    },
  },
  components: {
    Input: {
      defaultProps: {
        focusBorderColor: 'green.400',
      },
      variants: {
        outline: {
          field: {
            borderColor: 'green.500',
            bg: 'blackAlpha.400',
            backdropFilter: 'blur(10px)',
            color: '#00FF00',
            _hover: {
              borderColor: 'green.400',
            },
            _focus: {
              borderColor: 'green.300',
              boxShadow: '0 0 0 1px #48BB78',
            },
            _placeholder: {
              color: 'green.500',
              opacity: 0.6
            }
          },
        },
      },
    },
    Button: {
      defaultProps: {
        colorScheme: 'green',
      },
      variants: {
        solid: {
          bg: 'green.400',
          color: 'black',
          _hover: {
            bg: 'green.500',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            bg: 'green.600',
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
      },
    },
    FormLabel: {
      baseStyle: {
        color: 'green.300',
        fontSize: 'sm',
        fontWeight: 'medium',
        marginBottom: '2',
      },
    },
    Heading: {
      baseStyle: {
        color: 'green.400',
        letterSpacing: 'tight',
        fontWeight: 'bold',
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
