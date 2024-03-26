import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { Input } from "@/components/Input";
import { Select } from "@/components/Select";
import { User } from "@/components/User";
import { Text, View } from "react-native";

export function Schedule() {
  const DAYS_OF_WEEK = [
    {
      value: "mon",
      label: "Segunda",
    },
    {
      value: "tue",
      label: "Terça",
    },
    {
      value: "wen",
      label: "Quarta",
    },
    {
      value: "thu",
      label: "Quinta",
    },
    {
      value: "fri",
      label: "Sexta",
    },
  ];

  const CLASS_TIME = [
    {
      value: "1",
      label: "08:30 - 10:30",
    },
    {
      value: "2",
      label: "13:00 - 15:00",
    },
    {
      value: "3",
      label: "14:30 - 16:30",
    },
  ];

  const handleSelect = (selectedOption: string) => {
    console.log("Selected Option:", selectedOption);
  };

  return (
    <View className="flex-1 h-full px-4">
      <View className="px-4 py-8 h-32">
        <User />
      </View>

      <View className="gap-4">
        <Text>Horário da Aula</Text>
        <Select
          options={CLASS_TIME}
          onSelect={handleSelect}
          className="border rounded-xl"
        />
        <Input placeholder="Quantidade de dias por semana" />
      </View>

      <View className="mt-6 gap-4">
        {DAYS_OF_WEEK.map((day) => (
          <Checkbox key={day.value} label={day.label} />
        ))}
      </View>

      <View className="flex flex-row justify-end px-4">
        <Button label="Save" variant="secondary" className="mr-2 mt-4" />
        <Button label="Cancel" variant="destructive" className="ml-2 mt-4" />
      </View>
    </View>
  );
}
