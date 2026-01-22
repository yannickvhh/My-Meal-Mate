# 🥗 MyMealMate – React Native Nutrition App

MyMealMate is a React Native mobile application designed to help users understand their nutrition, calculate their daily calorie needs, and plan meals for an entire week.

This project was built as a learning project to practice React Native, state management, persistent storage, and basic health calculations (BMI, BMR, maintenance calories).

# ✨ Features

*🔐 User authentication*

Register & login system

Credentials stored locally using AsyncStorage

*👤 User profile*

Edit personal information

Automatically recalculates BMI & BMR

*📊 Health calculations*

BMI (Body Mass Index)

BMR (Basal Metabolic Rate)

Maintenance calories (TDEE) based on activity level

*🍽 Weekly meal planner*

Plan 4 meals per day (Breakfast, Lunch, Dinner, Snack)

Plan for the entire week (Mon → Sun)

Each meal includes calories and an image

*🔄 Persistent storage*

User profile, login, and weekly meal plan are saved locally

Data remains after closing the app

*🔵 Calorie progress ring*

Visual representation of calories eaten vs daily goal

# 🛠 Tech Stack

React Native

JavaScript (ES6)

AsyncStorage (local persistence)

react-native-svg (circular progress ring)

# 📁 Project Structure

App.js

components/

 ├─ WelcomePage.js
 
 ├─ RegisterPage.js
 
 ├─ HomePage.js
 
 ├─ BMICalcPage.js
 
 ├─ MealSelectionPage.js
 
 ├─ MealSummaryPage.js
 
 ├─ EditProfilePage.js
 
 └─ CircleProgress.js
 
assets/
 ├─ OatmealBanana.jpg
 
 ├─ ChickenSalad.jpg
 
 ├─ SalmonVeggie.jpg
 
 └─ ...

# 🧮 Health Calculations
*BMI*
`BMI = weight / (height²)`

*BMR (Mifflin–St Jeor)*

Male:

`10 × weight + 6.25 × height − 5 × age + 5`


*Female*:

`10 × weight + 6.25 × height − 5 × age − 161`

*Maintenance Calories (TDEE)*
`TDEE = BMR × Activity Factor`


*Activity factors:*

Sedentary: 1.2

`Light: 1.375`

`Moderate: 1.55`

`Active: 1.725`

# 🚀 How to Run the Project

*Clone the repository*

```git clone https://github.com/your-username/mymealmate.git```


*Install dependencies*

```npm install```


*Start the app*

```npx expo start```

#🎯 Learning Objectives

This project helped me practice:

React hooks (useState, useEffect)

State-driven navigation

Async/await and error handling

Local data persistence

Component-based UI design

Basic nutrition and health formulas

# 📌 Notes

This app is for educational purposes only

Health calculations are estimates and not medical advice

# 📬 Author

Developed by Yannick Van Heerden - [Yannick VHH](https://github.com/yannickvhh) - Email : yannick@van-heerden.com

Engineering Student at ECE Paris - ING3

📫 Feel free to connect with me on LinkedIn! <div class="badge-base LI-profile-badge" data-locale="fr_FR" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="yannickvanheerden" data-version="v1"><a class="badge-base__link LI-simple-link" href="https://fr.linkedin.com/in/yannickvanheerden?trk=profile-badge">Yannick V.</a></div>
              
