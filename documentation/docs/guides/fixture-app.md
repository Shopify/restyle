---
id: fixture-app
title: Running the fixture app
---

The fixture app serves as a playground to either learn to use Restyle, test changes to the library, or simply prototype ideas. To get it running, follow the steps below:

1. First, run `yarn up` to install all the Restyle and fixture app dependencies.

2. Next, run `yarn start` to start Metro.

3. Lastly, run `yarn run-ios` to start the app on iOS, and `yarn run-android` to start the app on Android.

Your local iOS simulator and Android emulator should open automatically. If they do not, please follow React Native's [Setting up the development environment](https://reactnative.dev/docs/environment-setup).

### Making changes to Restyle

When making changes to Restyle (the code in [/src](https://github.com/Shopify/restyle/tree/master/src)), you'll need to run `yarn build` to use the latest Restyle build in the fixture app.
