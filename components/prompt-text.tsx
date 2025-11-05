import React from "react";
import { TextInput, TextInputProps } from "react-native";

type PromptTextProps = {
  value: string;
  onChangeText: (text: string) => void;
} & TextInputProps;

export default function PromptText({ value, onChangeText, ...rest }: PromptTextProps) {
  return (
    <TextInput
      placeholder="Escribe tu pregunta..."
      placeholderTextColor="#aaa"
      value={value}
      onChangeText={onChangeText}
      className="border border-gray-400 rounded-lg p-3 text-white bg-neutral-900"
      multiline
      {...rest}
    />
  );
}
