import {BaseTheme, PropValue, StyleTransformFunction} from '../types';

/**
 * Returns value from a theme for a given `themeKey`, applying `transform` if defined.
 */
export function getThemeValue<
  TVal extends PropValue,
  Theme extends BaseTheme,
  K extends keyof Theme | undefined,
>(
  value: TVal | undefined,
  {
    theme,
    transform,
    themeKey,
  }: {
    theme: Theme;
    transform?: StyleTransformFunction<Theme, K, TVal>;
    themeKey?: K;
  },
) {
  if (transform) return transform({value, theme, themeKey});
  if (isThemeKey(theme, themeKey)) {
    if (value && theme[themeKey][value as string] === undefined)
      throw new Error(
        `Value '${value}' does not exist in theme['${String(themeKey)}']`,
      );

    return value ? theme[themeKey][value as string] : value;
  }

  return value;
}

function isThemeKey<Theme extends BaseTheme>(
  theme: Theme,
  K: keyof Theme | undefined,
): K is keyof Theme {
  return theme[K as keyof Theme];
}
