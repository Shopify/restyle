# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
