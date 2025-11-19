import "@/global.css";
import Button from "@/components/button";
import PromptText from "@/components/prompt-text";
import axios from "axios";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, ScrollView, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");

  const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

  const consultarGemini = async (pregunta: string) => {
    if (!pregunta.trim()) {
      Alert.alert("Por favor escribe una pregunta");
      return;
    }

    try {
      setIsLoading(true);
      setResponse("");

      const { data } = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          contents: [{ parts: [{ text: pregunta }] }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": API_KEY,
          },
        }
      );

      const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (texto) {
        setResponse(texto);
      } else {
        Alert.alert("No se recibió respuesta del modelo");
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error al consultar Gemini", error.message || "Desconocido");
    } finally {
      setIsLoading(false);
      setValue("");
    }
  };

  return (
    <SafeAreaView className="w-screen h-screen bg-neutral-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView className="w-full h-full p-4">
          <Text className="text-slate-400 text-4xl font-bold mb-4 text-center">
            CHATBOT IA
          </Text>

          <PromptText
            onChangeText={(text) => setValue(text)}
            value={value}
          />

          <Button
            isLoading={isLoading}
            onPress={() => consultarGemini(value)}
            title="Enviar pregunta"
          />

          {response ? (
            <View className="mt-5 bg-neutral-800 rounded-xl p-4">
              <Text className="text-white font-semibold mb-2">🤖 Respuesta del chatbot:</Text>
              <Text className="text-gray-200">{response}</Text>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
