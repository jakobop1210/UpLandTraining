import { StyleSheet, TextInput, View, Text } from 'react-native';
import React, { useState, useRef } from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebaseAuth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ActivityIndicator } from 'react-native-paper';

// Components
import InputWithIcon from './components/InputWithIcon';
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
      <InputWithIcon 
        value={name}
        onChange={setName}
        onSubmitRef={emailRef}
        placeholder="Full Name"
        iconName="person-outline"
      />
      <InputWithIcon 
        value={email}
        onChange={setEmail}
        inputRef={emailRef}
        onSubmitRef={passwordRef}
        placeholder="Email Adress"
        iconName="ios-mail-outline"
      />
      <InputWithIcon
        value={password}
        onChange={setPassword}
        inputRef={passwordRef}
        onSubmitRef={confirmPasswordRef}
        placeholder="Password"
        iconName="key-outline"
      />
      <InputWithIcon
        value={confirmPassword}
        onChange={setConfirmPassword}
        inputRef={confirmPasswordRef}
        placeholder="Password"
        iconName="key-outline"
      />
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
