import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import CircleProgress from "./CircleProgress";

export default function HomePage({ user, goToBMI, goToMeals, onLogout, onEditProfile }) {
  
  const totalCalories = user.totalCalories || 0;
  const calorieGoal = user.calorieGoal || user.bmr || 2000;  // FIXED HERE

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome, {user.name} 👋</Text>
      <Text style={styles.subtitle}>Your daily nutrition dashboard</Text>

      <View style={styles.ringContainer}>
        <CircleProgress progress={totalCalories} total={calorieGoal} />
      </View>

      <View style={styles.cardRow}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>BMI</Text>
          <Text style={styles.cardValue}>{user.bmi || "--"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>BMR</Text>
          <Text style={styles.cardValue}>{user.bmr ? `${user.bmr} kcal` : "--"}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Goal</Text>
          <Text style={styles.cardValue}>{calorieGoal} kcal</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={goToMeals}>
        <Text style={styles.buttonText}>Weekly Meal Planner</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToBMI}>
        <Text style={styles.buttonText}>Calculate BMI & BMR</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={onEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#eef2f5", alignItems: "center" },
  title: { fontSize: 32, fontWeight: "800", color: "#2ECC71", marginTop: 10 },
  subtitle: { fontSize: 16, color: "#555", marginBottom: 20 },
  ringContainer: { marginVertical: 15, alignItems: "center" },

  cardRow: { flexDirection: "row", width: "100%", justifyContent: "space-between", marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 15, borderRadius: 12, width: "30%", alignItems: "center" },
  cardTitle: { color: "#666", fontSize: 14, fontWeight: "600" },
  cardValue: { fontSize: 20, fontWeight: "800", color: "#2ecc71", marginTop: 4 },

  button: { backgroundColor: "#27ae60", width: "100%", padding: 14, borderRadius: 12, alignItems: "center", marginBottom: 10 },
  buttonText: { color: "white", fontSize: 18, fontWeight: "800" },

  logoutButton: { backgroundColor: "#e74c3c", width: "100%", padding: 14, borderRadius: 12, alignItems: "center", marginTop: 10 },
  logoutText: { color: "#fff", fontSize: 18, fontWeight: "800" },
});
