import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    colors: {
        // brand: {
        //     50: '#99E2B4',
        //     100: '#88D4AB',
        //     200: '#78C6A3',
        //     300: '#67B99A',
        //     400: '#56AB91',
        //     500: '#469D89',
        //     600: '#358F80',
        //     700: '#248277',
        //     800: '#14746F',
        //     900: '#036666',
        // },
        // brand: {
        //     100: '#C7EFF8',
        //     200: '#91DAF1',
        //     300: '#57B1D7',
        //     400: '#2D81B0',
        //     500: '#01497C',
        //     600: '#00386A',
        //     700: '#002A59',
        //     800: '#001D47',
        //     900: '#00153B',
        // },
        brand : {
          50: '#e55c32',
          100: '#e55c32',
          200: '#e55c32',
          300: '#e55c32',
          400: '#e55c32',
          500: '#e55c32',
          600: '#e55c32',
          700: '#e55c32',
          800: '#e55c32',
          900: '#e55c32'
        },
        // bg : {
        //     50: '#FFFFFF',
        //     100: '#F8F9FA',
        //     200: '#E9ECEF',
        //     300: '#DEE2E6',
        //     400: '#CED4DA',
        //     500: '#ADB5BD',
        //     600: '#6C757D',
        //     700: '#495057',
        //     800: '#343A40',
        //     900: '#212529',
        // }
        gray: {
            50: '#ffffff',
            100: '#F0F0F0',
            200: '#D8D8D8',
            300: '#C0C0C0',
            400: '#A9A9A9',
            500: '#909090',
            600: '#707070',
            700: '#585858',
            800: '#383838',
            900: '#181818',
        },
    },
    styles: {
        global: (props) => ({
            body: {
                color: mode('gray.900', 'gray.100')(props),
                bg: mode('gray.200', 'gray.800')(props),
            },
        }),
    },
})

export default theme
