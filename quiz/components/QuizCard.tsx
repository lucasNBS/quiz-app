import { Question } from "@/@types/quiz";
import { useQuiz } from "@/hooks/useQuiz";
import { DefaultTheme } from "@/style/theme";
import { useRouter } from "expo-router";
import he from "he";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Difficulty } from "./Difficulty";

type QuizCardProps = {
  category: string;
  difficulty: "easy" | "medium" | "hard";
  correctQuestions: number;
  totalQuestions: number;
  data: string[];
  quiz: Question[];
};

export function QuizCard({
  category,
  difficulty,
  totalQuestions,
  correctQuestions,
  data,
  quiz,
}: QuizCardProps) {
  const router = useRouter();
  const { setData, setQuiz, setAlreadyCreated } = useQuiz();

  return (
    <Pressable
      style={style.container}
      onPress={() => {
        setData(data);
        setQuiz(quiz);
        setAlreadyCreated(true);
        router.push("/overview");
      }}
    >
      <Text style={style.text}>{he.decode(category)}</Text>
      <View style={style.bottom}>
        <Difficulty difficulty={difficulty} />
        <Text style={style.text}>
          {correctQuestions}/{totalQuestions}
        </Text>
      </View>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: DefaultTheme.DARK_400,
    padding: 20,
    borderRadius: 8,
    gap: 12,
  },
  text: {
    color: DefaultTheme.LIGHT_100,
    fontSize: 16,
    fontWeight: "bold",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
