import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

export default function EditProfilePage({ user, goBack, onUpdateUser }) {
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState(user.password || "");
  const [confirmPassword, setConfirmPassword] = useState(user.password || "");
  const [age, setAge] = useState(user.age?.toString() || "");
  const [gender, setGender] = useState(user.gender || "");
  const [height, setHeight] = useState(user.height?.toString() || "");
  const [weight, setWeight] = useState(user.weight?.toString() || "");
  const [bmi, setBmi] = useState(user.bmi || null);
  const [bmr, setBmr] = useState(user.bmr || null);

  // Recalculate BMI + BMR automatically
  useEffect(() => {
    if (height && weight) {
      const h = Number(height) / 100;
      const w = Number(weight);
      const calculatedBMI = (w / (h * h)).toFixed(1);
      setBmi(calculatedBMI);

      let calculatedBMR = null;
      if (gender === "male") calculatedBMR = 88.362 + 13.397 * w + 4.799 * Number(height) - 5.677 * Number(age);
      if (gender === "female") calculatedBMR = 447.593 + 9.247 * w + 3.098 * Number(height) - 4.330 * Number(age);

      setBmr(calculatedBMR ? Math.round(calculatedBMR) : null);
    }
  }, [height, weight, age, gender]);

  const saveChanges = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    onUpdateUser({
      name,
      email,
      password,
      age: age ? Number(age) : null,
      gender,
      height: height ? Number(height) : null,
      weight: weight ? Number(weight) : null,
      bmi,
      bmr,
    });

    alert("Profile updated successfully!");
    goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Edit Profile</Text>

      {/* PERSONAL INFO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#7f8c8d" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#7f8c8d" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#7f8c8d" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#7f8c8d" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      </View>

      {/* HEALTH INFO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Health Information</Text>

        <TextInput style={styles.input} placeholder="Age" placeholderTextColor="#7f8c8d" keyboardType="numeric" value={age} onChangeText={setAge} />
        <TextInput style={styles.input} placeholder="Gender (male/female)" placeholderTextColor="#7f8c8d" value={gender} onChangeText={setGender} />
        <TextInput style={styles.input} placeholder="Height (cm)" placeholderTextColor="#7f8c8d" keyboardType="numeric" value={height} onChangeText={setHeight} />
        <TextInput style={styles.input} placeholder="Weight (kg)" placeholderTextColor="#7f8c8d" keyboardType="numeric" value={weight} onChangeText={setWeight} />

        {bmi && <Text style={styles.infoText}>BMI: {bmi}</Text>}
        {bmr && <Text style={styles.infoText}>BMR: {bmr} kcal/day</Text>}
      </View>

      <TouchableOpacity style={styles.buttonPrimary} onPress={saveChanges}>
        <Text style={styles.buttonPrimaryText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={goBack}>
        <Text style={styles.backText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 22, backgroundColor: "#eef2f5" },
  pageTitle: { fontSize: 32, fontWeight: "800", color: "#2ecc71", textAlign: "center", marginBottom: 18 },
  card: { backgroundColor: "#fff", borderRadius: 14, padding: 18, marginBottom: 18, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 10, elevation: 3 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12, color: "#2c3e50" },
  input: { backgroundColor: "#f8fafc", borderWidth: 1, borderColor: "#ccd2d8", borderRadius: 10, padding: 12, marginBottom: 12 },
  infoText: { fontSize: 16, fontWeight: "600", color: "#2ecc71", marginTop: 4 },
  buttonPrimary: { backgroundColor: "#2ecc71", paddingVertical: 15, borderRadius: 12, alignItems: "center", marginTop: 10 },
  buttonPrimaryText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  backText: { textAlign: "center", marginTop: 16, color: "#3498db", fontSize: 16, fontWeight: "600" },
});
