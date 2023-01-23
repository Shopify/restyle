import React, {useState} from 'react';
import {
  ThemeProvider,
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import {SafeAreaView, Switch} from 'react-native';

import {theme, darkTheme, Theme} from './theme';

const Box = createBox<Theme>();
const Text = createText<Theme>();

const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box);

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const selectedTheme = darkMode ? darkTheme : theme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Box backgroundColor="background" flex={1}>
        <SafeAreaView style={{flex: 1}}>
          <Box flex={1} paddingHorizontal="m">
            <Text variant="header">Welcome</Text>
            <Card variant="primary" margin="s">
              <Text variant="body">
                This is a simple example displaying how to use Restyle
              </Text>
            </Card>
            <Card variant="secondary" margin="s">
              <Text variant="body">
                You can find the theme in theme.ts. Update the theme values to
                see how it changes this screen
              </Text>
            </Card>
            <Card
              variant="primary"
              margin="s"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text variant="body">Toggle dark mode</Text>
              <Switch
                value={darkMode}
                onValueChange={(value: boolean) => setDarkMode(value)}
              />
            </Card>
          </Box>
        </SafeAreaView>
      </Box>
    </ThemeProvider>
  );
};

export default App;
