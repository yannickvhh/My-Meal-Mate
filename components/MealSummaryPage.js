import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";


/*
  Expects weeklyPlan: { Mon: [mealObj,null,..], Tue: [...], ... }
  Renders cards per day and a compact summary at the bottom.
*/

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function MealSummaryPage({ user, weeklyPlan, goBack }) {
  if (!weeklyPlan) {
    return (
      <View style={styles.empty}>
        <Text style={styles.title}>No plan saved</Text>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const totalWeekCalories = DAYS.reduce((sum, d) => {
    const arr = weeklyPlan[d] || [];
    return sum + arr.reduce((s, m) => s + (m?.calories || 0), 0);
  }, 0);

  // helper to render image from local require or URI string
  const imageSource = (m) => {
    if (!m) return null;
    const img = m.image;
    if (!img) return null;
    // if img is a number (local require), return it directly
    if (typeof img === "number") return img;
    // else assume it's a URI string
    return { uri: img };
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weekly Meal Plan Summary</Text>
      <Text style={styles.subtitle}>Overview of your selected meals for each day</Text>

      {DAYS.map((d) => {
        const meals = weeklyPlan[d] || [];
        const dayTotal = meals.reduce((s, m) => s + (m?.calories || 0), 0);
        return (
          <View key={d} style={styles.dayCard}>
            <View style={styles.dayHeader}>
              <Text style={styles.dayTitle}>{d}</Text>
              <Text style={styles.dayTotal}>{dayTotal} kcal</Text>
            </View>

            <View style={styles.mealsRow}>
              {meals.map((m, i) => {
                const src = imageSource(m);
                return (
                  <View key={i} style={styles.mealCard}>
                    {src ? (
                      <Image source={src} style={styles.image} />
                    ) : (
                      <View style={[styles.image, { backgroundColor: "#f1f5f6" }]} />
                    )}
                    <Text style={styles.mealName} numberOfLines={2}>
                      {m?.name || "—"}
                    </Text>
                    <Text style={styles.mealCal}>{m?.calories ? `${m.calories} kcal` : ""}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        );
      })}

      <View style={styles.weekSummary}>
        <Text style={styles.weekSummaryText}>Total week calories: {totalWeekCalories} kcal</Text>
        <Text style={styles.weekSummarySub}>Avg per day: {Math.round(totalWeekCalories / 7)} kcal</Text>
      </View>

      <TouchableOpacity style={styles.finishButton} onPress={goBack}>
        <Text style={styles.finishText}>Done — Return Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: "#eef2f5", flexGrow: 1 },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "800", color: "#2ecc71", textAlign: "center", marginBottom: 6 },
  subtitle: { textAlign: "center", color: "#555", marginBottom: 14 },

  dayCard: { backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 12 },
  dayHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  dayTitle: { fontSize: 18, fontWeight: "800" },
  dayTotal: { fontSize: 16, fontWeight: "700", color: "#27ae60" },

  mealsRow: { flexDirection: "row", justifyContent: "space-between" },
  mealCard: { width: "24%", alignItems: "center" },
  image: { width: 70, height: 70, borderRadius: 8, marginBottom: 6, resizeMode: "cover" },
  mealName: { fontSize: 12, fontWeight: "700", textAlign: "center" },
  mealCal: { color: "#666", fontSize: 12 },

  weekSummary: { marginTop: 12, padding: 12, backgroundColor: "#fff", borderRadius: 10, alignItems: "center" },
  weekSummaryText: { fontWeight: "800", color: "#2c3e50" },
  weekSummarySub: { color: "#666", marginTop: 4 },

  finishButton: { marginTop: 16, backgroundColor: "#2ecc71", padding: 14, borderRadius: 10, alignItems: "center" },
  finishText: { color: "#fff", fontWeight: "800" },
  button: { marginTop: 12, backgroundColor: "#2ecc71", padding: 12, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "700" },
});
