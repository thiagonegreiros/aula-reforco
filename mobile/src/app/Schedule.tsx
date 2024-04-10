import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { User } from "@/components/User";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { number } from "yup";

type DaysOfWeek = {
  id: number;
  name: string;
};

type ClassTime = {
  value: number;
  label: string;
};

const data = {
  daysWeek: [
    { id: 1, name: "Segunda-feira" },
    { id: 2, name: "Terça-feira" },
    { id: 3, name: "Quarta-feria" },
    { id: 4, name: "Quinta-feira" },
    { id: 5, name: "Sexta-feira" },
  ],
  classTime: [
    { id: 1, name: "08:30 - 10:30" },
    { id: 2, name: "13:00 - 15:00" },
    { id: 3, name: "14:30 - 16:30" },
  ],
};

type FormDataScheduleProps = {
  class_time: string;
  days_of_week: string;
  qty_days_peer_week: number;
};

//TODO: Validade with fill the profile fields
//TODO: Block button with no fill profile fields
export function Schedule() {
  const {
    getValues,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation();
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [checkedItems, setCheckedItems] = useState(
    data.daysWeek.map(() => false)
  );

  const handleCheckboxChange = (index: number) => {
    const maxDays = Number(getValues("qty_days"));
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

  async function handleSchedule(data: FormDataScheduleProps) {
    const parseDaysWeek = [...checkedItems.keys()]
      .filter((i) => checkedItems[i])
      .join(",");

    const dataUpdate = {
      class_time: data.class_time,
      days_of_week: parseDaysWeek,
      qty_days_peer_week: data.qty_days_peer_week,
    };

    console.log("Handle Schedule: ", dataUpdate);
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
                {data.classTime.map((option) => (
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
          {data.daysWeek.map((day, index) => (
            <View className="flex flex-row gap-4 mt-4" key={day.id}>
              <Checkbox
                value={checkedItems[index + 1]}
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
