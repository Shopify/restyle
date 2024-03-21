const path = require('path');

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
// eslint-disable-next-line import/no-extraneous-dependencies
const exclusionList = require('metro-config/src/defaults/exclusionList');
// eslint-disable-next-line import/no-extraneous-dependencies
const escape = require('escape-string-regexp');

const packages = require('../package.json');

const modules = Object.keys({
  ...packages.peerDependencies,
});

const root = path.resolve(__dirname, '..');

const watchFolders = [
  root,
  path.join(__dirname, './node_modules'),
  path.join(__dirname, '../node_modules'),
];

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot: __dirname,
  transformer: {
    getTransformOptions: () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  resolver: {
    blockList: exclusionList(
      modules.map(
        m => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`),
      ),
    ),

    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },
  watchFolders,
};

if (process.env.CI === 'true') {
  config.maxWorkers = 1;
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
