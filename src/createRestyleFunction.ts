import {getThemeValue} from './utilities';
import {
  BaseTheme,
  Dimensions,
  ResponsiveBaseTheme,
  RestyleFunction,
  RNStyleProperty,
  StyleTransformFunction,
} from './types';
import {getResponsiveValue} from './utilities/getResponsiveValue';

const getMemoizedMapHashKey = (
  dimensions: Dimensions | null,
  themeKey: string,
  property: string,
  value: string | number | boolean,
) => {
  return `${dimensions?.height}x${dimensions?.width}-${themeKey}-${property}-${value}`;
};

const memoizedThemes: WeakMap<BaseTheme, any> = new WeakMap();

const createRestyleFunction = <
  Theme extends BaseTheme = BaseTheme,
  TProps extends {[key: string]: any} = {[key: string]: any},
  P extends keyof TProps = keyof TProps,
  K extends keyof Theme | undefined = undefined,
  S extends RNStyleProperty = RNStyleProperty,
>({
  property,
  transform,
  styleProperty,
  themeKey,
}: {
  property: P;
  transform?: StyleTransformFunction<Theme, K, TProps[P]>;
  styleProperty?: S;
  themeKey?: K;
}) => {
  const styleProp = styleProperty || property.toString();

  const func: RestyleFunction<TProps, Theme, S | P> = (
    props,
    {theme, dimensions},
  ) => {
    if (memoizedThemes.get(theme) == null) {
      memoizedThemes.set(theme, {});
    }

    const memoizedMapHashKey = (() => {
      if (
        themeKey &&
        property &&
        props[property] &&
        typeof themeKey === 'string' &&
        typeof property === 'string'
      ) {
        /*
        The following code is required to ensure all variants that have different breakpoint objects are turned into unique strings. By simply retuning String(props[property]), two different variants with breakpoints will return the same string.
        For example, if we have the following variant:
          spacingVariant: {
            defaults: {},
            noPadding: {
              phone: 'none',
              tablet: 'none',
            },
            mediumPadding: {
              phone: 'm',
              tablet: 'm',
            }
          }
        using String(props[property]) will turn both variants into [object Object], making them equivalent and resulting in separate styles being memoized into the same hash key.
        By building the propertyValue string ourselves from the breakpoints, we can format the variants to be "phone:nonetablet:none" and "phone:mtablet:m" respectively, making each memoized hash key unique.
        */
        let propertyValue = '';
        if (typeof props[property] === 'object') {
          for (const [breakpoint, value] of Object.entries(props[property])) {
            propertyValue += `${breakpoint}:${value}`;
          }
        } else {
          propertyValue = String(props[property]);
        }

        return getMemoizedMapHashKey(
          dimensions,
          String(themeKey),
          String(property),
          propertyValue,
        );
      } else {
        return null;
      }
    })();

    if (memoizedMapHashKey != null) {
      const memoizedValue = memoizedThemes.get(theme)[memoizedMapHashKey];
      if (memoizedValue != null) {
        return memoizedValue;
      }
    }

    const value = (() => {
      if (isResponsiveTheme(theme) && dimensions) {
        return getResponsiveValue(props[property], {
          theme,
          dimensions,
          themeKey,
          transform,
        });
      } else {
        return getThemeValue(props[property], {theme, themeKey, transform});
      }
    })();
    if (value === undefined) return {};

    if (memoizedMapHashKey != null) {
      memoizedThemes.get(theme)[memoizedMapHashKey] = {
        [styleProp]: value,
      };
      return memoizedThemes.get(theme)[memoizedMapHashKey];
    }
    return {
      [styleProp]: value,
    } as {[key in S | P]?: typeof value};
  };

  return {
    property,
    themeKey,
    variant: false,
    func,
  };
};

function isResponsiveTheme(
  theme: BaseTheme | ResponsiveBaseTheme,
): theme is ResponsiveBaseTheme {
  if (theme.breakpoints !== undefined) {
    return true;
  }
  return false;
}

export default createRestyleFunction;
