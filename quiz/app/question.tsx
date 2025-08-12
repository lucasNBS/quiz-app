import { Button } from "@/components/Button";
import { Option } from "@/components/Option";
import { Progress } from "@/components/Progress";
import { useQuiz } from "@/hooks/useQuiz";
import { DefaultTheme } from "@/style/theme";
import { useRouter } from "expo-router";
import he from "he";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Question() {
  const router = useRouter();
  const { quiz, data, setData } = useQuiz();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const question = quiz[activeQuestion];

  console.log(question, quiz, activeQuestion);

  function handleSelectOption(option: string) {
    setSelectedOption(option);
    const newData = data;
    newData[activeQuestion] = option;
    setData(newData);
  }

  function handlePreviousQuestion() {
    setActiveQuestion((pre) => Math.max(pre - 1, 0));
    setSelectedOption(data[activeQuestion - 1]);
  }

  function handleNextQuestion() {
    if (data[activeQuestion + 1] !== "") {
      setSelectedOption(data[activeQuestion + 1]);
    } else {
      setSelectedOption("");
    }
    setActiveQuestion((pre) => Math.min(pre + 1, quiz.length - 1));
  }

  function handleFinish() {
    router.push("/overview");
    setActiveQuestion(0);
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={{ width: "100%", flex: 1 }}>
        <Progress progress={((activeQuestion + 1) / quiz.length) * 100} />
      </View>
      <View style={styles.content}>
        <Text style={styles.question}>{he.decode(question.question)}</Text>
        <View style={styles.options}>
          {question.answers.map((item, index) => {
            return (
              <Option
                text={item}
                selected={selectedOption === item}
                onPress={handleSelectOption}
                key={index}
              />
            );
          })}
        </View>
        <View style={styles.action}>
          <Button
            text="Voltar"
            onPress={handlePreviousQuestion}
            active={activeQuestion > 0}
          />
          <Button
            text={activeQuestion === quiz.length - 1 ? "Finalizar" : "Próximo"}
            onPress={
              activeQuestion === quiz.length - 1
                ? handleFinish
                : handleNextQuestion
            }
            active={activeQuestion < quiz.length && selectedOption !== ""}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: DefaultTheme.DARK_900,
    justifyContent: "space-between",
    paddingVertical: 48,
    alignItems: "center",
    flex: 1,
  },
  content: {
    flex: 6,
    width: "90%",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginHorizontal: "auto",
    gap: 48,
  },
  question: {
    textAlign: "center",
    fontSize: 24,
    color: DefaultTheme.LIGHT_100,
    fontWeight: "bold",
  },
  options: {
    width: "100%",
    display: "flex",
    gap: 16,
  },
  action: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
