import { DefaultTheme } from "@/style/theme";
import { StyleSheet, View } from "react-native";

type ProgressProps = {
  progress: number;
};

export function Progress({ progress }: ProgressProps) {
  return (
    <View style={styles.progress}>
      <View style={{ ...styles.bar, width: `${progress}%` }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    marginHorizontal: "auto",
    position: "relative",
    backgroundColor: DefaultTheme.DARK_400,
    width: "90%",
    height: 12,
    borderRadius: 8,
  },
  bar: {
    position: "absolute",
    backgroundColor: DefaultTheme.PRIMARY,
    height: 12,
    borderRadius: 8,
    left: 0,
  },
});
