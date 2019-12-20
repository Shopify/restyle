import {
  BaseTheme,
  Dimensions,
  RestyleFunctionContainer,
  ResponsiveValue,
} from './types';
import createRestyleFunction from './createRestyleFunction';
import {all, AllProps} from './restyleFunctions';
import composeRestyleFunctions from './composeRestyleFunctions';

const allRestyleFunctions = composeRestyleFunctions(all);

const createVariant = <Theme extends BaseTheme = BaseTheme>({
  property = 'variant',
  themeKey,
  defaults = {},
}: {
  property?: string;
  themeKey: string;
  defaults?: AllProps<Theme>;
}): RestyleFunctionContainer => {
  const styleFunction = createRestyleFunction({
    property,
    styleProperty: 'expandedProps',
    themeKey,
  });
  return {
    property,
    themeKey,
    variant: true,
    func: (
      props: any,
      {theme, dimensions}: {theme: BaseTheme; dimensions: Dimensions},
    ) => {
      const {expandedProps} = styleFunction.func(props, {theme, dimensions});
      if (!expandedProps) return {};
      return allRestyleFunctions.buildStyle(
        {...defaults, ...expandedProps},
        {
          theme,
          dimensions,
        },
      );
    },
  };
};

export type VariantProps<
  Theme extends BaseTheme,
  ThemeKey extends keyof Theme,
  Property extends string = 'variant'
> = {[key in Property]?: ResponsiveValue<keyof Theme[ThemeKey], Theme>};

export default createVariant;
