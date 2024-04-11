import { Image, ScrollView, Text, View } from "react-native";

import LogoSvg from "@/assets/logo.svg";
import BackgroundImage from "@/assets/bg_antique.png";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@/routes/auth.routes";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DateInput } from "@/components/DateInput";
import { api } from "@/services/api";
import { useToast } from "@/components/Toast";
import { AppError } from "@/utils/AppError";
import { useState } from "react";

type FormDataProps = {
  name: string;
  email: string;
  born_date: Date;
  password: string;
  repeat_password: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Infome o e-mail").email("E-mail inválido"),
  born_date: yup.date().required("Informe a data de nascimento"),
  password: yup
    .string()
    .required("Infome a senha")
    .min(6, "A senha deve ter no minimo 6 dígitos"),
  repeat_password: yup
    .string()
    .required("Repita a senha")
    .oneOf([yup.ref("password"), null], "A confirmação de senha não confere."),
});

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
  });

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp({
    name,
    email,
    born_date,
    password,
  }: FormDataProps) {
    try {
      setIsLoading(true);
      await api.post("/sign-up", {
        name,
        email,
        born_date,
        password,
      });

      toast("Usuário cadastrado com sucesso.", "success", 4000);
    } catch (error) {
      setIsLoading(false);
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Não foi possivel criar conta. Tente novamente mais tarde.";
      toast(message, "destructive", 4000);
    }
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

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                className="w-full"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                className="w-full"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="born_date"
            render={({ field: { onChange, value } }) => (
              <DateInput
                placeholder="Data de nascimento"
                keyboardType="number-pad"
                className="w-full"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.born_date?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                className="w-full"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="repeat_password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Repetir Senha"
                className="w-full"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.repeat_password?.message}
              />
            )}
          />

          <Button
            label="Criar Conta"
            className="w-full bg-sky-500 text-white"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
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
