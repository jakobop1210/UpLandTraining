import { StyleSheet, TextInput, View, Text } from 'react-native';
import React, { useState, useRef } from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseAuth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ActivityIndicator } from 'react-native-paper';

// Components
import PurpleFadedButton from '../../buttons/PurpleFadedButton';
import GotoSignUpButton from '../../buttons/GotoSignUpButton';

export default function RegisterOption({ changeToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleRegister = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) {
        alert("The passwords don't match!");
        return;
      }
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;
      await updateProfile(user, { displayName: name });
      alert("User successfully created");
    } catch (error) {
      alert('Register failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleNext = (ref) => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <View style={styles.registerView}>
      <Text style={styles.registerHeader}>Create Account</Text>
      <Text style={styles.registerInformationText}>Please fill in the information below</Text>
      <View style={styles.inputView}>
        <Ionicons name="person-add-outline" color="#BBB" size={24} />
        <TextInput
          placeholder="Name"
          placeholderTextColor="#888"
          autoCapitalize="none"
          onChangeText={setName}
          value={name}
          onSubmitEditing={() => handleNext(emailRef)}
          returnKeyType="next"
          style={styles.input}
        />
      </View>
      <View style={styles.inputView}>
        <Ionicons name="ios-mail-outline" color="#BBB" size={24} />
        <TextInput
          ref={emailRef}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#888"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
          onSubmitEditing={() => handleNext(passwordRef)}
          returnKeyType="next"
          style={styles.input}
        />
      </View>
      <View style={styles.inputView}>
        <MaterialCommunityIcons name="account-key-outline" color="#AAA" size={24} />
        <TextInput
          ref={passwordRef}
          placeholder="Password"
          placeholderTextColor="#888"
          autoCapitalize="none"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          onSubmitEditing={() => handleNext(confirmPasswordRef)}
          returnKeyType="next"
          style={styles.input}
        />
      </View>
      <View style={styles.inputView}>
        <MaterialCommunityIcons name="account-key-outline" color="#AAA" size={24} />
        <TextInput
          ref={confirmPasswordRef}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          autoCapitalize="none"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          style={styles.input}
        />
      </View>
      <View style={styles.registerButtonView}>
        {loading
          ? <ActivityIndicator size="large" color="#F0EBD8" />
          : <PurpleFadedButton
            title="Register Account"
            onClick={handleRegister}
            buttonWidth="100%"
            buttonHeight={50}
            startGradient={[1, 0]}
            endGradient={[0, 1]}
          />
        }
      </View>
      <View style={styles.gotoLoginView}>
        <Text style={styles.alreadyHaveAccountText}>Already have an account?</Text>
        <GotoSignUpButton onClick={changeToLogin} title="LOGIN" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  registerView: {
    width: "70%",
    height: "60%",
  },
  registerHeader: {
    color: "#F0EBD8",
    fontSize: 35,
    fontWeight: "300",
    marginBottom: 5
  },
  registerInformationText: {
    color: "#999",
    fontSize: 12,
    marginLeft: 2
  },
  inputView: {
    width: '100%',
    height: 60,
    marginTop: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    width: "90%",
    height: "100%",
    paddingHorizontal: 10,
    color: "#F0EBD8",
    fontSize: 18,
  },
  registerButtonView: {
    height: 140,
    justifyContent: "center"
  },
  gotoLoginView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  alreadyHaveAccountText: {
    color: "#CCC",
    fontSize: 15,
  }
});
