import { User } from "@/components/User";
import { FlatList, Text, View } from "react-native";
import { formatDateDayAndWeek } from "@/utils/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { useEffect, useState } from "react";
import { api } from "@/services/api";

export function Notes() {
  const [notes, setNotes] = useState();

  //TODO: Make a interface from data
  async function fetchNotes() {
    const { data } = await api.get("/note/user/1");

    const notes = data.map((note) => ({
      ...note,
      created_at: formatDateDayAndWeek(note.created_at),
    }));

    setNotes(notes);
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View className="h-full px-4">
      <View className="mt-6">
        <User />
      </View>

      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <Card className="bg-white bg-gray-200 mt-4">
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
    </View>
  );
}
