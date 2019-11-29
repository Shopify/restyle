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

export interface RestyleFunctionContainer {
  property: string;
  themeKey?: string;
  variant: boolean;
  func: RestyleFunction;
}

export type RestyleFunction = (
  props: {[key: string]: any},
  context: {theme: BaseTheme; dimensions: Dimensions},
) => {[key: string]: any};
