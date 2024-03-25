import { Text, View } from "react-native";
import { User } from "@/components/User";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

export function Profile() {
  return (
    <View className="h-full px-4">
      <View className="mt-6">
        <User />
      </View>

      <View className="justify-center m-4 gap-4">
        <View className="flex-row w-full">
          <Input placeholder="Idade" className="flex-1 mr-2" />
          <Input placeholder="Escolariade" className="flex-1 ml-2" />
        </View>
        <Input placeholder="Email" />
        <Input placeholder="Nome da Mãe" />
        <Input placeholder="Nome do Pai" />
        <Input placeholder="Nome do Estudante" />
        <Input placeholder="Senha" />
        <Input placeholder="Repetir Senha" />
      </View>

      <View className="flex flex-row justify-end px-4">
        <Button label="Save" variant="secondary" className="mr-2 mt-4" />
        <Button label="Cancel" variant="destructive" className="ml-2 mt-4" />
      </View>
    </View>
  );
}
