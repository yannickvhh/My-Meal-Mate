import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

/*
  Calculates BMI and BMR (Mifflin-St Jeor).
  Then computes maintenance calories (TDEE) using an activity multiplier.
*/

export default function BMICalcPage({ user, onUpdateUser, goBack }) {
  const [height, setHeight] = useState(user?.height ? String(user.height) : "");
  const [weight, setWeight] = useState(user?.weight ? String(user.weight) : "");
  const [age, setAge] = useState(user?.age ? String(user.age) : "");
  const [gender, setGender] = useState(user?.gender || "");
  const [activity, setActivity] = useState("1.2"); // default sedentary

  const compute = () => {
    const h = Number(height);
    const w = Number(weight);
    const a = Number(age);
    const g = (gender || "").toLowerCase();
    const activityFactor = Number(activity) || 1.2;

    if (!h || !w || !a || (g !== "male" && g !== "female")) {
      alert("Please provide numeric height (cm), weight (kg), age and gender (male/female).");
      return;
    }

    const bmi = w / ((h / 100) * (h / 100));
    let bmr;
    if (g === "male") {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // TDEE estimate (maintenance)
    const tdee = Math.round(bmr * activityFactor);

    onUpdateUser({
      height: h,
      weight: w,
      age: a,
      gender: g,
      bmi: Number(bmi.toFixed(1)),
      bmr: Math.round(bmr),
      calorieGoal: tdee,
    });

    alert(`Computed. BMI: ${bmi.toFixed(1)}, BMR: ${Math.round(bmr)} kcal, maintenance: ${tdee} kcal`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>BMI & Maintenance Calories</Text>

      <TextInput placeholder="Height (cm)" style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight} />
      <TextInput placeholder="Weight (kg)" style={styles.input} keyboardType="numeric" value={weight} onChangeText={setWeight} />
      <TextInput placeholder="Age (years)" style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />
      <TextInput placeholder="Gender (male / female)" style={styles.input} value={gender} onChangeText={setGender} />

      <Text style={{ marginTop: 8, marginBottom: 6, color: "#555" }}>Activity level (use factor):</Text>
      <Text style={{ color: "#444" }}>Sedentary = 1.2, Light = 1.375, Moderate = 1.55, Active = 1.725</Text>
      <TextInput placeholder="Activity factor (e.g. 1.2)" style={styles.input} keyboardType="numeric" value={activity} onChangeText={setActivity} />

      <TouchableOpacity style={styles.button} onPress={compute}>
        <Text style={styles.buttonText}>Compute Maintenance</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 12, alignItems: "center" }} onPress={goBack}>
        <Text style={{ color: "#3498db", fontWeight: "700" }}>Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: "#fff", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12, textAlign: "center" },
  input: { backgroundColor: "#f7fafc", padding: 12, marginBottom: 10, borderRadius: 8, borderWidth: 1, borderColor: "#e2e8f0" },
  button: { backgroundColor: "#2ecc71", padding: 14, borderRadius: 8, alignItems: "center", marginTop: 6 },
  buttonText: { color: "#fff", fontWeight: "700" },
});
