import { DifficultyType } from "@/@types/quiz";
import { DefaultTheme } from "@/style/theme";
import { StyleSheet, Text, View } from "react-native";

type DifficultyProps = {
  difficulty: DifficultyType;
};

export function Difficulty({ difficulty }: DifficultyProps) {
  return (
    <View style={[style.container, style[difficulty]]}>
      <Text style={style.text}>{difficulty}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  easy: {
    backgroundColor: "#5adf0d",
  },
  medium: {
    backgroundColor: "#dfd10d",
  },
  hard: {
    backgroundColor: "#df0d0d",
  },
  text: {
    textAlign: "center",
    color: DefaultTheme.LIGHT_100,
    fontSize: 14,
  },
});
