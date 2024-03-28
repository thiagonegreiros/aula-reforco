import { Badge } from "@/components/Badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { User } from "@/components/User";
import { FlatList, Text, View } from "react-native";
import { formatDate } from "@/utils/utils";
import { api } from "@/services/api";
import { useEffect, useState } from "react";

export function Lesson() {
  const [lessons, setLessons] = useState();

  async function fetchLessons() {
    const { data } = await api.get("/lesson/user/1");

    const lessons = data.map((lesson) => ({
      ...lesson,
      created_at: formatDate(lesson.created_at),
    }));

    setLessons(lessons);
  }

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <View className="h-full flex-1 px-4">
      <View className="px-4 py-8 h-32">
        <User />
      </View>
      <FlatList
        data={lessons}
        renderItem={({ item }) => (
          <Card className="bg-gray-200 mb-4 mt-4">
            <CardHeader>
              <View className="flex-row">
                <Badge key={item.id} label={item.subjects.name} />
              </View>
            </CardHeader>
            <CardContent>
              <Text className="font-bold text-xl">{item.title}</Text>
              <Text className="text-justify">{item.description}</Text>
            </CardContent>
            <CardFooter>
              <Text>Data da Lição: {item.created_at}</Text>
            </CardFooter>
          </Card>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
