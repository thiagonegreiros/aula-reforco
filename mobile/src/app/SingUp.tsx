import { Image, ScrollView, Text, View } from "react-native";

import LogoSvg from "@/assets/logo.svg";
import BackgroundImage from "@/assets/bg_antique.png";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-1 pb-2">
        <Image
          source={BackgroundImage}
          alt="Backgorund da aplicação"
          resizeMode="contain"
          className="absolute"
        />

        <View className="my-16 items-center">
          <LogoSvg />
          <View className="w-56">
            <Text className="text-gray-100 text-[9px] text-justify text-wrap">
              Porque o Senhor dá a sabedoria; da sua boca é que vem o
              conhecimento e o entendimento.{" "}
            </Text>
            <Text className="text-gray-100 text-[7px]">Provérbios 2:6</Text>
          </View>
        </View>

        <View className="items-center gap-4 w-full px-10">
          <Text className="text-white font-bold text-xl mb-6">
            Crie a sua conta
          </Text>

          <Input placeholder="Nome" className="w-full" />
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            className="w-full"
          />
          <Input
            placeholder="Data de nascimento"
            keyboardType="number-pad"
            className="w-full"
          />
          <Input placeholder="Senha" secureTextEntry className="w-full" />
          <Input
            placeholder="Repetir Senha"
            secureTextEntry
            className="w-full"
          />

          <Button
            label="Criar Conta"
            className="w-full bg-sky-500 text-white"
          />
        </View>

        <View className="items-center w-full px-10 mt-8">
          <Text className="text-gray-100 text-sm mb-3">Ja tem conta?</Text>
          <Button
            label="Acessar Conta"
            className="w-full"
            variant="link"
            onPress={handleGoBack}
          />
        </View>
      </View>
    </ScrollView>
  );
}
