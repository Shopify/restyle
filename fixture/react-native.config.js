const path = require('path');

const root = path.resolve(__dirname, '../');

const project = (() => {
  try {
    const {configureProjects} = require('react-native-test-app');
    return configureProjects({
      android: {
        sourceDir: 'android',
      },
      ios: {
        sourceDir: 'ios',
      },
    });
  } catch (_) {
    return undefined;
  }
})();

module.exports = {
  ...(project ? {project} : undefined),
  dependencies: {
    '@shopify/restyle': {
      root,
    },
  },
};
