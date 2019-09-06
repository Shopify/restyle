import {
  BaseTheme,
  Dimensions,
  StyleFunctionContainer,
  ResponsiveValue,
} from './types';
import createStyleFunction from './createStyleFunction';
import {all} from './styleFunctions';
import composeStyleFunctions from './composeStyleFunctions';

const allStyleFunctions = composeStyleFunctions(all);

const createVariant = ({
  property = 'variant',
  themeKey,
}: {
  property?: string;
  themeKey: string;
}): StyleFunctionContainer => {
  const styleFunction = createStyleFunction({
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
      return allStyleFunctions.buildStyle({
        props: expandedProps,
        theme,
        dimensions,
      });
    },
  };
};

export type VariantProps<
  Theme extends BaseTheme,
  ThemeKey extends keyof Theme,
  Property extends string = 'variant'
> = {[key in Property]?: ResponsiveValue<keyof Theme[ThemeKey], Theme>};

export default createVariant;
