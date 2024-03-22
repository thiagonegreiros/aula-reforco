import { Badge } from "@/components/Badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { User } from "@/components/User";
import { FlatList, Text, View } from "react-native";
import { formatDate } from "@/utils/utils";
export function Profile() {
  const DATA = [
    {
      id: 1,
      subject: "Matemágica",
      title: "Derivadas e Integrais",
      description:
        "Integration and derivation are fundamental concepts in calculus, enabling us to understand the relationship between a function and its rate of change or area under the curve.",

      created_at: formatDate(new Date().toString()),
    },
    {
      id: 2,
      subject: "Português",
      title: "Derivadas e Integrais",
      description:
        "Integration and derivation are fundamental concepts in calculus, enabling us to understand the relationship between a function and its rate of change or area under the curve.",

      created_at: formatDate(new Date().toString()),
    },
    {
      id: 3,
      subject: "Física",
      title: "Derivadas e Integrais",
      description:
        "Integration and derivation are fundamental concepts in calculus, enabling us to understand the relationship between a function and its rate of change or area under the curve.",

      created_at: formatDate(new Date().toString()),
    },
  ];

  return (
    <View className="h-full bg-gray-500 flex-1 px-4 pb-4 pt-16">
      <View className="mt-6">
        <User />
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Card className="bg-white mb-4 mt-4">
            <CardHeader>
              <View className="flex-row">
                <Badge key={item.id} label={item.subject} />
              </View>
            </CardHeader>
            <CardContent>
              <Text className="font-bold text-xl">{item.title}</Text>
              <Text>{item.description}</Text>
            </CardContent>
            <CardFooter>
              <Text>Data da Lição: {item.created_at}</Text>
            </CardFooter>
          </Card>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
