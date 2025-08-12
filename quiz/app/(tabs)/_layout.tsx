import History from "@/components/icons/History";
import Question from "@/components/icons/Question";
import { DefaultTheme } from "@/style/theme";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          backgroundColor: DefaultTheme.DARK_400,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Quiz",
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
          tabBarInactiveTintColor: DefaultTheme.LIGHT_300,
          tabBarActiveTintColor: DefaultTheme.LIGHT_100,
          tabBarIcon: ({ focused }) => (
            <Question
              fill={focused ? DefaultTheme.LIGHT_100 : DefaultTheme.LIGHT_300}
              width={16}
              height={16}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Histórico",
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
          tabBarInactiveTintColor: DefaultTheme.LIGHT_300,
          tabBarActiveTintColor: DefaultTheme.LIGHT_100,
          tabBarIcon: ({ focused }) => (
            <History
              fill={focused ? DefaultTheme.LIGHT_100 : DefaultTheme.LIGHT_300}
              width={16}
              height={16}
            />
          ),
        }}
      />
    </Tabs>
  );
}
