import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 bg-gray-700 justify-center items-center">
      <ActivityIndicator color="white" size="large" />
    </View>
  );
}
