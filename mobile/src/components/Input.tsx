import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";

import { cn } from "../lib/utils";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, ...props }, ref) => (
    <View className={cn("flex flex-col gap-1.5", className)}>
      {label && <Text className={cn("text-base", labelClasses)}>{label}</Text>}
      <TextInput
        className={cn(
          inputClasses,
          "h-14 px-4 text-md text-white mb-4 bg-gray-300 rounded-md border-0 focus:opacity-80 focus:border-cyan-600 focus:border"
        )}
        {...props}
      />
    </View>
  )
);

export { Input };
