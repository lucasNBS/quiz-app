import { DefaultTheme } from "@/style/theme";
import { Control, FieldValues, Path, UseFormSetValue } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type InputProps<T extends FieldValues> = TextInputProps & {
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  control: Control<T>;
};

export function Input<T extends FieldValues>(props: InputProps<T>) {
  return (
    <TextInput
      {...props}
      onChangeText={(value) => props.setValue(props.name, value as any)}
      style={styles.input}
      placeholderTextColor={DefaultTheme.LIGHT_300}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: DefaultTheme.DARK_400,
    color: DefaultTheme.LIGHT_100,
    borderWidth: 1,
    borderColor: DefaultTheme.LIGHT_300,
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
  },
});
