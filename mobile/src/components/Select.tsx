import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View } from "react-native";

interface ClassTime {
  value: string;
  label: string;
}

interface Props extends React.ComponentPropsWithoutRef<typeof View> {
  options: ClassTime[];
  onSelect: (selectedValue: string) => void;
}

export function Select({ options, onSelect, className }: Props) {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (itemValue: string) => {
    setSelectedValue(itemValue);
    onSelect(itemValue);
  };

  return (
    <View className={className}>
      <Picker selectedValue={selectedValue} onValueChange={handleValueChange}>
        <Picker.Item label="Selecione uma opção" value="" />
        {options.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
}
