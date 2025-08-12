import { QuizProvider } from "@/contexts/quiz";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function TabLayout() {
  return (
    <QuizProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="overview" options={{ headerShown: false }} />
        <Stack.Screen name="question" options={{ headerShown: false }} />
      </Stack>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    </QuizProvider>
  );
}
