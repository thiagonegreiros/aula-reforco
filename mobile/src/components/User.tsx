import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export function User() {
  return (
    <View className="flex-row justify-between">
      <View className="items-center">
        <Text className="text-gray-500 font-bold text-xl mt-4">
          Thiago Negreiros
        </Text>
        <Text className="text-gray-400 text-xs">
          Classe: Primeiro Ano | Turma: 08h~10h
        </Text>
        <Text className="text-gray-400 text-xs">Seg, Qua, Sex</Text>
      </View>

      <Avatar className="w-20 h-20 border-4 border-gray-600 mt-2">
        <AvatarImage
          source={{ uri: "https://github.com/thiagonegreiros.png" }}
        />
        <AvatarFallback>TN</AvatarFallback>
      </Avatar>
    </View>
  );
}
