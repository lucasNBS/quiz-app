import { Question } from "@/@types/quiz";
import { QuizCard } from "@/components/QuizCard";
import { LOCALHOST } from "@/constants";
import { api } from "@/lib/api";
import { DefaultTheme } from "@/style/theme";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type QuizItemType = {
  id: number;
  quiz: Question[];
  answers: string[];
};

export default function History() {
  const [data, setData] = useState([] as QuizItemType[]);

  useEffect(() => {
    const getData = async () => {
      const res = await api.get(`http://${LOCALHOST}:8000/api/quiz/`);
      const data = res.data.quizzes.map(
        (quiz: { id: number; quiz: string; answers: string }) => {
          return {
            id: quiz.id,
            quiz: JSON.parse(quiz.quiz),
            answers: JSON.parse(quiz.answers),
          };
        }
      );
      setData(data);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={style.background}>
      <View style={style.content}>
        {data.length > 0 ? (
          <FlatList
            // style={{ height: 708 }}
            showsVerticalScrollIndicator={false}
            data={data}
            ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
            renderItem={({ item }) => {
              return (
                <QuizCard
                  key={item.id}
                  data={item.answers}
                  quiz={item.quiz}
                  category={item.quiz[0].category}
                  difficulty={item.quiz[0].difficulty}
                  correctQuestions={item.quiz.reduce((total, quiz, index) => {
                    if (quiz.correct_answer === item.answers[index]) {
                      return total + 1;
                    }
                    return total;
                  }, 0)}
                  totalQuestions={item.quiz.length}
                />
              );
            }}
          />
        ) : (
          <View style={style.container}>
            <ActivityIndicator size={"large"} color={DefaultTheme.PRIMARY} />
          </View>
        )}
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
    paddingVertical: 32,
  },
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
