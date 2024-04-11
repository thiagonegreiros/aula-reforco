import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useToast } from "@/components/Toast";
import { User } from "@/components/User";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import { AppError } from "@/utils/AppError";
import { CLASS_TIME, DAYS_WEEK } from "@/utils/constants";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { SlideInDown } from "react-native-reanimated";

//TODO: Validade with fill the profile fields
//TODO: Block button with no fill profile fields
export function Schedule() {
  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, student, updateStudent } = useAuth();
  const { toast } = useToast();
  const navigation = useNavigation();
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [checkedItems, setCheckedItems] = useState(DAYS_WEEK.map(() => false));

  const handleCheckboxChange = (index: number) => {
    const maxDays = Number(getValues("qty_days_peer_week"));
    const currentChecked = checkedItems[index];
    const selectedCount = checkedItems.filter((isChecked) => isChecked).length;

    if (!currentChecked && selectedCount >= maxDays) {
      // Se o número máximo de dias já estiver selecionado, não permita mais seleções
      return;
    }

    setCheckedItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index] = !currentChecked;
      return updatedItems;
    });
  };

  const handleQtyDaysChange = (value: string) => {
    setShowCheckboxes(!!value);
  };

  async function handleSchedule(data) {
    try {
      const parseDaysWeek = [...checkedItems.keys()]
        .filter((i) => checkedItems[i])
        .join(",");

      const { data: getStudent } = await api.get(`/student/${student.id}`);

      const studentUpdate = {
        father_name: getStudent.father_name,
        mother_name: getStudent.mother_name,
        responsible_number: getStudent.responsible_number,
        class_time: String(data.class_time),
        qty_days_peer_week: Number(data.qty_days_peer_week),
        days_of_week: String(parseDaysWeek),
        active: getStudent.active,
        school_grade: getStudent.school_grade,
        id_user_student: user.id,
      };

      await api.put(`/student/${student.id}`, studentUpdate);
      await updateStudent({
        id: student?.id,
        school_grade: student?.school_grade,
        days_of_week: studentUpdate.days_of_week,
      });

      toast("Agendamento realizado com sucesso.", "success", 4000);
    } catch (error) {
      //setIsLoading(false);
      const isAppError = error instanceof AppError;
      const message = isAppError
        ? error.message
        : "Não foi possivel fazer o agendamento. Tente novamente mais tarde.";
      toast(message, "destructive", 4000);
    }
  }

  return (
    <View className="flex-1 h-full px-4">
      <View className="px-4 py-8 h-32">
        <User />
      </View>

      <View className="gap-6">
        <Text>Horário da Aula</Text>
        <Controller
          control={control}
          name="class_time"
          render={({ field: { onChange, value } }) => (
            <View className="rounded mb-2 bg-gray-300">
              <Picker selectedValue={value} onValueChange={onChange}>
                <Picker.Item label="Selecione uma opção" value="" />
                {CLASS_TIME.map((option) => (
                  <Picker.Item
                    key={option.id}
                    label={option.name}
                    value={option.id}
                  />
                ))}
              </Picker>
            </View>
          )}
        />

        <Controller
          control={control}
          name="qty_days_peer_week"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Quantidade de dias por semana"
              placeholder="Digite a quantidade de dias"
              onChangeText={(text) => {
                onChange(text);
                handleQtyDaysChange(text);
              }}
              value={value}
            />
          )}
        />
      </View>

      {showCheckboxes && (
        <View>
          {DAYS_WEEK.map((day, index) => (
            <View className="flex flex-row gap-4 mt-4" key={day.id}>
              <Checkbox
                value={checkedItems[index]}
                onValueChange={() => handleCheckboxChange(index)}
              />
              <Text>{day.name}</Text>
            </View>
          ))}
        </View>
      )}

      <View className="flex flex-row justify-end px-4">
        <Button
          label="Save"
          variant="secondary"
          className="w-20 mr-2 mt-4"
          onPress={handleSubmit(handleSchedule)}
        />
        <Button
          label="Cancel"
          variant="destructive"
          className="w-20 ml-2 mt-4"
          onPress={() => navigation.navigate("home")}
        />
      </View>
    </View>
  );
}
