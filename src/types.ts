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

export interface StyleFunctionContainer {
  property: string;
  themeKey?: string;
  variant: boolean;
  func: StyleFunction;
}

export type StyleFunction = (
  props: {[key: string]: any},
  context: {theme: BaseTheme; dimensions: Dimensions},
) => {[key: string]: any};

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
