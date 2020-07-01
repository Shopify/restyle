import {BaseTheme, RestyleFunctionContainer, ResponsiveValue} from './types';
import createRestyleFunction from './createRestyleFunction';
import {all, AllProps} from './restyleFunctions';
import composeRestyleFunctions from './composeRestyleFunctions';

const allRestyleFunctions = composeRestyleFunctions(all);

const createVariant = <
  Theme extends BaseTheme,
  TProps extends VariantProps<Theme, K, P> = VariantProps<Theme, keyof Theme>,
  K extends keyof Theme = keyof Theme,
  P extends keyof TProps = keyof TProps
>({
  property: prop,
  themeKey,
  defaults = {},
}: {
  property?: P;
  themeKey: K;
  defaults?: AllProps<Theme>;
}): RestyleFunctionContainer<TProps, Theme, P, K> => {
  const property = prop || ('variant' as P);
  const styleFunction = createRestyleFunction<Theme, TProps>({
    property,
    styleProperty: 'expandedProps',
    themeKey,
  });
  return {
    property,
    themeKey,
    variant: true,
    func: (props, {theme, dimensions}) => {
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
  K extends keyof Theme,
  Property extends keyof any = 'variant'
> = {[key in Property]?: ResponsiveValue<keyof Theme[K], Theme>};

export default createVariant;
