import {backgroundColor} from '../src';

import {createTheme} from './restyle';

const palette = {
  purple: '#5A31F4',
  green: '#099C77',
  black: '#101010',
  white: '#FFF',
};

export const theme = createTheme({
  colors: {
    background: palette.white,
    cardPrimaryBackground: palette.purple,
    cardSecondaryBackground: palette.green,
    title: palette.black,
    text: palette.black,
    'foregrounds-contrasting': 'white',
    'foregrounds-primary': 'purple',
    // button variants
    'primary-button-background': '#5433EB',
    'secondary-button-background': 'black',
    'tertiary-button-background': '#F2F4F5',
    'secondary-button-foreground': 'white',
    'tertiary-button-foreground': 'black',
    'outlined-button-border': 'black',
    'highlights-dangerous': 'red',
    transparent: 'transparent',
  },
  spacing: {
    s: 8,
    sm: 12,
    m: 16,
    l: 24,
    xl: 40,
    formInput: 44,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {
      color: 'text',
      fontSize: 16,
    },
    header: {
      fontSize: 48,
      fontWeight: 'bold',
      color: 'title',
    },
    subheader: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'title',
    },
    body: {
      fontSize: 16,
    },
    button: {
      fontWeight: '500',
    },
  },
  cardVariants: {
    defaults: {
      padding: 'm',
      borderRadius: 10,
    },
    primary: {
      backgroundColor: 'cardPrimaryBackground',
    },
    secondary: {
      backgroundColor: 'cardSecondaryBackground',
    },
  },
  buttonVariants: {
    defaults: {
      paddingHorizontal: 'm',
      borderRadius: 10,
      paddingVertical: 'sm',
      backgroundColor: 'primary-button-background',
      color: 'foregrounds-contrasting',
    },
    primary: {
      backgroundColor: 'primary-button-background',
      color: 'foregrounds-contrasting',
    },
    secondary: {
      backgroundColor: 'secondary-button-background',
      color: 'secondary-button-foreground',
    },
    tertiary: {
      backgroundColor: 'tertiary-button-background',
      color: 'tertiary-button-foreground',
    },
    outlined: {
      backgroundColor: 'background',
      color: 'outlined-button-border',
      borderColor: 'outlined-button-border',
      borderWidth: 2,
    },
    danger: {
      backgroundColor: 'highlights-dangerous',
      color: 'foregrounds-contrasting',
    },
    'danger-outlined': {
      backgroundColor: 'background',
      color: 'highlights-dangerous',
      borderColor: 'highlights-dangerous',
      borderWidth: 2,
    },
    text: {
      backgroundColor: 'background',
      color: 'text',
    },
  },
  textInputVariants: {
    defaults: {
      paddingVertical: 'sm',
      paddingHorizontal: 'm',
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'text',
      fontSize: 16,
      color: 'text',
    },
  },
});

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    title: palette.white,
    text: palette.white,
    'foregrounds-contrasting': 'white',
    // button variants
    'primary-button-background': '#5433EB',
    'secondary-button-background': 'black',
    'tertiary-button-background': '#1d1d1d',
    'tertiary-button-foreground': 'white',
    'outlined-button-border': 'white',
    'highlights-dangerous': 'red',
    transparent: 'transparent',
  },
};

export type Theme = typeof theme;
