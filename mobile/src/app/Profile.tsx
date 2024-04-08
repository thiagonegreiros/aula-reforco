import { ScrollView, Text, View } from "react-native";
import { User } from "@/components/User";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Controller, useForm } from "react-hook-form";
import { getAge, normalizePhoneNumber } from "@/utils/utils";
import { useAuth } from "@/hooks/useAuth";

import * as yup from "yup";
import { useEffect, useState } from "react";
import { AppError } from "@/utils/AppError";
import { api } from "@/services/api";
import { StudentDto } from "@/dto/StudentDto";
import { useToast } from "@/components/Toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { resolver } from "../../metro.config";
import { UserDto } from "@/dto/UserDto";

type UserProps = {
  name: string;
  email: string;
  born_date: string;
  password: string;
  repeat_password: string;
};

type StudentProps = {
  school_grade: string;
  mother_name: string;
  father_name: string;
  responsible_number: string;
  student_name: string;
};

type FormDataProps = {
  user: UserProps;
  student: StudentProps;
  old_password: string;
};

const profileSchema = yup.object({
  user: yup.object({
    email: yup.string().required("Email obrigatório."),
    password: yup
      .string()
      .min(6, "A senha deve possuir no mínimo 6 caracteres.")
      .nullable()
      .transform((value) => (!!value ? value : null)),
    repeat_password: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        ({ path }) => `${path} deve coincidir com a senha.`
      )
      .required("Confirmação de senha obrigatória"),
  }),
  student: yup.object({
    school_grade: yup.string().required("Escolaridade obrigatória."),
    mother_name: yup.string().required("Nome da Mãe obrigatório."),
    father_name: yup.string().required("Nome do Pai obrigatório."),
    responsible_number: yup
      .string()
      .required("Telefone obrigatório.")
      .matches(
        /\(([0-9]{2}|0{1}((x|[0-9]){2}[0-9]{2}))\)\s*[0-9]{3,4}[- ]*[0-9]{4}/,
        "Favor digitar neste formato: (XX) XXXXXXXXX"
      ),
  }),
  old_password: yup.string(),
});

export function Profile() {
  const [student, setStudent] = useState<StudentDto>();
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUserProfile } = useAuth();

  const navigation = useNavigation();
  const { toast } = useToast();

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      user: {
        email: user.email,
        born_date: getAge(user.born_date).toString(),
      },
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsLoading(true);

      const studentData = {
        school_grade: data.student.school_grade,
        mother_name: data.student.mother_name,
        father_name: data.student.father_name,
        student_name: data.student.student_name,
        responsible_number: data.student.responsible_number,
        id_user_student: user.id,
      };

      const userData = {
        id: Number(user.id),
        name: user.name,
        password: data.user.password,
        born_date: String(new Date(user.born_date)),
        email: user.email,
        role: user.role,
      };

      const { password, ...updateUserData } = userData;

      if (student) {
        await api.put(`/student/${student.id}`, studentData);
      } else {
        await api.post("/student", studentData);
      }

      await api.put(`/user/${user.id}`, userData);
      await updateUserProfile(updateUserData);

      toast("Profile atualizado com sucesso.", "success", 4000);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Não foi possível atualizar o perfil. Tente novamente.";

      console.log(error);
      toast(message, "destructive", 4000);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetStudent() {
    try {
      const id_user_student = user.id;

      const { data } = await api.get<StudentDto>(
        `/student/user/${id_user_student}`
      );

      if (data) {
        setValue("student.school_grade", data.school_grade);
        setValue("student.mother_name", data.mother_name);
        setValue("student.father_name", data.father_name);
        setValue("student.student_name", data.student_name || "");
        setValue(
          "student.responsible_number",
          normalizePhoneNumber(data.responsible_number)
        );

        setStudent(data);
      }
    } catch (error) {
      const isAppError = error instanceof AppError;

      const message = isAppError
        ? error.message
        : "Não foi possível resgatar os dados do estudante. Tente mais tarde";

      setIsLoading(false);
      toast(message, "destructive", 4000);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetStudent();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="h-full px-4">
        <View className="mt-6">
          <User />
        </View>

        <View className="justify-center m-4 gap-4">
          <View className="flex-row w-full">
            <Controller
              control={control}
              name="user.born_date"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Idade"
                  editable={false}
                  placeholder="Idade"
                  className="flex-1 mr-2"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="student.school_grade"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Escolaridade"
                  placeholder="Escolaridade"
                  className="flex-1 ml-2"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.student?.school_grade?.message}
                />
              )}
            />
          </View>
          <Controller
            control={control}
            name="user.email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="E-mail"
                editable={false}
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="student.mother_name"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nome da Mãe"
                placeholder="Nome da Mãe"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.student?.mother_name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="student.father_name"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nome do Pai"
                placeholder="Nome do Pai"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.student?.father_name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="student.student_name"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nome do Estudante"
                placeholder="Nome do Estudante"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.student?.student_name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="student.responsible_number"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Número do Responsável"
                placeholder="Número do Responsável"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.student?.responsible_number?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="user.password"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Senha"
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                secureTextEntry
                errorMessage={errors.user?.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="user.repeat_password"
            render={({ field: { onChange } }) => (
              <Input
                label="Repetir a Senha"
                placeholder="Repita a Senha"
                onChangeText={onChange}
                secureTextEntry
                errorMessage={errors.user?.repeat_password?.message}
              />
            )}
          />
        </View>

        <View className="flex flex-row justify-end px-4">
          <Button
            label="Save"
            variant="secondary"
            className="w-20 mr-2 mt-4"
            onPress={handleSubmit(handleProfileUpdate)}
          />
          <Button
            label="Cancel"
            variant="destructive"
            className="w-20 ml-2 mt-4"
            onPress={() => navigation.navigate("home")}
          />
        </View>
      </View>
    </ScrollView>
  );
}
