import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function WelcomePage({ onSignIn, goToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const trySignIn = () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }
    onSignIn(email.trim().toLowerCase(), password);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>MyMealMate</Text>
        <Text style={styles.subtitle}>Smart nutrition for a better you</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={trySignIn}>
          <Text style={styles.buttonPrimaryText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.link}>Create an account</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Eat better • Feel better • Live better</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef2f5",
    justifyContent: "center",
    padding: 25,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    textAlign: "center",
    color: "#2ecc71",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: "#555",
    marginBottom: 22,
  },
  input: {
    backgroundColor: "#f7fafc",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d3d8de",
    padding: 14,
    marginBottom: 14,
  },
  buttonPrimary: {
    backgroundColor: "#2ecc71",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  buttonPrimaryText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  link: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    color: "#3498db",
  },
  footerText: {
    marginTop: 16,
    textAlign: "center",
    color: "#7c8a96",
    fontSize: 13,
  },
});
