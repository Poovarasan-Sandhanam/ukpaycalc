const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const { sourceExts } = defaultConfig.resolver;

const config = {
    resolver: {
        sourceExts: [...sourceExts, 'js', 'jsx', 'ts', 'tsx', 'json'],
    },
};

module.exports = mergeConfig(defaultConfig, config);