import { DefaultTheme } from "@/style/theme";
import he from "he";
import { Pressable, StyleSheet, Text } from "react-native";

type OptionProps = {
  text: string;
  selected: boolean;
  onPress: (option: string) => void;
};

export function Option({ text, selected, onPress }: OptionProps) {
  return (
    <Pressable
      style={[styles.option, selected ? styles.selectedOption : null]}
      onPress={() => onPress(text)}
    >
      <Text
        style={[styles.optionText, selected ? styles.selectedOptionText : null]}
      >
        {he.decode(text)}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    width: "100%",
    backgroundColor: DefaultTheme.DARK_400,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderColor: DefaultTheme.LIGHT_300,
    borderWidth: 2,
  },
  selectedOption: {
    borderColor: DefaultTheme.PRIMARY,
    backgroundColor: DefaultTheme.PRIMARY,
  },
  optionText: {
    color: DefaultTheme.LIGHT_100,
    fontSize: 14,
  },
  selectedOptionText: {
    fontWeight: "bold",
  },
});
