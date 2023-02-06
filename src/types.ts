import {ImageStyle, TextStyle, ViewStyle, StyleProp} from 'react-native';

export type AtLeastOneResponsiveValue<
  Value,
  B extends BaseTheme['breakpoints'],
  R = {[Key in keyof B]: {[key in Key]: Value}},
> = Partial<{
  [K in keyof B]: Value;
}> &
  R[keyof R];

export type ResponsiveValue<Value, B extends BaseTheme['breakpoints']> =
  | Value
  | AtLeastOneResponsiveValue<Value, B>;

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
  TProps extends {[key: string]: any},
  Theme extends BaseTheme = BaseTheme,
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = keyof Theme | undefined,
> {
  property: P;
  themeKey: K | undefined;
  variant: boolean;
  func: RestyleFunction<TProps, Theme>;
}

export type RestyleFunction<
  TProps extends {[key: string]: any} = {[key: string]: any},
  Theme extends BaseTheme = BaseTheme,
  S extends keyof any = string,
> = (
  props: TProps,
  type: 1 | 2,
  context: {theme: Theme; dimensions: Dimensions | null},
) => {
  [key in S]?: any;
};

export type RNStyle =
  | ViewStyle
  | TextStyle
  | ImageStyle
  | ((...args: any[]) => StyleProp<ViewStyle>);

export type RNStyleProperty =
  | keyof ViewStyle
  | keyof TextStyle
  | keyof ImageStyle;

export type PropValue = string | number | undefined | null;
