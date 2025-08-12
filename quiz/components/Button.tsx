import { DefaultTheme } from "@/style/theme";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  text: string;
  active: boolean;
  onPress: () => void;
};

export function Button({ text, active, onPress }: ButtonProps) {
  return (
    <Pressable
      style={[style.container, active ? style.active : style.deactivate]}
      onPress={active ? onPress : () => {}}
    >
      <Text style={style.text}>{text}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  active: {
    backgroundColor: DefaultTheme.PRIMARY,
  },
  deactivate: {
    borderColor: DefaultTheme.LIGHT_300,
    borderWidth: 2,
  },
  text: {
    textAlign: "center",
    color: DefaultTheme.LIGHT_100,
    fontWeight: "bold",
  },
});
