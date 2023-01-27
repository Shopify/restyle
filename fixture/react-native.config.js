const path = require('path');

const root = path.resolve(__dirname, '../');

const project = (() => {
  const fs = require('fs');
  try {
    const {
      androidManifestPath,
      iosProjectPath,
      windowsProjectPath,
    } = require('react-native-test-app');
    const iosProject = iosProjectPath('ios');
    return {
      android: {
        sourceDir: 'android',
        manifestPath: androidManifestPath(path.join(__dirname, 'android')),
      },
      windows: fs.existsSync('windows/fixture-app.sln') && {
        sourceDir: 'windows',
        solutionFile: 'fixture-app.sln',
        project: windowsProjectPath(path.join(__dirname, 'windows')),
      },
      ...(iosProject ? {ios: {project: iosProject}} : undefined),
    };
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
