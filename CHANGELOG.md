# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.1.0 - 2022-04-11
* Handle Pressable function style prop by [CodyBrouwers](https://github.com/CodyBrouwers) in https://github.com/Shopify/restyle/pull/138
* Fix default variant not being applied by [nelyousfi](https://github.com/nelyousfi) in https://github.com/Shopify/restyle/pull/148

## 2.0.0 - 2022-03-07
* Export composeRestyleFunctions and update `useRestyle` docs [211b29d5](https://github.com/Shopify/restyle/commit/211b29d549787fb3b38df652d2effe9660fcd374) by [sbalay](https://github.com/sbalay)

## 1.8.0 - 2022-03-04
* Send a stable reference for style object [#133](https://github.com/Shopify/restyle/pull/133) by [jamesism](https://github.com/jamesism)

## 1.7.0 - 2022-02-24
* Performance improvements [#131](https://github.com/Shopify/restyle/pull/131) by [sbalay](https://github.com/sbalay)

## 1.6.2 - 2022-02-21
* Fix web support for variants [#121](https://github.com/Shopify/restyle/pull/121) by [dobrea-v](https://github.com/dobrea-v)

## 1.6.1 - 2021-12-01
* Allow using 'auto' as value of spacing props. [#118](https://github.com/Shopify/restyle/pull/118) by [sbalay](https://github.com/sbalay)

## 1.6.0 - 2021-11-25
* Fix incorrect props when empty breakpoints. [#115](https://github.com/Shopify/restyle/pull/115) by [@nelyousfi](https://github.com/nelyousfi)
* Improve rendering performance on breakpoint changes and re-renders. [#113](https://github.com/Shopify/restyle/pull/113) by [@omulet](https://github.com/omulet)
* Updated React Native to 0.66 and fixed eslint issues.  [#117](https://github.com/Shopify/restyle/pull/117) by [@davebcn87](https://github.com/davebcn87)

## 1.5.0 - 2021-11-01
* Export ThemeContext for outside use. [#80](https://github.com/Shopify/restyle/pull/80) by [@mohsinulhaq](https://github.com/mohsinulhaq)
* Fixing the example usages of createRestyleComponent in the README. [#82](https://github.com/Shopify/restyle/pull/82) by [@lucasstorti](https://github.com/lucasstorti)
* Fix ts error for useRestyle hook. [#87](https://github.com/Shopify/restyle/pull/87) by [@andre-krueger](https://github.com/andre-krueger)
* Improve web support with StyleSheet when creating styles. [#94](https://github.com/Shopify/restyle/pull/94) by [@yuriazevedo11](https://github.com/yuriazevedo11)
* Fix removeEventListener warning in rn0.65. [#112](https://github.com/Shopify/restyle/pull/112) by [@alexanderstrom](https://github.com/alexanderstrom)
* Update outdated Polaris tokens link in README.md. [#114](https://github.com/Shopify/restyle/pull/114) by [@nelyousfi](https://github.com/nelyousfi)

## 1.4.0 - 2020-12-15
* Add 2-dimensional breakpoints [#70](https://github.com/Shopify/restyle/pull/70) by [@Johan-duitot](https://github.com/Johan-dutoit)

## 1.3.1 - 2020-10-26
* Silently ignore any errors caused by missing a variant definition in the theme (e.g. textVariants), to preserve backwards compatibility. [#64](https://github.com/Shopify/restyle/pull/64) by [@jonogreenz](https://github.com/jonogreenz)
* Disallow creating a variant with the existing base theme keys of `colors, spacing, breakpoints, zIndices, borderRadii`. [#64](https://github.com/Shopify/restyle/pull/64) by [@jonogreenz](https://github.com/jonogreenz)
* Improve rendering performance by removing unnecessary uses of the spread operator. [#63](https://github.com/Shopify/restyle/pull/63) by [@JoelBesada](https://github.com/JoelBesada)
* ~~Add a more descriptive error when theme is missing a key for a used variant.~~ [#59](https://github.com/Shopify/restyle/pull/59) by [@Charly6596](https://github.com/Charly6596) (*Replaced by [PR #64](https://github.com/Shopify/restyle/pull/64)*)

## 1.3.0 - 2020-09-22
* Add support for defining default values for variants in the theme. [#51](https://github.com/Shopify/restyle/pull/51) by [@Johan-duitot](https://github.com/Johan-dutoit)

## 1.2.0 - 2020-08-19
* Improve typesafety of createRestyleFunction for correct property values. [#36](https://github.com/Shopify/restyle/pull/36) by [@hammadj](https://github.com/hammadj)
* Add `start` and `end` (e.g. `paddingStart`) properties where applicable to better support RTL layouts. [#38](https://github.com/Shopify/restyle/pull/38) by [@salzhrani](https://github.com/salzhrani)
* Fix `useRestyle` types not accepting a function created by `createVariants`. [#41](https://github.com/Shopify/restyle/pull/41) by [@JoelBesada](https://github.com/JoelBesada)
* Make `createRestyleComponent`, `createBox` and `createText` correctly forward the `ref` prop to the underlying component. [#42](https://github.com/Shopify/restyle/pull/42) by [@JoelBesada](https://github.com/JoelBesada)

## 1.1.0 - 2020-07-25
- Improve type safety and type inference of `createVariant`, `createBox`, `createText`, `useRestyle`, `createRestyleFunction` and `createRestyleComponent`. [#16](https://github.com/Shopify/restyle/pull/16) and [#21](https://github.com/Shopify/restyle/pull/21) by [@hammadj](https://github.com/hammadj), [#26](https://github.com/Shopify/restyle/pull/26) by [@Johan-duitot](https://github.com/Johan-dutoit)
- Add a `createTheme` helper function to enforce proper shape for user themes. [#18](https://github.com/Shopify/restyle/pull/18/files) by [@hammadj](https://github.com/hammadj)
- Add shorthand names for spacing and backgroundColor props. [#22](https://github.com/Shopify/restyle/pull/22) by [@hammadj](https://github.com/hammadj)
- Fix a bug in `createVariant` where defaults were only applied when the variant prop was passed in. [#28](https://github.com/Shopify/restyle/pull/28) by [@hammadj](https://github.com/hammadj)
- Add a hook `useResponsiveProp` to deconstruct responsive prop values. [#27](https://github.com/Shopify/restyle/pull/27) by [@hammadj](https://github.com/hammadj)

## 1.0.4 - 2020-02-26

- Public release

## 1.0.3 - 2020-01-10

- Fix bug where `0` or other falsy values aren't allowed in the theme.

## 1.0.2 - 2020-01-03

- Accept `children` by default in components created with `createBox` and `createText`.

## 1.0.1 - 2020-01-03

- Fix a bug where `children` would always be a required prop in `createRestyleComponent`.

## 1.0.0 - 2019-12-20

- Rename library to `@shopify/restyle`
- [BREAKING] Rename `useStyleSystem` to `useRestyle`
- [BREAKING] Rename `createStyleSystemFunction` to `createRestyleFunction`
- [BREAKING] Rename `createStyleSystemComponent` to `createRestyleComponent`

## 0.1.10 - 2019-12-05

- Accept override component prop types in `createText` and `createBox`.

## 0.1.9 - 2019-10-28

- Accept optional underlying component to use in `createText` and `createBox`.

## 0.1.8 - 2019-09-26

- Fix component created with `createText` not accepting React Native `Text` properties.

### Removed

- Removed component override prop, it's not really needed in practice and it makes managing the types much more complicated.

## 0.1.7 - 2019-09-25

### Added

- Added optional type argument to `useTheme` to set the returned type, e.g. `useTheme<Theme>()`

## 0.1.6 - 2019-09-24

### Added

- Added `shadow` style function to `createBox`
- Added `textShadow` style function to `createText`

## 0.1.5 - 2019-09-19

- Map `shadowColor` and `textShadowColor` to `colors` theme key

## 0.1.3 - 2019-09-13

### Added

- Added `defaults` parameter to `createVariant` to set default values that should be applied before anything from the theme.

## 0.1.2 - 2019-09-11

- Compile library without JSX

## 0.1.1 - 2019-09-11

- Changed TypeScript compile target to `es5` (instead of `esnext`)

## 0.1.0 - 2019-09-10

- Initial release
