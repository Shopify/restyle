import {ImageStyle, TextStyle, ViewStyle} from 'react-native';

export type AtLeastOneResponsiveValue<
  Value,
  Theme extends BaseTheme,
  B = Theme['breakpoints'],
  R = {[Key in keyof B]: Record<Key, Value>}
> = Partial<
  {
    [K in keyof B]: Value;
  }
> &
  R[keyof R];

export type ResponsiveValue<Value, Theme extends BaseTheme> =
  | Value
  | AtLeastOneResponsiveValue<Value, Theme>;

export type SafeVariants<T> = Omit<T, keyof KnownBaseTheme>;

export interface KnownBaseTheme {
  colors: {
    [key: string]: string;
  };
  spacing: {
    [key: string]: number | string;
  };
  breakpoints: {
    [key: string]: Breakpoint;
  };
  zIndices?: {
    [key: string]: number;
  };
  borderRadii?: {
    [key: string]: number;
  };
}

export interface BaseTheme extends KnownBaseTheme {
  [key: string]: any;
}

export type Breakpoint = number | Dimensions;

export interface Dimensions {
  width: number;
  height: number;
}

export interface RestyleFunctionContainer<
  TProps extends Record<string, unknown>,
  Theme extends BaseTheme = BaseTheme,
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = keyof Theme | undefined
> {
  property: P;
  themeKey: K | undefined;
  variant: boolean;
  func: RestyleFunction<TProps, Theme>;
}

export type RestyleFunction<
  TProps extends Record<string, any> = Record<string, any>,
  Theme extends BaseTheme = BaseTheme,
  S extends keyof any = string
> = (
  props: TProps,
  context: {theme: Theme; dimensions: Dimensions},
) => {
  [key in S]?: any;
};

export type RNStyle = ViewStyle | TextStyle | ImageStyle;

export type RNStyleProperty =
  | keyof ViewStyle
  | keyof TextStyle
  | keyof ImageStyle;

export type PropValue = string | number | undefined | null;
