import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function RegisterPage({ goBack, onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please complete required fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const profile = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      age: age ? Number(age) : null,
      gender: gender.trim().toLowerCase(),
      height: height ? Number(height) : null,
      weight: weight ? Number(weight) : null,
      bmi: null,
      bmr: null,
      calorieGoal: null,
    };

    onRegister(profile);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#7f8c8d"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#7f8c8d"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#7f8c8d"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#7f8c8d"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <Text style={styles.sectionHeader}>Health Info (Optional)</Text>

        <TextInput
          style={styles.input}
          placeholder="Age"
          placeholderTextColor="#7f8c8d"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <TextInput
          style={styles.input}
          placeholder="Gender (male/female)"
          placeholderTextColor="#7f8c8d"
          value={gender}
          onChangeText={setGender}
        />

        <TextInput
          style={styles.input}
          placeholder="Height (cm)"
          placeholderTextColor="#7f8c8d"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
        />

        <TextInput
          style={styles.input}
          placeholder="Weight (kg)"
          placeholderTextColor="#7f8c8d"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={handleRegister}>
          <Text style={styles.buttonPrimaryText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", padding: 22, backgroundColor: "#eef2f5" },
  card: { backgroundColor: "#fff", padding: 22, borderRadius: 14, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  title: { fontSize: 26, fontWeight: "700", textAlign: "center", marginBottom: 16 },
  sectionHeader: { fontWeight: "700", marginTop: 16, marginBottom: 10, color: "#2c3e50" },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#ccd2d8",
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: "#2ecc71",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  buttonPrimaryText: { color: "#fff", fontSize: 18, fontWeight: "700" },
  backText: { textAlign: "center", marginTop: 16, color: "#3498db", fontSize: 15, fontWeight: "600" },
});
