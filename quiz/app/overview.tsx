import { Button } from "@/components/Button";
import { Difficulty } from "@/components/Difficulty";
import { QuestionOverview } from "@/components/QuestionOverview";
import { LOCALHOST } from "@/constants";
import { useQuiz } from "@/hooks/useQuiz";
import { api } from "@/lib/api";
import { DefaultTheme } from "@/style/theme";
import { useRouter } from "expo-router";
import he from "he";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Overview() {
  const router = useRouter();
  const { quiz, data, alreadyCreated, setAlreadyCreated } = useQuiz();

  const totalOfQuestionsCorrectlyAnswered = quiz.reduce(
    (total, item, index) => {
      if (item.correct_answer === data[index]) {
        return total + 1;
      }
      return total;
    },
    0
  );

  async function handleComplete() {
    const body = {
      quiz,
      answers: data,
    };

    if (!alreadyCreated) {
      await api.post(`http://${LOCALHOST}:8000/api/quiz/create`, body);
    }
    setAlreadyCreated(false);
    router.push("/(tabs)");
  }

  return (
    <SafeAreaView style={style.background}>
      <View style={style.content}>
        <View style={style.resultContainer}>
          <Text style={style.result}>
            {totalOfQuestionsCorrectlyAnswered}/{quiz.length}
          </Text>
        </View>
        <View style={style.details}>
          <Difficulty difficulty={quiz[0].difficulty} />
          <Text style={style.category}>{he.decode(quiz[0].category)}</Text>
        </View>
        <FlatList
          style={style.scroll}
          showsVerticalScrollIndicator={false}
          data={quiz}
          ItemSeparatorComponent={() => <View style={{ height: 12 }}></View>}
          renderItem={({ item, index }) => {
            return (
              <QuestionOverview
                question={he.decode(item.question)}
                correct={data[index] === item.correct_answer}
                answer={he.decode(data[index])}
                correctAnswer={he.decode(item.correct_answer)}
                key={index}
              />
            );
          }}
        />
        <View style={style.action}>
          <Button
            text="Voltar à Página Inicial"
            active
            onPress={handleComplete}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  background: {
    backgroundColor: DefaultTheme.DARK_900,
    flex: 1,
  },
  content: {
    width: "90%",
    marginHorizontal: "auto",
  },
  resultContainer: {
    paddingVertical: 80,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 48,
  },
  result: {
    fontSize: 64,
    color: DefaultTheme.LIGHT_100,
    fontWeight: "bold",
  },
  details: {
    paddingBottom: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  category: {
    textAlign: "center",
    fontSize: 14,
    color: DefaultTheme.LIGHT_100,
  },
  scroll: {
    height: 366,
  },
  action: {
    paddingVertical: 24,
  },
});
