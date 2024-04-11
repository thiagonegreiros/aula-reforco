import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";
import { useAuth } from "@/hooks/useAuth";
import {
  getClassTimeById,
  getInitalName,
  getShortWeekdayNames,
} from "@/utils/utils";

export function User() {
  const { user, student } = useAuth();
  console.log(student);

  return (
    <View className="flex-row justify-between">
      <View className="items-center">
        <Text className="text-gray-400 font-semibold text-xl mt-4">
          {user.name}
        </Text>
        <Text className="text-gray-400 text-xs">
          Classe: {student.school_grade} | Turma:{" "}
          {getClassTimeById(Number(student.class_time))}
        </Text>
        <Text className="text-gray-400 text-xs">
          {getShortWeekdayNames(student.days_of_week)}
        </Text>
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
