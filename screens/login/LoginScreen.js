import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
//import * as WebBrowser from 'expo-web-browser';
//import { FIREBASE_AUTH } from '../../firebase';
 
//Components
import RegisterOption from './RegisterOption';
import LoginOption from './LoginOption';

export default function LoginScreen() {
  const [chooseRegsiter, setChooseRegister] = useState(false);
  const [user, setUser] = useState(null);
 
  function changeToRegister() {
    setChooseRegister(true);
  }

  function changeToLogin() {
    setChooseRegister(false);
  }

  function loginGoogle() {
    promptAsync();
  }

  return (
    <View style={styles.container}>
      <LoginOption/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#222831"
  },
})