# `@shopify/restyle`

![RestyleTheme 2020-02-25 17_43_51](https://user-images.githubusercontent.com/688415/75268245-91084b80-57f7-11ea-905b-2a9046aa5ca3.gif)

The Restyle library provides a type-enforced system for building UI components in React Native with TypeScript. It's a library for building UI libraries, with themability as the core focus.

This library assumes that the UI is built upon a design system that (at the very least) defines a set of colors and spacing constants that lays as a foundation. While the library acknowledges that there can be exceptions to the system by allowing any style to be overridden, it keeps the developer most productive when one-off values are kept to a minimum.

Here's an example of how a view built with Restyle components could look:

```tsx
import {
  ThemeProvider,
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';

// See the "Defining Your Theme" readme section below
import theme, {Theme} from './theme';

const Box = createBox<Theme>();
const Text = createText<Theme>();

const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box);

const Welcome = () => {
  return (
    <Box
      flex={1}
      backgroundColor="mainBackground"
      paddingVertical="xl"
      paddingHorizontal="m">
      <Text variant="header">Welcome</Text>
      <Box
        flexDirection={{
          phone: 'column',
          tablet: 'row',
        }}
      >
        <Card margin="s" variant="secondary">
          <Text variant="body">This is a simple example</Text>
        </Card>
        <Card margin="s" variant="primary">
          <Text variant="body">Displaying how to use Restyle</Text>
        </Card>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Welcome />
    </ThemeProvider>
  );
};
```

![Restyle Component Workflow](https://user-images.githubusercontent.com/688415/75268259-95346900-57f7-11ea-8f1f-22aec4bb4f39.gif)


## Installation
### Yarn
```bash
$ yarn add @shopify/restyle
```
### NPM
```bash
$ npm install @shopify/restyle
```

## Usage

### Defining Your Theme

Any project using this library should have a global theme object. It specifies set values for spacing, colors, breakpoints, and more. These values are made available to Restyle components, so that you can for example write `backgroundColor="cardPrimary"` to use the named color from your theme. In fact, TypeScript enforces the `backgroundColor` property to _only_ accept colors that have been defined in your theme, and autocompletes values for you in a modern editor.

Below is an example of how a basic theme could look. Make sure to read the sections below for more details on how to set up your different theme values.

```ts
import { createTheme } from '@shopify/restyle'

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


const theme = createTheme({
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
});

export type Theme = typeof theme;
export default theme;
```

*Note: `createTheme` doesn't do anything except enforcing the theme to have the same shape as the BaseTheme, but it preserves the types of your user specific values (e.g. what colors the theme has) so you don't lose typesafety as a result of the `{ [key:string]: any }` in BaseTheme*

This theme should be passed to a `ThemeProvider` at the top of your React tree:

```tsx
import {ThemeProvider} from '@shopify/restyle';
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

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.purplePrimary,
    buttonPrimaryBackground: palette.purplePrimary,
  },
});
```

Taking the time to define these semantic meanings comes with a number of benefits:

- It's easy to understand where and in what context colors are applied throughout the app
- If changes are made to the palette (e.g. the purple colors are changed to a shade of blue instead), we only have to update what the semantic names point to instead of updating all references to `purplePrimary` throughout the app.
- Even though `cardPrimaryBackground` and `buttonPrimaryBackground` point to the same color in the example above, deciding that buttons should instead be green (while cards remain purple) becomes a trivial change.
- A theme can easily be [swapped at runtime](#implementing-dark-mode).

#### Spacing

Spacing tends to follow multiples of a given base spacing number, for example `8`. We prefer using the t-shirt size naming convention, because of the scalability of it (any number of `x`'s can be prepended for smaller and larger sizes):

```ts

const theme = createTheme({
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
});
```

#### Breakpoints

Breakpoints are defined as minimum widths (inclusive) for different target screen sizes where we want to apply differing styles. Consider giving your breakpoints names that give a general idea of the type of device the user is using:

```ts
const theme = createTheme({
  breakpoints: {
    phone: 0,
    tablet: 768,
    largeTablet: 1024,
  },
});
```

See the [Responsive Values](#responsive-values) section to see how these can be used.

### Accessing the Theme

If you need to manually access the theme outside of a component created with Restyle, use the `useTheme` hook:

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
import {createBox} from '@shopify/restyle';
import {Theme} from './theme';

const Box = createBox<Theme>();

export default Box;
```

The Box component comes with the following [Restyle functions](#predefined-restyle-functions): `backgroundColor`, `opacity`, `visible`, `layout`, `spacing`, `border`, `shadow`, `position`.

#### Text

```tsx
// In Text.tsx
import {createText} from '@shopify/restyle';
import {Theme} from './theme';

const Text = createText<Theme>();

export default Text;
```

The Text component comes with the following [Restyle functions](#predefined-restyle-functions): `color`, `opacity`, `visible`, `typography`, `textShadow`, `spacing`. It also includes a [variant](#Variants) that picks up styles under the `textVariants` key in your theme:

```tsx
// In your theme
const theme = createTheme({
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
});

// In a component
<Text variant="header">Header</Text>
```

### Custom Components

If you want to create your own component similar to `Box` or `Text`, but decide
yourself which [Restyle functions](#restyle-functions) to use, use the
`createRestyleComponent` helper:

```ts
import {
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  VariantProps
} from '@shopify/restyle';
import {Theme} from './theme'

type Props = SpacingProps<Theme> & VariantProps<Theme, 'cardVariants'>
const Card = createRestyleComponent<Props>([
  spacing,
  createVariant({themeKey: 'cardVariants'})
])

export default Card
```

For more advanced components, you may want to instead use the `useRestyle` hook:

```tsx
import {TouchableOpacity, View} from 'react-native';
import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
} from '@shopify/restyle';

import Text from './Text';
import {Theme} from './theme';

const restyleFunctions = [spacing, border, backgroundColor];
type Props = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme> & {
    onPress: () => void;
  };

const Button = ({onPress, label, ...rest}: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return (
    <TouchableOpacity onPress={onPress}>
      <View {...props}>
        <Text variant="buttonLabel">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
```

### Restyle Functions

Restyle functions are the bread and butter of Restyle. They specify how props should be mapped to values in a resulting style object, that can then be passed down to a React Native component. The props support [responsive values](#responsive-values) and can be mapped to values in your theme.

#### Predefined Restyle Functions

The Restyle library comes with a number of predefined Restyle functions for your convenience. Properties within brackets are aliases / shorthands for the preceding prop name.

| Restyle Function | Props                                                                                                                                                                                               | Theme Key   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| backgroundColor  | backgroundColor [bg]                                                                                                                                                                                 | colors      |
| color            | color                                                                                                                                                                                               | colors      |
| opacity          | opacity                                                                                                                                                                                             | _none_      |
| visible          | display (maps `true` / `false` to `flex` / `none`)                                                                                                                                                  | _none_      |
| spacing          | margin [m], marginTop [mt], marginRight [mr], marginBottom [mb], marginLeft [ml], marginStart [ms], marginEnd[me], marginHorizontal [mx], marginVertical [my], padding [p], paddingTop [pt], paddingRight [pr], paddingBottom [pb], paddingLeft [pl], paddingStart [ps], paddingEnd [pe], paddingHorizontal [px], paddingVertical [py]       | spacing     |
| layout           | width, height, minWidth, maxWidth, minHeight, maxHeight, overflow, aspectRatio, alignContent, alignItems, alignSelf, justifyContent, flex, flexBasis, flexDirection, flexGrow, flexShrink, flexWrap | _none_      |
| position         | position, top, right, bottom, left, start, end                                                                                                                                                                 | _none_      |
| position         | zIndex                                                                                                                                                                                              | zIndices    |
| border           | borderBottomWidth, borderLeftWidth, borderRightWidth, borderStartWidth, borderEndWidth, borderStyle, borderTopWidth, borderWidth                                                                                                      | _none_      |
| border           | borderColor, borderTopColor, borderRightColor, borderLeftColor, borderStartColor, borderEndColor, borderBottomColor                                                                                                                   | colors      |
| border           | borderRadius, borderBottomLeftRadius, borderBottomRightRadius, borderBottomStartRadius, borderBottomEndRadius, borderTopLeftRadius, borderTopRightRadius, borderTopStartRadius, borderTopEndRadius                                                                                           | borderRadii |
| shadow           | shadowOpacity, shadowOffset, shadowRadius, elevation                                                                                                                                                | _none_      |
| shadow           | shadowColor                                                                                                                                                                                         | colors      |
| textShadow       | textShadowOffset, textShadowRadius                                                                                                                                                                  | _none_      |
| textShadow       | textShadowColor                                                                                                                                                                                     | colors      |
| typography       | fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign, textDecorationLine, textDecorationStyle, textTransform                                                           | _none_      |

#### Custom Restyle Functions

To define your own Restyle function, use the `createRestyleFunction` helper:

```ts
import {createRestyleFunction, createRestyleComponent} from '@shopify/restyle'
const transparency = createRestyleFunction({
  property: 'transparency',
  styleProperty: 'opacity',
  transform: ({value}: {value: number}) => 1 - value,
});

const TransparentComponent = createRestyleComponent([transparency])

<TransparentComponent transparency={0.5} />
```

Arguments:

- `property`: The name of the component prop that the function will receive tha value of.
- `styleProperty`: The name of the property in the style object to map to. Defaults to the value of `property`.
- `transform({value, theme, themeKey})`: An optional function that transforms the value of the prop to the value that will be inserted into the style object.
- `themeKey`: An optional key in the theme to map values from, e.g. `colors`.

#### Variants

A variant is a form of Restyle function that maps a prop into multiple other props to use with Restyle functions. A variant needs to always map to a key in the theme.

```ts
// In theme
const theme = createTheme({
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
    defaults: { 
      // We can define defaults for the variant here.
      // This will be applied after the defaults passed to createVariant and before the variant defined below.
    },
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
})

import {createVariant, createRestyleComponent, VariantProps} from '@shopify/restyle'
const variant = createVariant<Theme>({themeKey: 'cardVariants', defaults: {
  margin: {
    phone: 's',
    tablet: 'm',
  },
  backgroundColor: 'cardRegularBackground',
}})

const Card = createRestyleComponent<VariantProps<Theme, 'cardVariants'>>([variant])

<Card variant="elevated" />
```

Arguments:

- `property`: The name of the component prop that will map to a variant. Defaults to `variant`.
- `themeKey`: A key in the theme to map values from. Unlike `createRestyleFunction`, this option _is required_ to create a variant.
- `defaults`: The default values to apply before applying anything from the values in the theme.

### Responsive Values

Any prop powered by Restyle can optionally accept a value for each screen size, as defined by the `breakpoints` object in the theme:

```tsx
// In your theme
const theme = createTheme({
  // ...
  breakpoints: {
    phone: 0,
    tablet: 768,
  }
})

// Props always accept either plain values
<Box flexDirection="row" />

// Or breakpoint-specific values
<Box flexDirection={{phone: 'column', tablet: 'row'}} />
```


If you need to extract the value of a responsive prop in a custom component (e.g. to use it outside of component styles), you can use the `useResponsiveProp` hook:

```tsx
import {
  ColorProps,
  createBox,
  useResponsiveProp,
  useTheme,
} from '@shopify/restyle';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import Text from './Text';
import { Theme } from './theme';

const BaseButton = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

type Props = React.ComponentProps<typeof BaseButton> &
  ColorProps<Theme> & {
    label: string;
    isLoading?: boolean;
  };

const Button = ({
  label,
  isLoading,
  color = { phone: 'purple', tablet: 'blue' },
  ...props
}: Props) => {
  const theme = useTheme<Theme>();

  // Will be 'purple' on phone and 'blue' on tablet
  const textColorProp = useResponsiveProp(color);

  // Can safely perform logic with the extracted value
  const bgColor = textColorProp === 'purple' ? 'lightPurple' : 'lightBlue';

  return (
    <BaseButton flexDirection="row" backgroundColor={bgColor} {...props}>
      <Text
        variant="buttonLabel"
        color={color}
        marginRight={isLoading ? 's' : undefined}
      >
        {label}
      </Text>
      {isLoading ? (
        <ActivityIndicator color={theme.colors[textColorProp]} />
      ) : null}
    </BaseButton>
  );
};

```

### Overriding Styles

Any Restyle component also accepts a regular `style` property and will apply it after all other styles, which means that you can use this to do any overrides that you might find necessary.

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
import {ThemeProvider, createBox, createText} from '@shopify/restyle';

export const palette = {
  purple: '#5A31F4',
  white: '#FFF',
  black: '#111',
  darkGray: '#333',
  lightGray: '#EEE',
};

const theme = createTheme({
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
});

type Theme = typeof theme;

const darkTheme: Theme = {
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
        <Box marginTop="m">
          <Switch
            value={darkMode}
            onValueChange={(value: boolean) => setDarkMode(value)}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
```

### Getting Setup With the Shopify Design System

To start using Shopify style assets we can leverage [Polaris tokens](https://github.com/Shopify/polaris-tokens). You can see all of the tokens [here](https://polaris-tokens.herokuapp.com/).

#### Installation
Using  [npm](https://www.npmjs.com/):

`npm install @shopify/polaris-tokens --save`

Using  [yarn](https://yarnpkg.com/en/):

`yarn add @shopify/polaris-tokens`

#### Define Your Theme

```tsx
// In theme
import tokens from '@shopify/polaris-tokens';
import { createTheme } from '@shopify/restyle'

const pxToNumber = (px: string) => {
  return parseInt(px.replace('px', ''), 10);
};

const theme = createTheme({
  colors: {
      body: tokens.colorBlack,
      backgroundRegular: tokens.colorWhite,
      backgroundSubdued: tokens.colorSkyLighter,
    
      foregroundRegular: tokens.colorBlack,
      foregroundOff: tokens.colorInkLight,
      foregroundSubdued: tokens.colorInkLightest,
      foregroundContrasting: tokens.colorWhite,
      foregroundSuccess: tokens.colorGreenDark,
    
      highlightPrimary: tokens.colorIndigo,
      highlightPrimaryDisabled: tokens.colorIndigoLight,
    
      buttonBackgroundPlain: tokens.colorSky,
      errorPrimary: tokens.colorRed,
    
      iconBackgroundDark: tokens.colorBlueDarker,
  },
  spacing: {
      none: tokens.spacingNone,
      xxs: pxToNumber(tokens.spacingExtraTight),
      xs: pxToNumber(tokens.spacingTight),
      s: pxToNumber(tokens.spacingBaseTight),
      m: pxToNumber(tokens.spacingBase),
      l: pxToNumber(tokens.spacingLoose),
      xl: pxToNumber(tokens.spacingExtraLoose),
      xxl: 2 * pxToNumber(tokens.spacingExtraLoose),
  },
});

export type Theme = typeof theme;
export default theme;
```
Now you can easily style your components with [Shopify Polaris](https://polaris.shopify.com/).

### Inspiration

Restyle is heavily inspired by [https://styled-system.com](https://styled-system.com/).

### Contributing

For help on setting up the repo locally, building, testing, and contributing
please see [CONTRIBUTING.md](https://github.com/Shopify/restyle/blob/master/CONTRIBUTING.md).

### Code of Conduct

All developers who wish to contribute through code or issues, take a look at the
[CODE_OF_CONDUCT.md](https://github.com/Shopify/restyle/blob/master/CODE_OF_CONDUCT.md).

### License

MIT, see [LICENSE.md](https://github.com/Shopify/restyle/blob/master/LICENSE.md) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
