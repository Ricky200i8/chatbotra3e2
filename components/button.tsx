import React from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

type ButtonProps = {
  isLoading?: boolean;
  onPress: () => void;
  title?: string;
};

export default function Button({ isLoading = false, onPress, title = "Enviar" }: ButtonProps) {
  return (
    <TouchableOpacity
      className="bg-blue-600 p-3 rounded-lg mt-3 items-center"
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white font-bold">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
