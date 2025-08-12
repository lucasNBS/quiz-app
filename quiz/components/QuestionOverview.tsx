import { DefaultTheme } from "@/style/theme";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type QuestionOverviewProps = {
  correct: boolean;
  question: string;
  answer: string;
  correctAnswer: string;
};

export function QuestionOverview({
  correct,
  question,
  answer,
  correctAnswer,
}: QuestionOverviewProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={[style.container, correct ? style.correct : style.wrong]}>
      <Pressable onPress={() => setIsOpen((pre) => !pre)}>
        <Text style={style.title}>{question}</Text>
      </Pressable>
      {isOpen ? (
        <>
          <View>
            <Text style={style.textTitle}>Sua Resposta</Text>
            <Text style={style.text}>{answer}</Text>
          </View>
          <View>
            <Text style={style.textTitle}>Resposta Correta</Text>
            <Text style={style.text}>{correctAnswer}</Text>
          </View>
        </>
      ) : null}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: DefaultTheme.DARK_400,
    padding: 20,
    borderRadius: 8,
    gap: 8,
  },
  correct: {
    borderWidth: 2,
    borderColor: DefaultTheme.PRIMARY,
  },
  wrong: {
    borderWidth: 2,
    borderColor: DefaultTheme.RED,
  },
  title: {
    fontSize: 20,
    color: DefaultTheme.LIGHT_100,
    fontWeight: "bold",
  },
  textTitle: {
    color: DefaultTheme.LIGHT_100,
    fontSize: 14,
    fontWeight: "bold",
  },
  text: {
    color: DefaultTheme.LIGHT_300,
  },
});
