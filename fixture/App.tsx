/* eslint-disable no-console */
import React, {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';

import type {VariantProps} from './restyle';
import {
  ThemeProvider,
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
  createBaseButton,
  createTextInput,
} from './restyle';
import {theme, darkTheme, Theme} from './theme';

const Box = createBox<Theme>();
const Text = createText<Theme>();
const BaseButton = createBaseButton<Theme>();
const TextInput = createTextInput<Theme>();
// const TextInput = createTextInput<Theme>();
// const Select = createSelect<Theme>();
// const Image = createImage<Theme>();

/*

1. funcitonal components (atoms)
2. functional behavioural componets (toast,sheet,alert)

*/

// toasts & sheet pure behavorail components

// import Toast, {useToast} from '@shopify/toast'

// import Button from 'myDS/components/Button'
// import Box from 'myDS/components/Box'

// <Toast.Trigger>
//   <Button>Show Toast</Button>
// </Toast.Trigger>

// <Toast.Content>
//   <Box>

//   </Box>
// </Toast.Content>

/*

Extend restyle with base funcointal components

  Idea:

  Shop Gravity
  How shop is viewed by the customer
  - shared low level components where applicable
  - themed using Shops' unique gravity theme
  - Snowflake components only used in Shop Gravity (Shop)


  Mobile Polaris
  How shopify admin is viewed by the customer
  - custom components for admin
  - themed using Polaris Theme
  - Snowflake components only used in Polaris (Shopify Admin)


  Goal:
  - unique apps should have less unique components & only deal in their unique domain

*/

const DSButton = ({
  title,
  loading,
  ...rest
}: {title: string} & Omit<
  React.ComponentProps<typeof BaseButton>,
  // guard my own DS components from being styled by the user
  'style'
>) => {
  return (
    <BaseButton
      {...rest}
      LoadingComponent={foregroundStyle => {
        return <ActivityIndicator color={foregroundStyle.color} />;
      }}
    >
      {title}
    </BaseButton>
  );
};

const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>(
  [
    createVariant({
      themeKey: 'cardVariants',
      defaults: {
        margin: {
          phone: 's',
          tablet: 'm',
        },
        backgroundColor: 'cardPrimaryBackground',
      },
    }),
  ],
  Box,
);

const Icon = ({size = 16}: {size: number}) => {
  return <Text style={{fontSize: size}}>☃</Text>;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const selectedTheme = darkMode ? darkTheme : theme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <Box backgroundColor="background" flex={1}>
        <SafeAreaView style={{flex: 1}}>
          <ScrollView>
            <Box paddingHorizontal="m" gap="s" alignItems="flex-start">
              <Text variant="header">Welcome</Text>
              <Text variant="subheader">BaseButton</Text>

              <Box flexDirection="row" flexWrap="wrap" gap="s">
                <DSButton
                  title="Primary"
                  onPress={() => console.log('primary!')}
                  accessibilityLabel="Primary Button"
                />
                <DSButton
                  title="Secondary"
                  onPress={() => console.log('secondary!')}
                  accessibilityLabel="Secondary Button"
                />
                <DSButton
                  title="Tertiary"
                  variant="tertiary"
                  onPress={() => console.log('secondary!')}
                  accessibilityLabel="Tertiary Button"
                />
                <DSButton
                  title="Outlined"
                  variant="outlined"
                  loading
                  onPress={() => console.log('outlined!')}
                  accessibilityLabel="Outlined Button"
                />
                <DSButton
                  title="Danger"
                  variant="danger"
                  loading
                  onPress={() => console.log('danger!')}
                  accessibilityLabel="Danger Button"
                />
                <DSButton
                  title="Danger outlined"
                  variant="danger-outlined"
                  loading
                  onPress={() => console.log('danger!')}
                  accessibilityLabel="Danger Outlined Button"
                />
                <DSButton
                  title="Text"
                  variant="text"
                  onPress={() => console.log('danger!')}
                  accessibilityLabel="Text Button"
                />
              </Box>

              <Text variant="subheader">TextInput</Text>
              <TextInput placeholder="Enter text" />
              <TextInput disabled placeholder="Enter text" />
              <TextInput
                LeadingComponent={<Icon name="user" />}
                placeholder="Enter text"
              />

              <Card variant="primary">
                <Text variant="body">
                  This is a simple example displaying how to use Restyle
                </Text>
              </Card>
              <Card variant="secondary">
                <Text variant="body">
                  You can find the theme in theme.ts. Update the theme values to
                  see how it changes this screen
                </Text>
              </Card>
              <Card
                variant="primary"
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
          </ScrollView>
        </SafeAreaView>
      </Box>
    </ThemeProvider>
  );
};

export default App;
