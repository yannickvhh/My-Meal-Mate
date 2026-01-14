import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import WelcomePage from "./components/WelcomePage.js";
import RegisterPage from "./components/RegisterPage.js";
import HomePage from "./components/HomePage.js";
import BMICalcPage from "./components/BMICalcPage.js";
import MealSelectionPage from "./components/MealSelectionPage.js";
import MealSummaryPage from "./components/MealSummaryPage.js";
import EditProfilePage from "./components/EditProfilePage.js";
import CircleProgress from "./components/CircleProgress.js";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("Welcome");
  const [user, setUser] = useState(null);
  const [savedLogin, setSavedLogin] = useState({ email: "", password: "" });
  const [weeklyPlan, setWeeklyPlan] = useState(null); // { Mon: [...], Tue: [...], ... }

  // Load saved data on launch
  useEffect(() => {
    const load = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const storedLogin = await AsyncStorage.getItem("login");
        const storedPlan = await AsyncStorage.getItem("mealPlanWeek");
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedLogin) setSavedLogin(JSON.parse(storedLogin));
        if (storedPlan) setWeeklyPlan(JSON.parse(storedPlan));
      } catch (e) {
        console.log("Load error", e);
      }
    };
    load();
  }, []);

  // Sign in
  const handleSignIn = (email, password) => {
    if (!user) {
      alert("No account found. Please register.");
      return;
    }
    if (email === user.email && password === user.password) {
      setCurrentScreen("Home");
    } else {
      alert("Incorrect credentials");
    }
  };

  // Register
  const handleRegister = async (profile) => {
    setUser(profile);
    setCurrentScreen("Home");
    try {
      await AsyncStorage.setItem("user", JSON.stringify(profile));
      await AsyncStorage.setItem("login", JSON.stringify({ email: profile.email, password: profile.password }));
    } catch (e) {
      console.log("Save user error", e);
    }
  };

  // Update user and persist
  const handleUpdateUser = async (changes) => {
    const updated = { ...user, ...changes };
    setUser(updated);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(updated));
    } catch (e) {
      console.log("Update user error", e);
    }
  };

  // Save weekly meal plan
  const handleSaveMealPlan = async (plan) => {
    setWeeklyPlan(plan);
    try {
      await AsyncStorage.setItem("mealPlanWeek", JSON.stringify(plan));
      // update user's totalCalories for today (simple sum of today)
      // We'll set totalCalories as sum of today (Mon as default). The Home's ring will use today's day.
      const today = new Date();
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const todayKey = days[today.getDay()];
      const todaysMeals = plan[todayKey] || [];
      const total = todaysMeals.reduce((s, m) => s + (m?.calories || 0), 0);
      await handleUpdateUser({ totalCalories: total });
    } catch (e) {
      console.log("Save plan error", e);
    }
  };

  const handleLogout = () => {
    setCurrentScreen("Welcome");
  };

  return (
    <>
      {currentScreen === "Welcome" && (
        <WelcomePage
          onSignIn={handleSignIn}
          goToRegister={() => setCurrentScreen("Register")}
          savedLogin={savedLogin}
        />
      )}

      {currentScreen === "Register" && (
        <RegisterPage onRegister={handleRegister} goBack={() => setCurrentScreen("Welcome")} />
      )}

      {currentScreen === "Home" && user && (
        <HomePage
          user={user}
          goToBMI={() => setCurrentScreen("BMI")}
          goToMeals={() => setCurrentScreen("Meals")}
          onLogout={handleLogout}
          onEditProfile={() => setCurrentScreen("EditProfile")}
          goToSummary={() => setCurrentScreen("MealSummary")}
        />
      )}

      {currentScreen === "BMI" && user && (
        <BMICalcPage user={user} goBack={() => setCurrentScreen("Home")} onUpdateUser={handleUpdateUser} />
      )}

      {currentScreen === "Meals" && user && (
        <MealSelectionPage
          user={user}
          existingPlan={weeklyPlan}
          saveWeek={(plan) => {
            handleSaveMealPlan(plan);
            setCurrentScreen("MealSummary");
          }}
          goBack={() => setCurrentScreen("Home")}
        />
      )}

      {currentScreen === "MealSummary" && user && (
        <MealSummaryPage user={user} weeklyPlan={weeklyPlan} goBack={() => setCurrentScreen("Home")} />
      )}

      {currentScreen === "EditProfile" && user && (
        <EditProfilePage user={user} goBack={() => setCurrentScreen("Home")} onUpdateUser={handleUpdateUser} />
      )}
    </>
  );
}
