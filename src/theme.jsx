import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  colors: {
    main: {
      50: '#f9f9e7',
      100: '#ececc6',
      200: '#dfdfa3',
      300: '#d2d27e',
      400: '#c5c55a',
      500: '#abab41',
      600: '#858532',
      700: '#5f5f23',
      800: '#393913',
      900: '#131300',
    },
    blue: {
      50: '#ddf5ff',
      100: '#b0deff',
      200: '#80c8ff',
      300: '#50b2fe',
      400: '#279cfc',
      500: '#1683e3',
      600: '#0966b2',
      700: '#004980',
      800: '#002c4f',
      900: '#00101f',
    },
    orange: {
      50: '#ffeade',
      100: '#ffc6b0',
      200: '#ffa27f',
      300: '#ff7c4d',
      400: '#fe581b',
      500: '#e53e02',
      600: '#b33000',
      700: '#812100',
      800: '#4f1200',
      900: '#200400',
    },
  },
})

export const colors = {
  undefined: 'main',
  0: 'orange',
  1: 'blue',
}
