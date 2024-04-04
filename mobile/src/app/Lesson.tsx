import { Badge } from "@/components/Badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { User } from "@/components/User";
import { FlatList, Text, View } from "react-native";
import { formatDate } from "@/utils/utils";
import { api } from "@/services/api";
import { useCallback, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { SKILLS } from "@/utils/skills";
import { LessonDto } from "@/dto/LessonDto";
import { AppError } from "@/utils/AppError";
import { useToast } from "@/components/Toast";
import { useFocusEffect } from "@react-navigation/native";
import { Skeleton } from "@/components/Skeleton";

export function Lesson() {
  const [lessons, setLessons] = useState<LessonDto[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const { toast } = useToast();

  const {
    user: { id },
  } = useAuth();

  async function fetchLessons() {
    try {
      const { data } = await api.get(`/lesson/user/${id}`);

      const lessons = data.map((lesson: LessonDto) => ({
        ...lesson,
        created_at: formatDate(lesson.created_at),
      }));

      setLessons(lessons);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Não foi possível carregar as lições do aluno.";

      toast(message, "destructive", 4000);
    } finally {
      setIsloading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchLessons();
    }, [])
  );

  const renderBadge = (subjectName: string) => {
    const skill = SKILLS.find((skill) => skill.name === subjectName);
    if (skill) {
      return <Badge label={subjectName} className={skill.bgColor} />;
    }
    return null;
  };

  return (
    <View className="h-full flex-1 px-4">
      <View className="px-4 py-8 h-32">
        <User />
      </View>
      {isLoading ? (
        <View className="justify-center items-center">
          <Skeleton className="w-80 h-56 mt-10 bg-gray-300" />
          <Skeleton className="w-80 h-56 mt-10 bg-gray-300" />
        </View>
      ) : (
        <FlatList
          data={lessons}
          renderItem={({ item }) => (
            <Card className="bg-gray-200 mb-4 mt-4">
              <CardHeader>
                <View className="flex-row">
                  {renderBadge(item.subjects.name)}
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
      )}
    </View>
  );
}
