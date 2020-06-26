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
  TProps = Record<string, unknown>,
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
  TProps = Record<string, any>,
  Theme extends BaseTheme = BaseTheme
> = (
  props: TProps,
  context: {theme: Theme; dimensions: Dimensions},
) => Record<string, any>;

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
