// `tsc` is run with `noEmit`, so we need to explicitly import from `/src/index.ts`
export type {VariantProps} from '@shopify/restyle/src/index';
export {
  ThemeProvider,
  createBox,
  createText,
  createTheme,
  createRestyleComponent,
  createVariant,
} from '@shopify/restyle/src/index';
