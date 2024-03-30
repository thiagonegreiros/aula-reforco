const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (() => {
  const baseConfig = getDefaultConfig(__dirname);

  const configWithNativeWind = withNativeWind(baseConfig, {
    input: "./src/styles/global.css",
  });

  const { transformer, resolver } = configWithNativeWind;

  configWithNativeWind.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };

  configWithNativeWind.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return configWithNativeWind;
})();
