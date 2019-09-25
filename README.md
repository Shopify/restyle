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
        <Card margin="s" variant="primary">
          <GetStartedView />
        </Box>
        <Card margin="s" variant="secondary">
          <NextStepsView />
        </Card>
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

Any project using this library should have a global theme object. It specifies set values for spacing, colors, breakpoints, and more. These values are made available to style-system components that include the corresponding [style function](#style-functions), so that you can for example write `backgroundColor="cardPrimary"` to use the named color from your theme.

Below is an example of how a basic theme could look. Make sure to read the sections below for more details on how to set up your different theme values.

```ts
const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = {
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
};

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

#### Colors

When working with colors in a design system a common pattern is to have a palette including a number of base colors with darker and lighter shades, see for example the [Polaris Color Palette](https://polaris.shopify.com/design/colors#color-palette).

This palette should preferrably not be directly included as values in the theme. The naming of colors in the theme object should instead be used to assign semantic meaning to the palette, see this example:

```ts
const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',
};

const theme = {
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.purplePrimary,
    buttonPrimaryBackground: palette.purplePrimary,
  },
};
```

Taking the time to define these semantic meanings comes with a number of benefits:

- It's easy to understand where and in what context colors are applied throughout the app
- If changes are made to the palette (e.g. the purple colors are changed to a shade of blue instead), we only have to update what the semantic names point to instead of updating all references to `purplePrimary` throughout the app.
- Even though `cardPrimaryBackground` and `buttonPrimaryBackground` point to the same color in the example above, deciding that buttons should instead be green (while cards remain purple) becomes a trivial change.
- A theme can easily be [swapped at runtime](#implementing-dark-mode).

#### Spacing

Spacing tends to follow multiples of a given base spacing number, for example `8`. We prefer using the t-shirt size naming convention, because of the scalability of it (any number of `x`'s can be prepended for smaller and larger sizes):

```ts
const theme = {
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
};
```

#### Breakpoints

Breakpoints are defined as minimum widths (inclusive) for different target screen sizes where we want to apply differing styles. Consider giving your breakpoints names that give a general idea of the type of device the user is using:

```ts
const theme = {
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
};
```

See the [Responsive Values](#responsive-values) section to see how these can be used.

### Accessing the Theme

If you need to manually access the theme outside of a component created with style-system, use the `useTheme` hook:

```tsx
const Component = () => {
  const theme = useTheme<Theme>();
  const {cardPrimaryBackground} = theme.colors;
  // ...
};
```

By doing this instead of directly importing the theme object, it becomes easy to swap the theme out during runtime to for example implement a [dark mode switch](#implementing-dark-mode) in your app.

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

The Box component comes with the following [style functions](#predefined-style-functions): `backgroundColor`, `opacity`, `visible`, `layout`, `spacing`, `border`, `shadow`, `position`.

#### Text

```tsx
// In Text.tsx
import {createText} from '@shopify/style-system';
import {Theme} from './theme';

const Text = createText<Theme>();

export default Text;
```

The Text component comes with the following [style functions](#predefined-style-functions): `color`, `opacity`, `visible`, `typography`, `textShadow`, `spacing`. It also includes a [variant](#Variants) that picks up styles under the `textVariants` key in your theme:

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
| shadow          | shadowOpacity, shadowOffset, shadowRadius, elevation                                                                                                                                                | _none_      |
| shadow          | shadowColor                                                                                                                                                                                         | colors      |
| textShadow      | textShadowOffset, textShadowRadius                                                                                                                                                                  | _none_      |
| textShadow      | textShadowColor                                                                                                                                                                                     | colors      |
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
    cardRegularBackground: '#EEEEEE',
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
    }
    elevated: {
      padding: {
        phone: 's',
        tablet: 'm',
      },
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {width: 0, height: 5},
      shadowRadius: 15,
      elevation: 5,
    }
  }
}

import {createVariant, createStyleSystemComponent, VariantProps} from '@shopify/style-system'
const variant = createVariant<Theme>({themeKey: 'cardVariants', defaults: {
  margin: {
    phone: 's',
    tablet: 'm',
  }
  backgroundColor: 'cardRegularBackground',
}})

const Card = createStyleSystemComponent<VariantProps<Theme, 'cardVariants'>>([variant])

<Card variant="elevated" />
```

Arguments:

- `property`: The name of the component prop that will map to a variant. Defaults to `variant`.
- `themeKey`: A key in the theme to map values from. Unlike `createStyleFunction`, this option _is required_ to create a variant.
- `defaults`: The default values to apply before applying anything from the values in the theme.

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

```tsx
<Box
  margin="s"
  padding="m"
  style={{
    backgroundColor: '#F00BAA',
  }}
/>
```

### Implementing Dark Mode

Of course, no app is complete without a dark mode. Here a simple example of how you would implement it:

```tsx
import React, {useState} from 'react';
import {Switch} from 'react-native';
import {ThemeProvider, createBox, createText} from '@shopify/style-system';

export const palette = {
  purple: '#5A31F4',
  white: '#FFF',
  black: '#111',
  darkGray: '#333',
  lightGray: '#EEE',
};

const theme = {
  spacing: {
    s: 8,
    m: 16,
  },
  colors: {
    mainBackground: palette.lightGray,
    mainForeground: palette.black,

    primaryCardBackground: palette.purple,
    secondaryCardBackground: palette.white,
    primaryCardText: palette.white,
    secondaryCardText: palette.black,
  },
  breakpoints: {},
  textVariants: {
    body: {
      fontSize: 16,
      lineHeight: 24,
      color: 'mainForeground',
    },
  },
  cardVariants: {
    primary: {
      backgroundColor: 'primaryCardBackground',
      shadowOpacity: 0.3,
    },
    secondary: {
      backgroundColor: 'secondaryCardBackground',
      shadowOpacity: 0.1,
    },
  },
};

type Theme = typeof theme;

const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    mainForeground: palette.white,

    secondaryCardBackground: palette.darkGray,
    secondaryCardText: palette.white,
  },
};

const Box = createBox<Theme>();
const Text = createText<Theme>();

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <Box padding="m" backgroundColor="mainBackground" flex={1}>
        <Box
          backgroundColor="primaryCardBackground"
          margin="s"
          padding="m"
          flexGrow={1}
        >
          <Text variant="body" color="primaryCardText">
            Primary Card
          </Text>
        </Box>
        <Box
          backgroundColor="secondaryCardBackground"
          margin="s"
          padding="m"
          flexGrow={1}
        >
          <Text variant="body" color="secondaryCardText">
            Secondary Card
          </Text>
        </Box>
        <Box
          component={Switch}
          marginTop="m"
          value={darkMode}
          onValueChange={(value: boolean) => setDarkMode(value)}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;
```
