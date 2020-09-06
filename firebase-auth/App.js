import React, { useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import SignUpForm from "./components/SignUpForm";
import SignInForm from "./components/SingInForm";
import firebase from "firebase";

export default function App() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyB5d7psGF682kD9KXjVefuPbEBHYX991HE",
      authDomain: "one-time-password-904d2.firebaseapp.com",
      databaseURL: "https://one-time-password-904d2.firebaseio.com",
      projectId: "one-time-password-904d2",
      storageBucket: "one-time-password-904d2.appspot.com",
      messagingSenderId: "260281504654",
      appId: "1:260281504654:web:14c87a8c79194a76108adf",
      measurementId: "G-KNVHG5HPR1",
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }, []);
  return (
    <SafeAreaView
      style={{ justifyContent: "center", flex: 1, overflow: "scroll" }}
    >
      <ScrollView>
        <SignUpForm />
        <SignInForm />
      </ScrollView>
    </SafeAreaView>
  );
}
