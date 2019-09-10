# `@shopify/style-system`

The `@shopify/style-system` library provides a system for building constraint-based UI components. You might want to see it as a library for building component libraries.

This library is heavily inspired by [https://styled-system.com](https://styled-system.com/), but adapted for React Native and with added TypeScript prop types. It's also more restrictive to better match our taste, with the notable differences being:

- Any prop that accepts values from the theme will _only_ allow theme-defined values. Any one-off values that are not in the theme will instead have to be overriden through a `style` prop.
- Responsive values are defined with named breakpoints, e.g. `height={{phone: 40, tablet: 60}}`, instead of arrays.
- All property names are verbose, e.g. `marginTop` instead of `mt`.

This library assumes that the design is built upon a well defined design system that at the very least defines a set of colors and spacing constants that lays as a foundation for the whole app design. While the library acknowledges that there can be exceptions to the system by allowing any style to be overridden, it keeps the developer most productive when one-off values are kept to a minimum.

Here's an example of how a view built with style-system components could look:

```tsx
const WelcomeView = () => {
  return (
    <Box paddingVertical="m" paddingHorizontal="s">
      <Text variant="header">Welcome</Text>
      <Box
        flexDirection={{
          phone: 'column',
          tablet: 'row',
        }}
      >
        <Box margin="s" backgroundColor="greenPrimary" borderRadius={3}>
          <GetStartedView />
        </Box>
        <Box margin="s" backgroundColor="purplePrimary" borderRadius={3}>
          <NextStepsView />
        </Box>
      </Box>
    </Box>
  );
};
```

## Installation

```bash
$ yarn add @shopify/style-system
```

## Usage

### Defining Your Theme

Any project using this library should have a global theme object. It specifies set values for spacing, colors, breakpoints, and more. These values are made available to any style-system component, so that you can for example write `backgroundColor="purpleDark"` to use the named color from your theme.

The theme object could look something like this:

```ts
const theme = {
  // We recommend the t-shirt size convention for naming spacing constants.
  spacing: {
    xs: 8,
    s: 16,
    m: 24,
    l: 32,
    xl: 40,
  },
  // Be vary of having too many colors defined here. Consult your design team
  // to make sure this doesn't go overboard. Colors will likely follow a convention
  // of a primary color with a number of lighter / darker shades.
  colors: {
    purpleLighter: '#BDADFB',
    purpleLight: '#8C6FF7',
    purplePrimary: '#5A31F4',
    purpleDark: '#3F22AB',
    purpleDarker: '#241462',

    greenLighter: '#9FEBD8',
    greenLight: '#56DCBA',
    greenPrimary: '#0ECD9D',
    greenDark: '#0A906E',
    greenDarker: '#06523F',

    black: '#0B0B0B',
    white: '#F0F2F3',
  },
  // Breakpoints defined by minimum width (inclusive).
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

// This type will be used to add prop validation to components
export type Theme = typeof theme;

export default theme;
```

This theme should be passed to a `ThemeProvider` at the top of your React tree:

```tsx
import {ThemeProvider} from '@shopify/style-system';
import theme from './theme';

const App = () => (
  <ThemeProvider theme={theme}>{/* Rest of the app */}</ThemeProvider>
);
```

Having your theme defined in the context makes it easy to swap it out with variants of it, for example if you have a dark mode in your app.

#### Accessing the Theme

If you need to manually access the theme outside of a component created with style-system, use the `useTheme` hook:

```tsx
const Component = () => {
  const theme = useTheme();
  const {purplePrimary} = theme.colors;
  // ...
};
```

### Predefined Components

This library comes with predefined functions to create a `Box` and `Text` component, as seen in action in the introductory example. These come as functions instead of ready-made components to give you a chance to provide the type of your theme object. Doing this will make all props that map to theme values have proper types configured, based on what's available in your theme.

#### Box

```tsx
// In Box.tsx
import {createBox} from '@shopify/style-system';
import {Theme} from './theme';

const Box = createBox<Theme>();

export default Box;
```

The Box component comes with the following [style functions](#predefined-style-functions): `backgroundColor`, `opacity`, `visible`, `layout`, `spacing`, `border`, `position`.

#### Text

```tsx
// In Text.tsx
import {createText} from '@shopify/style-system';
import {Theme} from './theme';

const Text = createText<Theme>();

export default Text;
```

The Text component comes with the following [style functions](#predefined-style-functions): `color`, `opacity`, `visible`, `typography`, `spacing`. It also includes a [variant](#Variants) that picks up styles under the `textVariants` key in your theme:

```tsx
// In your theme
const theme = {
  ...,
  textVariants: {
    header: {
      fontFamily: 'ShopifySans-Bold',
      fontWeight: 'bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'black',
    },
    subheader: {
      fontFamily: 'ShopifySans-SemiBold',
      fontWeight: '600',
      fontSize: 28,
      lineHeight: 36,
      color: 'black',
    },
    body: {
      fontFamily: 'ShopifySans',
      fontSize: 16,
      lineHeight: 24,
      color: 'black',
    },
  },
}

// In a component
<Text variant="header">Header</Text>
```

#### Wrapping Components

If you want to use the styling properties of `Box` or `Text` with a different underlying component than the default `View` and `Text` React Native primitives, there are two approaches available to you.

For one-off overrides, use the `component` prop:

```tsx
<Box
  component={Image}
  width={100}
  height={100}
  borderRadius={3}
  source={{uri: '...'}}
/>
```

If you instead want to create a reusable component that always renders with the given underlying component, pass the component as the first argument to your `createBox` or `createText` call:

```ts
const BoxImage = createBox<Theme>(Image);
```

### Custom Components

If you want to create your own component similar to `Box` or `Text`, but decide yourself which [style-functions](#style-functions) to use, use the `createStyleSystemComponent` helper:

```ts
import {
  createStyleSystemComponent,
  createVariant,
  spacing,
  SpacingProps,
  VariantProps
} from '@shopify/style-system';
import {Theme} from './theme'

type Props = SpacingProps<Theme> & VariantProps<Theme, 'cardVariants'>
const Card = createStyleSystemComponent<Props>([
  spacing,
  createVariant({themeKey: 'cardVariants')})
])

export default Card
```

For more advanced components, you may want to instead use the `useStyleSystem` hook:

```tsx
import {TouchableOpacity, View} from 'react-native';
import {
  useStyleSystem,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
} from '@shopify/style-system';

import Text from './Text';
import {Theme} from './theme';

const styleFunctions = [spacing, border, backgroundColor];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
  };

const Button = ({onPress, label, ...rest}: Props) => {
  const props = useStyleSystem(styleFunctions, rest);

  return (
    <TouchableOpacity onPress={onPress}>
      <View {...props}>
        <Text variant="buttonLabel">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
```

### Style Functions

Style functions are the bread and butter of style-system. They specify how props should be mapped to values in a resulting style object, that can then be passed down to a React Native component. The props support [responsive values](#responsive-values) and can be mapped to values in your theme.

#### Predefined Style Functions

The style-system library comes with a number of predefined style functions for your convenience.

| Style Function  | Props                                                                                                                                                                                               | Theme Key   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| backgroundColor | backgroundColor                                                                                                                                                                                     | colors      |
| color           | color                                                                                                                                                                                               | colors      |
| opacity         | opacity                                                                                                                                                                                             | _none_      |
| visible         | display (maps `true` / `false` to `flex` / `none`)                                                                                                                                                  | _none_      |
| spacing         | margin, marginTop, marginRight, marginBottom, marginLeft, marginHorizontal, marginVertical, padding, paddingTop, paddingRight, paddingBottom, paddingLeft, paddingHorizontal, paddingVertical       | spacing     |
| layout          | width, height, minWidth, maxWidth, minHeight, maxHeight, overflow, aspectRatio, alignContent, alignItems, alignSelf, justifyContent, flex, flexBasis, flexDirection, flexGrow, flexShrink, flexWrap | _none_      |
| position        | position, top, right, bottom, left                                                                                                                                                                  | _none_      |
| position        | zIndex                                                                                                                                                                                              | zIndices    |
| border          | borderBottomWidth, borderLeftWidth, borderRightWidth, borderStyle, borderTopWidth, borderWidth                                                                                                      | _none_      |
| border          | borderColor, borderTopColor, borderRightColor, borderLeftColor, borderBottomColor                                                                                                                   | colors      |
| border          | borderRadius, borderBottomLeftRadius, borderBottomRightRadius, borderTopLeftRadius, borderTopRightRadius                                                                                            | borderRadii |
| shadow          | shadowColor, shadowOpacity, shadowOffset, shadowRadius, elevation                                                                                                                                   | _none_      |
| textShadow      | textShadowColor, textShadowOffset, textShadowRadius                                                                                                                                                 | _none_      |
| typography      | fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textDecorationLine, textDecorationStyle, textTransform                                                           | _none_      |

#### Custom Style Functions

To define your own style function, use the `createStyleFunction` helper:

```ts
import {createStyleFunction, createStyleSystemComponent} from '@shopify/style-system'
const transparency = createStyleFunction({
  property: 'transparency',
  styleProperty: 'opacity',
  transform: ({value}: {value: number}) => 1 - value,
});

const TransparentComponent = createStyleSystemComponent([transparency])

<TransparentComponent transparency={0.5} />
```

Arguments:

- `property`: The name of the component prop that the function will receive tha value of.
- `styleProperty`: The name of the property in the style object to map to. Defaults to the value of `property`.
- `transform({value, theme, themeKey})`: An optional function that transforms the value of the prop to the value that will be inserted into the style object.
- `themeKey`: An optional key in the theme to map values from, e.g. `colors`.

#### Variants

A variant is a form of style function that maps a prop into multiple other props to use with style functions. A variant needs to always map to a key in the theme.

```ts
// In theme
const theme = {
  // ...
  spacing: {
    s: 8,
    m: 16,
    l: 24,
  },
  colors: {
    cardWhite: '#EEEEEE',
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  cardVariants: {
    regular: {
      // We can refer to other values in the theme here, and use responsive props
      padding: {
        phone: 's',
        tablet: 'm',
      },
      backgroundColor: 'cardWhite',
    }
    elevated: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      backgroundColor: 'cardWhite',
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 15,
      elevation: 5,
    }
  }
}

import {createVariant, createStyleSystemComponent} from '@shopify/style-system'
const variant = createVariant({themeKey: 'cardVariants'})

const Card = createStyleSystemComponent([variant])

<Card variant="elevated" />
```

Arguments:

- `property`: The name of the component prop that will map to a variant. Defaults to `variant`.
- `themeKey`: A key in the theme to map values from. Unlike `createStyleFunction`, this option _is required_ to create a variant.

### Responsive Values

Any prop powered by style-system can optionally accept a value for each screen size, as defined by the `breakpoints` object in the theme:

```tsx
// In your theme
const theme = {
  // ...
  breakpoints: {
    phone: 0,
    tablet: 768,
  }
}

// Props always accept either plain values
<Box flexDirection="row" />

// Or breakpoint-specific values
<Box flexDirection={{phone: 'column', tablet: 'row'}} />
```

### Overriding Styles

Any style-system component also accepts a regular `style` property and will apply it after all other styles, which means that you can use this to do any overrides that you might find necessary.
