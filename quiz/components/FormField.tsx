import { DefaultTheme } from "@/style/theme";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

type FormFieldProps = {
  label: string;
  field: ReactNode;
  error?: string;
};

export function FormField({ label, field, error }: FormFieldProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      {field}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: DefaultTheme.LIGHT_100,
  },
  error: {
    fontSize: 12,
    color: DefaultTheme.RED,
  },
});
