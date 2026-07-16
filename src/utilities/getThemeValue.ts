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
    if (value && theme[themeKey][value as string] === undefined) {
      if (isRawStyleValue(value)) return value;

      throw new Error(
        `Value '${value}' does not exist in theme['${String(themeKey)}']`,
      );
    }

    return value ? theme[themeKey][value as string] : value;
  }

  return value;
}

const rawColorValueRegex =
  /^(#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(rgb|rgba|hsl|hsla|hwb)\(.*\))$/i;

/**
 * Whether a value that is not a key in the theme scale is a valid raw style
 * value: a numeric literal (e.g. `borderRadius={13}`) or a raw color string
 * (e.g. `backgroundColor="rgba(255, 209, 102, 1)"`). Such values are passed
 * through as-is instead of throwing, so that libraries setting resolved style
 * values as top-level props keep working (e.g. react-native-reanimated 4.4+
 * re-renders settled animations with raw values), while unresolvable string
 * keys (likely typos) still throw.
 */
function isRawStyleValue(value: PropValue): boolean {
  return (
    typeof value === 'number' ||
    (typeof value === 'string' && rawColorValueRegex.test(value))
  );
}

function isThemeKey<Theme extends BaseTheme>(
  theme: Theme,
  K: keyof Theme | undefined,
): K is keyof Theme {
  return theme[K as keyof Theme];
}
