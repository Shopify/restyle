import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type ResponsiveValue<Value, Theme extends BaseTheme> =
  | Value
  | {[Key in keyof Theme['breakpoints']]?: Value};

export interface BaseTheme {
  colors: {
    [key: string]: string;
  };
  spacing: {
    [key: string]: number;
  };
  breakpoints: {
    [key: string]: number;
  };
  zIndices?: {
    [key: string]: number;
  };
  borderRadii?: {
    [key: string]: number;
  };
  [key: string]: any;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface RestyleFunctionContainer<
  TProps extends Record<string, unknown>,
  Theme extends BaseTheme = BaseTheme,
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme = keyof Theme
> {
  property: P;
  themeKey?: K;
  variant: boolean;
  func: RestyleFunction<TProps, Theme>;
}

export type RestyleFunction<
  TProps extends Record<string, unknown> = Record<string, unknown>,
  Theme extends BaseTheme = BaseTheme
> = (
  props: TProps,
  context: {theme: Theme; dimensions: Dimensions},
) => Record<string, any>;

export type RNStyle = ViewStyle | TextStyle | ImageStyle;
