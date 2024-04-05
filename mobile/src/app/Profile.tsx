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

type FormDataProps = {
  user: {
    name: string;
    email: string;
    born_date: string;
    password: string;
    repeat_password: string;
  };
  student: {
    school_grade: string;
    mother_name: string;
    father_name: string;
    responsible_number: string;
    student_name: string;
  };
  old_password: string;
};

const profileSchema = yup.object({
  email: yup.string().required("Email obrigatório."),
  school_grade: yup.string().required("Escolaridade obrigatório."),
  mother_name: yup.string().required("Nome da Mãe obrigatório."),
  father_name: yup.string().required("Nome do Pai obrigatório."),
  responsable_number: yup.string().required("Telefone obrigatório."),
  password: yup
    .string()
    .min(6, "A senha deve possuir no mínimo 6 caracteres.")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("password"), null], "As senhas não coincidem.")
    .when("password", {
      is: (field: any) => field,
      then: yup
        .string()
        .nullable()
        .required("Informe a confirmação da senha.")
        .transform((value) => (!!value ? value : null)),
    }),
});

export function Profile() {
  const [student, setStudent] = useState<StudentDto>();
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateUserProfile } = useAuth();

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
  });

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsLoading(true);

      const userUpdated = user;

      const studentData = {
        school_grade: data.student.school_grade,
        mother_name: data.student.mother_name,
        father_name: data.student.father_name,
        student_name: data.student.student_name,
        responsible_number: data.student.responsible_number,
      };

      if (student) {
        Object.assign(studentData, {
          id_user_student: user.id,
        });

        console.log(studentData);

        await api.put(`/student/${student.id}`, studentData);
      } else {
        await api.post("/student", studentData);
      }

      // await api.put("/users", data);
      //await updateUserProfile(userUpdated);

      toast("Profile atualizado com sucesso.", "success", 4000);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Não foi possível atualizar o perfil. Tente novamente.";

      console.log(message);
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
              />
            )}
          />
          <Controller
            control={control}
            name="user.repeat_password"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Repetir a Senha"
                placeholder="Repita a Senha"
                onChangeText={onChange}
                value={value}
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
          />
        </View>
      </View>
    </ScrollView>
  );
}
