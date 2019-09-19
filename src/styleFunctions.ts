import {TextStyle, FlexStyle, ViewStyle} from 'react-native';
import createStyleFunction from './createStyleFunction';
import {BaseTheme, ResponsiveValue} from './types';

const spacingProperties = {
  margin: true,
  marginTop: true,
  marginRight: true,
  marginBottom: true,
  marginLeft: true,
  marginHorizontal: true,
  marginVertical: true,
  padding: true,
  paddingTop: true,
  paddingRight: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingHorizontal: true,
  paddingVertical: true,
};

const typographyProperties = {
  fontFamily: true,
  fontSize: true,
  fontStyle: true,
  fontWeight: true,
  letterSpacing: true,
  lineHeight: true,
  textAlign: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  textTransform: true,
};

const layoutProperties = {
  width: true,
  height: true,
  minWidth: true,
  maxWidth: true,
  minHeight: true,
  maxHeight: true,
  overflow: true,
  aspectRatio: true,
  alignContent: true,
  alignItems: true,
  alignSelf: true,
  justifyContent: true,
  flex: true,
  flexBasis: true,
  flexDirection: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,
};

const positionProperties = {
  position: true,
  top: true,
  right: true,
  bottom: true,
  left: true,
};

const borderProperties = {
  borderBottomWidth: true,
  borderLeftWidth: true,
  borderRightWidth: true,
  borderStyle: true,
  borderTopWidth: true,
  borderWidth: true,
};

const borderRadiusProperties = {
  borderRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
};

const borderColorProperties = {
  borderColor: true,
  borderTopColor: true,
  borderRightColor: true,
  borderLeftColor: true,
  borderBottomColor: true,
};

const shadowProperties = {
  shadowOpacity: true,
  shadowOffset: true,
  shadowRadius: true,
  elevation: true,
};

const textShadowProperties = {
  textShadowOffset: true,
  textShadowRadius: true,
};

export const backgroundColor = createStyleFunction({
  property: 'backgroundColor',
  themeKey: 'colors',
});

export const color = createStyleFunction({
  property: 'color',
  themeKey: 'colors',
});

export const opacity = createStyleFunction({
  property: 'opacity',
});

export const visible = createStyleFunction({
  property: 'visible',
  styleProperty: 'display',
  transform: ({value}) => (value === false ? 'none' : 'flex'),
});

export const spacing = Object.keys(spacingProperties).map(property => {
  return createStyleFunction({
    property,
    themeKey: 'spacing',
  });
});

export const typography = Object.keys(typographyProperties).map(property => {
  return createStyleFunction({
    property,
  });
});

export const layout = Object.keys(layoutProperties).map(property => {
  return createStyleFunction({
    property,
  });
});

export const position = [
  ...Object.keys(positionProperties).map(property => {
    return createStyleFunction({
      property,
    });
  }),
  createStyleFunction({
    property: 'zIndex',
    themeKey: 'zIndices',
  }),
];

export const border = [
  ...Object.keys(borderProperties).map(property => {
    return createStyleFunction({
      property,
    });
  }),
  ...Object.keys(borderColorProperties).map(property => {
    return createStyleFunction({
      property,
      themeKey: 'colors',
    });
  }),
  ...Object.keys(borderRadiusProperties).map(property => {
    return createStyleFunction({
      property,
      themeKey: 'borderRadii',
    });
  }),
];

export const shadow = [
  ...Object.keys(shadowProperties).map(property => {
    return createStyleFunction({
      property,
    });
  }),
  createStyleFunction({
    property: 'shadowColor',
    themeKey: 'colors',
  }),
];

export const textShadow = [
  ...Object.keys(textShadowProperties).map(property => {
    return createStyleFunction({
      property,
    });
  }),
  createStyleFunction({
    property: 'textShadowColor',
    themeKey: 'colors',
  }),
];

export const all = [
  backgroundColor,
  color,
  opacity,
  ...spacing,
  ...typography,
  ...layout,
  ...position,
  ...border,
  ...shadow,
  ...textShadow,
];

export type BackgroundColorProps<Theme extends BaseTheme> = {
  backgroundColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
};
export type ColorProps<Theme extends BaseTheme> = {
  color?: ResponsiveValue<keyof Theme['colors'], Theme>;
};
export type OpacityProps<Theme extends BaseTheme> = {
  opacity?: ResponsiveValue<number, Theme>;
};

export type VisibleProps<Theme extends BaseTheme> = {
  visible?: ResponsiveValue<boolean, Theme>;
};

export type SpacingProps<Theme extends BaseTheme> = {
  [Key in keyof typeof spacingProperties]?: ResponsiveValue<
    keyof Theme['spacing'],
    Theme
  >;
};

export type TypographyProps<Theme extends BaseTheme> = {
  [Key in keyof typeof typographyProperties]?: ResponsiveValue<
    TextStyle[Key],
    Theme
  >;
};

export type LayoutProps<Theme extends BaseTheme> = {
  [Key in keyof typeof layoutProperties]?: ResponsiveValue<
    FlexStyle[Key],
    Theme
  >;
};

export type PositionProps<Theme extends BaseTheme> = {
  [Key in keyof typeof positionProperties]?: ResponsiveValue<
    FlexStyle[Key],
    Theme
  >;
} & {
  zIndex?: ResponsiveValue<
    Theme['zIndices'] extends {} ? keyof Theme['zIndices'] : number,
    Theme
  >;
};

export type BorderProps<Theme extends BaseTheme> = {
  [Key in keyof typeof borderProperties]?: ResponsiveValue<
    ViewStyle[Key],
    Theme
  >;
} &
  {
    [Key in keyof typeof borderColorProperties]?: ResponsiveValue<
      keyof Theme['colors'],
      Theme
    >;
  } &
  {
    [Key in keyof typeof borderRadiusProperties]?: ResponsiveValue<
      Theme['borderRadii'] extends {} ? keyof Theme['borderRadii'] : number,
      Theme
    >;
  };

export type ShadowProps<Theme extends BaseTheme> = {
  [Key in keyof typeof shadowProperties]?: ResponsiveValue<
    ViewStyle[Key],
    Theme
  >;
} & {
  shadowColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
};

export type TextShadowProps<Theme extends BaseTheme> = {
  [Key in keyof typeof textShadowProperties]?: ResponsiveValue<
    TextStyle[Key],
    Theme
  >;
} & {
  textShadowColor?: ResponsiveValue<keyof Theme['colors'], Theme>;
};

export type AllProps<Theme extends BaseTheme> = BackgroundColorProps<Theme> &
  ColorProps<Theme> &
  OpacityProps<Theme> &
  SpacingProps<Theme> &
  TypographyProps<Theme> &
  LayoutProps<Theme> &
  PositionProps<Theme> &
  BorderProps<Theme> &
  ShadowProps<Theme> &
  TextShadowProps<Theme>;
