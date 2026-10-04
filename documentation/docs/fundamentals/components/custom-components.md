---
id: custom-components
title: Custom components
---

If you want to create your own component similar to `Box` or `Text`, but decide
yourself which [predefined Restyle functions](/fundamentals/restyle-functions#predefined-restyle-functions) to use, use the
`createRestyleComponent` helper:

```ts
import {
  createRestyleComponent,
  createVariant,
  spacing,
  SpacingProps,
  VariantProps,
} from '@shopify/restyle';
import {Theme} from './theme';

type Props = SpacingProps<Theme> & VariantProps<Theme, 'cardVariants'>;
const Card = createRestyleComponent<Props, Theme>([
  spacing,
  createVariant({themeKey: 'cardVariants'}),
]);

export default Card;
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
  composeRestyleFunctions,
} from '@shopify/restyle';

import Text from './Text';
import {Theme} from './theme';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  border,
  backgroundColor,
]);

type Props = RestyleProps & {
  onPress: () => void;
  label: string;
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

Note: Make sure to update your `theme.tsx` file to include `borderRadii` properties for this custom component to work:

```tsx
import {createTheme} from '@shopify/restyle';

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
  // ...rest of your theme code
  borderRadii: {
    s: 8,
    m: 16,
    l: 100,
    xl: 40,
  },
});

export type Theme = typeof theme;
export default theme;
```
