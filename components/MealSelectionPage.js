import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";


/*
  Week planner:
  - Days: Mon, Tue, Wed, Thu, Fri, Sat, Sun
  - Each day has 4 categories: Breakfast, Lunch, Dinner, Snack
  - User picks one meal per category per day
  - existingPlan can prefill selections
  - saveWeek(plan) saves the full plan and navigates to summary
*/

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Snack"];

const SAMPLE_MEALS = {
  Breakfast: [
    { name: "Oatmeal + Banana", calories: 350, image: require("../assets/OatmealBanana.jpg") },
    { name: "Yogurt + Berries", calories: 300, image: require("../assets/YogurtBerries.jpg") },
    { name: "Eggs & Toast", calories: 400, image: require("../assets/EggsToast.jpg") },
  ],
  Lunch: [
    { name: "Grilled Chicken Salad", calories: 500, image: require("../assets/ChickenSalad.jpg") },
    { name: "Veggie Wrap", calories: 550, image: require("../assets/VeggieWrap.jpg") },
    { name: "Rice & Tofu", calories: 600, image: require("../assets/RiceTofu.jpg") },
  ],
  Dinner: [
    { name: "Salmon & Veggies", calories: 600, image: require("../assets/SalmonVeggie.jpg") },
    { name: "Pasta & Sauce", calories: 700, image: require("../assets/PastaSauce.jpg") },
    { name: "Stir-fry & Rice", calories: 650, image: require("../assets/StirFryRice.jpg") },
  ],
  Snack: [
    { name: "Apple + PB", calories: 200, image: require("../assets/ApplePB.jpg") },
    { name: "Mixed Nuts", calories: 250, image: require("../assets/MixedNuts.jpg") },
    { name: "Protein Bar", calories: 220, image: require("../assets/ProteinBar.jpg") },
  ],
};


export default function MealSelectionPage({ user, existingPlan, saveWeek, goBack }) {
  // plan structure: { Mon: [mealObj, mealObj, mealObj, mealObj], ... }
  const [plan, setPlan] = useState(() => {
    const initial = {};
    DAYS.forEach((d) => {
      initial[d] = CATEGORIES.map(() => null);
      if (existingPlan && existingPlan[d]) {
        // copy existing if present
        initial[d] = existingPlan[d].slice(0, CATEGORIES.length);
      }
    });
    return initial;
  });

  const [selectedDayIdx, setSelectedDayIdx] = useState(0); // default Mon
  const selectedDayKey = DAYS[selectedDayIdx];

  useEffect(() => {
    // If you want to update a parent's totalCalories live, you could call a callback here.
  }, [plan, selectedDayKey]);

  const pickMeal = (categoryIdx, mealObj) => {
    setPlan((prev) => {
      const copy = { ...prev };
      const dayArr = [...copy[selectedDayKey]];
      dayArr[categoryIdx] = mealObj;
      copy[selectedDayKey] = dayArr;
      return copy;
    });
  };

  const clearDay = (dayKey) => {
    setPlan((prev) => {
      const copy = { ...prev };
      copy[dayKey] = CATEGORIES.map(() => null);
      return copy;
    });
  };

  const saveAndFinish = () => {
    saveWeek(plan);
  };

  const renderCategory = (cat, idx) => {
    const options = SAMPLE_MEALS[cat];
    const chosen = plan[selectedDayKey][idx];
    return (
      <View key={cat} style={styles.categoryBlock}>
        <Text style={styles.catTitle}>{cat}</Text>
        <View style={styles.optionsRow}>
          {options.map((opt, i) => {
            const isSelected = chosen && chosen.name === opt.name;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => pickMeal(idx, opt)}
                style={[styles.optionCard, isSelected && styles.optionSelected]}
              >
                <Text style={styles.optionName}>{opt.name}</Text>
                <Text style={styles.optionCal}>{opt.calories} kcal</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const totalForDay = (dayKey) => (plan[dayKey] || []).reduce((s, m) => s + (m?.calories || 0), 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weekly Meal Planner</Text>

      {/* Day selector */}
      <View style={styles.dayRow}>
        {DAYS.map((d, i) => (
          <TouchableOpacity
            key={d}
            style={[styles.dayButton, selectedDayIdx === i && styles.dayButtonActive]}
            onPress={() => setSelectedDayIdx(i)}
          >
            <Text style={[styles.dayText, selectedDayIdx === i && styles.dayTextActive]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.dayHeader}>
        <Text style={styles.dayHeaderText}>
          {selectedDayKey} • Total: {totalForDay(selectedDayKey)} kcal
        </Text>
        <TouchableOpacity onPress={() => clearDay(selectedDayKey)}>
          <Text style={styles.clearText}>Clear day</Text>
        </TouchableOpacity>
      </View>

      {/* categories for selected day */}
      {CATEGORIES.map((c, idx) => renderCategory(c, idx))}

      <View style={{ height: 18 }} />

      {/* Quick week overview */}
      <View style={styles.weekOverview}>
        <Text style={styles.ovTitle}>Week overview</Text>
        {DAYS.map((d) => (
          <View key={d} style={styles.ovRow}>
            <Text style={styles.ovDay}>{d}</Text>
            <Text style={styles.ovCal}>{totalForDay(d)} kcal</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveAndFinish}>
        <Text style={styles.saveText}>Save Week & View Summary</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={goBack}>
        <Text style={styles.cancelText}>Cancel & Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18, backgroundColor: "#eef2f5", flexGrow: 1 },
  title: { fontSize: 26, fontWeight: "800", color: "#2ecc71", textAlign: "center", marginBottom: 10 },
  dayRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 10 },
  dayButton: { padding: 8, borderRadius: 8, width: 44, alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#e6eef0" },
  dayButtonActive: { backgroundColor: "#2ecc71" },
  dayText: { color: "#333", fontWeight: "700" },
  dayTextActive: { color: "#fff" },

  dayHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  dayHeaderText: { fontSize: 16, fontWeight: "700" },
  clearText: { color: "#e74c3c", fontWeight: "700" },

  categoryBlock: { marginBottom: 12, backgroundColor: "#fff", padding: 12, borderRadius: 10 },
  catTitle: { fontSize: 16, fontWeight: "700", marginBottom: 8 },
  optionsRow: { flexDirection: "row", justifyContent: "space-between" },
  optionCard: { flex: 1, borderWidth: 1, borderColor: "#e6eef0", padding: 10, marginHorizontal: 4, borderRadius: 8, backgroundColor: "#fbfcfd", alignItems: "center" },
  optionSelected: { borderColor: "#27ae60", backgroundColor: "#ecfdf1" },
  optionName: { fontWeight: "700", textAlign: "center", marginBottom: 6 },
  optionCal: { color: "#666" },

  weekOverview: { marginTop: 10, backgroundColor: "#fff", padding: 12, borderRadius: 10 },
  ovTitle: { fontWeight: "800", marginBottom: 8 },
  ovRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  ovDay: { fontWeight: "700" },
  ovCal: { color: "#27ae60", fontWeight: "700" },

  saveButton: { marginTop: 14, backgroundColor: "#27ae60", padding: 14, borderRadius: 10, alignItems: "center" },
  saveText: { color: "#fff", fontWeight: "800" },
  cancelButton: { marginTop: 8, alignItems: "center" },
  cancelText: { color: "#3498db", fontWeight: "700" },
});
