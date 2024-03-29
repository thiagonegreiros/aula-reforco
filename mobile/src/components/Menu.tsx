import { Linking, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

type Props = {
  title: string;
  navigate?: string;
  deepLink?: string;
  icon: string;
};

export function Menu({ title, navigate, deepLink, icon }: Props) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (deepLink) {
      Linking.openURL(deepLink);
    } else if (navigate) {
      navigation.navigate(navigate);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="bg-gray-200 h-32 w-32 m-4 justify-center items-center rounded-2xl">
        <Feather name={icon} size={30} color={colors.ciano[400]} />
        <Text className="text-xs mt-2">{title}</Text>
      </View>
    </TouchableOpacity>
  );
}
