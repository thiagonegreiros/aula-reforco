import { useState } from "react";
import { View, Platform, Pressable } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatDate } from "@/utils/utils";
import { Input, InputProps } from "./Input";

export interface DateInputProps extends InputProps {
  onChangeText: (value: Date) => void;
}

export const DateInput = ({
  className,
  label,
  labelClasses,
  inputClasses,
  errorMessage = null,
  value,
  onChangeText,
  ...props
}: DateInputProps) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      setShowDatePicker(Platform.OS === "ios"); // Para iOS, mostra o picker no momento em que a data é selecionada
      onChangeText(selectedDate);
    } else {
      toggleDatePicker();
    }
  };

  console.log(value);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  return (
    <View className="w-full">
      <Pressable onPress={toggleDatePicker}>
        <Input
          className={className}
          errorMessage={errorMessage}
          editable={false}
          value={formatDate(value)}
          {...props}
        />
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="spinner"
          onChange={onChange}
        />
      )}
    </View>
  );
};
