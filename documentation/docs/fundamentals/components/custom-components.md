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
