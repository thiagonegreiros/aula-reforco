import { forwardRef } from "react";
import { Text, TextInput, View } from "react-native";

import { cn } from "../lib/utils";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
  errorMessage?: string | null;
}

//TODO:Future improvement put icon for error message
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  (
    {
      className,
      label,
      labelClasses,
      inputClasses,
      errorMessage = null,
      ...props
    },
    ref
  ) => (
    <View className={cn("flex flex-col gap-2", className)}>
      {label && <Text className={cn(labelClasses)}>{label}</Text>}
      <TextInput
        className={cn(
          inputClasses,
          errorMessage && "invalid:border invalid:border-red-500",
          "h-14 px-4 text-md text-gray-800s bg-gray-300 rounded-md border-0 focus:opacity-80 focus:border-cyan-600 focus:border"
        )}
        {...props}
      />

      {!!errorMessage && <Text className="text-red-600">{errorMessage}</Text>}
    </View>
  )
);

export { Input };
