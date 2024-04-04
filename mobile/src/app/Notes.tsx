import { User } from "@/components/User";
import { FlatList, Text, View } from "react-native";
import { formatDateDayAndWeek } from "@/utils/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { useCallback, useState } from "react";
import { api } from "@/services/api";
import { Skeleton } from "@/components/Skeleton";
import { useFocusEffect } from "@react-navigation/native";
import { useToast } from "@/components/Toast";
import { AppError } from "@/utils/AppError";
import { useAuth } from "@/hooks/useAuth";
import { NotesDto } from "@/dto/NotesDto";

export function Notes() {
  const [notes, setNotes] = useState<NotesDto[]>([]);
  const [isLoading, setIsloading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  async function fetchNotes() {
    try {
      const { data } = await api.get(`/note/user/${user.id}`);

      const notes = data.map((note: NotesDto) => ({
        ...note,
        created_at: formatDateDayAndWeek(note.created_at),
      }));

      setNotes(notes);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Não foi possível os recados do aluno.";

      toast(message, "destructive", 4000);
    } finally {
      setIsloading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [])
  );

  return (
    <View className="h-full px-4 bg-neutral-200">
      <View className="px-6 py-8 h-32">
        <User />
      </View>

      {isLoading ? (
        <View className="justify-center items-center">
          <Skeleton className="w-80 h-56 mt-10 bg-gray-300" />
          <Skeleton className="w-80 h-56 mt-10 bg-gray-300" />
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <Card className="bg-white bg-gray-300 mt-4">
              <CardHeader>
                <CardTitle className="text-xl">{item.created_at}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text className="text-sm text-primary">{item.note}</Text>
              </CardContent>
            </Card>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}
