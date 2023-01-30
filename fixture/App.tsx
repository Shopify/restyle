import React, {useRef, useState} from 'react';
import {
  ThemeProvider,
  createBox,
  createText,
  createRestyleComponent,
  createVariant,
  VariantProps,
} from '@shopify/restyle';
import {
  Pressable,
  SafeAreaView,
  Switch,
  StyleSheet,
  View,
  LayoutAnimation,
} from 'react-native';
import {FlashList, useBenchmark} from '@shopify/flash-list';

import {theme, darkTheme, Theme} from './theme';

const Box = createBox<Theme>();
const Text = createText<Theme>();

const Card = createRestyleComponent<
  VariantProps<Theme, 'cardVariants'> & React.ComponentProps<typeof Box>,
  Theme
>([createVariant({themeKey: 'cardVariants'})], Box);

const generateArray = (size: number) => {
  const arr = new Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = i;
  }
  return arr;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const selectedTheme = darkMode ? darkTheme : theme;

  const [refreshing, setRefreshing] = useState(false);
  const data = useRef(generateArray(200)).current;

  const list = useRef<FlashList<number> | null>(null);

  const renderItem = ({item}: {item: number}) => {
    // const backgroundColor = item % 2 === 0 ? '#00a1f1' : '#ffbb00';
    const backgroundColor =
      item % 2 ? 'cardPrimaryBackground' : 'cardSecondaryBackground';
    const height = item % 2 === 0 ? 100 : 200;
    const children = new Array(100).map((_, index) => {
      const backgroundColor =
        index % 2 ? 'cardPrimaryBackground' : 'cardSecondaryBackground';
      return (
        <Box
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          backgroundColor={backgroundColor}
          width={10}
        />
      );
    });
    return (
      <Box
        // justifyContent="space-around"
        // alignItems="center"
        alignItems="stretch"
        flexDirection="row"
        // backgroundColor={backgroundColor}
        height={height}
      >
        {new Array(100).map((_, index) => {
          const backgroundColor =
            index % 2 ? 'cardPrimaryBackground' : 'cardSecondaryBackground';
          return (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              backgroundColor="cardPrimaryBackground"
              // width={10}
              height={100}
              flexGrow={1}
            />
          );
        })}
        {/* <View
        style={{
          ...styles.container,
          backgroundColor,
          height,
        }}
      > */}
        {/* <Text>Cell Id: {item}</Text> */}
        {/* {children} */}
        {/* </View> */}
      </Box>
    );
  };

  const [blankAreaTracker] = useBenchmark(list, res => {
    if (!res.interrupted) {
      // eslint-disable-next-line no-alert
      alert(res.formattedString);
    }
  });

  return (
    <ThemeProvider theme={selectedTheme}>
      <FlashList
        // onBlankArea={blankAreaTracker}
        // ref={list}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
          }, 2000);
        }}
        keyExtractor={(item: number) => {
          return item.toString();
        }}
        renderItem={renderItem}
        estimatedItemSize={100}
        data={data}
      />
      {/* <Box backgroundColor="background" flex={1}>
        <SafeAreaView style={{flex: 1}}>
          <Box flex={1} paddingHorizontal="m" gap="s">
            <Text variant="header">Welcome</Text>
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
        </SafeAreaView>
      </Box> */}
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 120,
    backgroundColor: '#00a1f1',
  },
});

export default App;
