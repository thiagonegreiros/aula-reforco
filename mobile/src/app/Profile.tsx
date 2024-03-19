import { Badge } from "@/components/Badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import { User } from "@/components/User";
import { Text, View } from "react-native";

export function Profile() {
  return (
    <View className="h-full bg-gray-500">
      <View className="flex-1 px-4 pb-4 mt-6">
        <User />

        <Card className="bg-white mb-4 mt-4">
          <CardHeader>
            <View className="flex-row">
              <Badge key="1" label="Matemagica" />
            </View>
          </CardHeader>
          <CardContent>
            <Text className="font-bold text-xl">Derivadas e Integrais</Text>
            <Text>
              Integration and derivation are fundamental concepts in calculus,
              enabling us to understand the relationship between a function and
              its rate of change or area under the curve.
            </Text>
          </CardContent>
          <CardFooter>
            <Text>Data da Lição: 19/03/2024</Text>
          </CardFooter>
        </Card>

        <Card className="bg-white mb-4">
          <CardHeader>
            <View className="flex-row">
              <Badge key="1" label="Matemagica" />
            </View>
          </CardHeader>
          <CardContent>
            <Text className="font-bold text-xl">Derivadas e Integrais</Text>
            <Text>
              Integration and derivation are fundamental concepts in calculus,
              enabling us to understand the relationship between a function and
              its rate of change or area under the curve.
            </Text>
          </CardContent>
          <CardFooter>
            <Text>Data da Lição: 19/03/2024</Text>
          </CardFooter>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <View className="flex-row">
              <Badge key="1" label="Matemagica" />
            </View>
          </CardHeader>
          <CardContent>
            <Text className="font-bold text-xl">Derivadas e Integrais</Text>
            <Text>
              Integration and derivation are fundamental concepts in calculus,
              enabling us to understand the relationship between a function and
              its rate of change or area under the curve.
            </Text>
          </CardContent>
          <CardFooter>
            <Text>Data da Lição: 19/03/2024</Text>
          </CardFooter>
        </Card>
      </View>
    </View>
  );
}
