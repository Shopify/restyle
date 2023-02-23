---
id: defining-your-theme
title: Defining your theme
---

Any project using this library should have a global theme object which specifies a set of values for spacing, colors, breakpoints, and more. These values are made available to Restyle components, so that you can for example write `backgroundColor="cardPrimary"` to use the named color from your theme. In fact, TypeScript enforces the `backgroundColor` property to _only_ accept colors that have been defined in your theme, and autocompletes values for you in a modern editor.

Below is an example of how a basic theme could look. Make sure to read the other sections in [Fundamentals](/fundamentals) for more details on how to set up your different theme values.

```ts
import {createTheme} from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
});

export type Theme = typeof theme;
export default theme;
```

_Note: `createTheme` doesn't do anything except enforcing the theme to have the same shape as the BaseTheme, but it preserves the types of your user specific values (e.g. what colors the theme has) so you don't lose typesafety as a result of the `{ [key:string]: any }` in BaseTheme_

This theme should be passed to a `ThemeProvider` at the top of your React tree:

```tsx
import {ThemeProvider} from '@shopify/restyle';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>{/* Rest of the app */}</ThemeProvider>
);
```
