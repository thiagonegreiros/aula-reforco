import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { User } from "@/components/User";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";

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

export function Schedule() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigation = useNavigation();
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [checkedItems, setCheckedItems] = useState(
    data.daysWeek.map(() => false)
  );

  async function handleSchedule(data) {
    const parseDaysWeek = [...checkedItems.keys()]
      .filter((i) => checkedItems[i])
      .join(",");

    console.log(parseDaysWeek);

    console.log(data);
  }

  return (
    <View className="flex-1 h-full px-4">
      <View className="px-4 py-8 h-32">
        <User />
      </View>

      <View className="gap-4">
        <Text>Horário da Aula</Text>
        <Controller
          control={control}
          name="class_time"
          render={({ field: { onChange, value } }) => (
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
          )}
        />

        <Controller
          control={control}
          name="qty_days"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Quantidade de dias por semana"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      </View>

      <View>
        {data.daysWeek.map((day, index) => (
          <View className="flex flex-row gap-4 mt-4">
            <Checkbox
              value={checkedItems[index]}
              onValueChange={(checked) => {
                setCheckedItems([
                  ...checkedItems.slice(0, index),
                  checked,
                  ...checkedItems.slice(index + 1),
                ]);
              }}
            />
            <Text>{day.name}</Text>
          </View>
        ))}
      </View>

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
