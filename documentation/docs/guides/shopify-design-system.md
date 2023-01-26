---
id: shopify-design-system
title: Getting Setup With the Shopify Design System
---

To start using Shopify style assets we can leverage [Polaris tokens](https://github.com/Shopify/polaris/tree/main/polaris-tokens). You can see all of the tokens [here](https://polaris.shopify.com/tokens/colors).

#### Installation

Using [npm](https://www.npmjs.com/):

`npm install @shopify/polaris-tokens --save`

Using [yarn](https://yarnpkg.com/en/):

`yarn add @shopify/polaris-tokens`

#### Define Your Theme

```tsx
// In theme
import tokens from '@shopify/polaris-tokens';
import {createTheme} from '@shopify/restyle';

const pxToNumber = (px: string) => {
  return parseInt(px.replace('px', ''), 10);
};

const theme = createTheme({
  colors: {
    body: tokens.colorBlack,
    backgroundRegular: tokens.colorWhite,
    backgroundSubdued: tokens.colorSkyLighter,

    foregroundRegular: tokens.colorBlack,
    foregroundOff: tokens.colorInkLight,
    foregroundSubdued: tokens.colorInkLightest,
    foregroundContrasting: tokens.colorWhite,
    foregroundSuccess: tokens.colorGreenDark,

    highlightPrimary: tokens.colorIndigo,
    highlightPrimaryDisabled: tokens.colorIndigoLight,

    buttonBackgroundPlain: tokens.colorSky,
    errorPrimary: tokens.colorRed,

    iconBackgroundDark: tokens.colorBlueDarker,
  },
  spacing: {
    none: tokens.spacingNone,
    xxs: pxToNumber(tokens.spacingExtraTight),
    xs: pxToNumber(tokens.spacingTight),
    s: pxToNumber(tokens.spacingBaseTight),
    m: pxToNumber(tokens.spacingBase),
    l: pxToNumber(tokens.spacingLoose),
    xl: pxToNumber(tokens.spacingExtraLoose),
    xxl: 2 * pxToNumber(tokens.spacingExtraLoose),
  },
});

export type Theme = typeof theme;
export default theme;
```

Now you can easily style your components with [Shopify Polaris](https://polaris.shopify.com/).
