import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function CircleProgress({ size = 200, strokeWidth = 16, progress = 0, total = 2000 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = total === 0 ? 0 : progress / total;
  const strokeDashoffset = circumference * (1 - percentage);

  return (
    <View style={styles.wrapper}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#dfe6e9"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke="#2ecc71"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>

      <View style={styles.centerTextContainer}>
        <Text style={styles.textMain}>{progress}</Text>
        <Text style={styles.textSub}>/ {total} kcal</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  centerTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  textMain: { fontSize: 32, fontWeight: "800", color: "#2c3e50" },
  textSub: { fontSize: 16, color: "#7f8c8d", marginTop: -4 },
});
