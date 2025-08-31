---
id: migrating-to-v2
title: Migrating to Restyle V2
---

v2 of this library introduces breaking changes in the usage of the `useRestyle` hook.
If you are not using `useRestyle` in your project, then you don't need to address any breaking change and can upgrade the library right away.

## Addressing breaking changes in `useRestyle`

1. Import `composeRestyleFunctions` from `@shopify/restyle`
2. Wrap the array you were using as param of `useRestyle` with `composeRestyleFunctions`
3. Done

### Before

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

### After

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
  BackgroundColorProps<Theme>

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([spacing, border, backgroundColor]);

type Props = RestyleProps & {
  onPress: () => void;
  label: string
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
