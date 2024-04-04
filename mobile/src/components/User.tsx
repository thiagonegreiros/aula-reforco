import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { useAuth } from "@/hooks/useAuth";
import { getInitalName } from "@/utils/utils";

export function User() {
  const { user } = useAuth();

  return (
    <View className="flex-row justify-between">
      <View className="items-center">
        <Text className="text-gray-400 font-semibold text-xl mt-4">
          {user.name}
        </Text>
        <Text className="text-gray-400 text-xs">
          Classe: Primeiro Ano | Turma: 08h~10h
        </Text>
        <Text className="text-gray-400 text-xs">Seg, Qua, Sex</Text>
      </View>

      <Avatar className="w-20 h-20 mt-2">
        <AvatarImage source={{ uri: "https://github.com/thiagonegrei.png" }} />
        <AvatarFallback className="bg-cyan-500">
          {getInitalName(user.name)}
        </AvatarFallback>
      </Avatar>
    </View>
  );
}
