---
id: responsive-values
title: Responsive values
---

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
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import Text from './Text';
import {Theme} from './theme';

const BaseButton = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);

type Props = React.ComponentProps<typeof BaseButton> &
  ColorProps<Theme> & {
    label: string;
    isLoading?: boolean;
  };

const Button = ({
  label,
  isLoading,
  color = {phone: 'purple', tablet: 'blue'},
  ...props
}: Props) => {
  const theme = useTheme<Theme>();

  // Will be 'purple' on phone and 'blue' on tablet
  const textColorProp = useResponsiveProp(color);

  // Can safely perform logic with the extracted value
  const bgColor = textColorProp === 'purple' ? 'lightPurple' : 'lightBlue';

  return (
    <BaseButton
      flexDirection="row"
      columnGap="s"
      backgroundColor={bgColor}
      {...props}
    >
      <Text variant="buttonLabel" color={color}>
        {label}
      </Text>
      {isLoading ? (
        <ActivityIndicator color={theme.colors[textColorProp]} />
      ) : null}
    </BaseButton>
  );
};
```
