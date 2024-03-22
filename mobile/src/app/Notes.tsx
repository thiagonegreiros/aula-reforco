import { User } from "@/components/User";
import { FlatList, Text, View } from "react-native";
import { formatDateDayAndWeek } from "@/utils/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

export function Notes() {
  const DATA = [
    {
      id: 1,
      created_at: formatDateDayAndWeek(new Date().toString()),
      note: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    },
    {
      id: 2,
      created_at: formatDateDayAndWeek(new Date().toString()),
      note: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    },
    {
      id: 3,
      created_at: formatDateDayAndWeek(new Date().toString()),
      note: "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.",
    },
  ];

  return (
    <View className="h-full bg-gray-500 px-4">
      <View className="mt-6">
        <User />
      </View>

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Card className="bg-white mt-4">
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
