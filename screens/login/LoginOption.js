import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Components
import InputWithIcon from './components/InputWithIcon';
import PurpleFadedButton from '../../buttons/PurpleFadedButton';
import GotoSignUpButton from '../../buttons/GotoSignUpButton';
import GoogleLogo from '../../assets/images/googleLogo.png';
import FacebookLogo from '../../assets/images/facebookLogo.png';

// Ensure completion of any pending auth sessions
WebBrowser.maybeCompleteAuthSession();

export default function LoginOption({ changeToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const passwordRef = useRef();
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "742231169006-lrb1evl5kkahcf176c1dlr7ta5tbut4s.apps.googleusercontent.com",
    iosClientId: "742231169006-mlsllnmm6hdq2cvjjov78n9opt5p6lje.apps.googleusercontent.com",
    androidClientId: "742231169006-admtigujv0ofgbsgj1tipktf9dk64ro5.apps.googleusercontent.com"
  });

  // Function to handle the login process
  const handleLogin = async () => {
    setLoading(true);
    if (email === '' || password === '') {
      Alert.alert('Missing Information', 'Please fill out all the required fields');
      setLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('Authentication Failed', 'Incorrect email or user does not exist');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('Authentication Failed', 'Incorrect password');
      }
    } finally {
      setLoading(false);
    }
  };

  // Function to initiate Google sign-in
  function signinGoogle() {
    promptAsync();
  }

  // Effect to handle the Google sign-in response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <View style={styles.loginView}>
      <Text style={styles.loginHeader}>Login to Account</Text>
      <Text style={styles.loginInformationText}>Please fill in the information below</Text>
      <InputWithIcon
        value={email}
        onChange={setEmail}
        onSubmitRef={passwordRef}
        placeholder="Email Address"
        iconName="ios-mail-outline"
      />
      <InputWithIcon
        value={password}
        onChange={setPassword}
        inputRef={passwordRef}
        placeholder="Password"
        iconName="key-outline"
      />
      <View style={styles.loginButtonView}>
        {loading ? (
          <ActivityIndicator size="large" color="#F0EBD8" />
        ) : (
          <PurpleFadedButton
            title="Login"
            onClick={handleLogin}
            buttonWidth="100%"
            buttonHeight={50}
            startGradient={[0, 0]}
            endGradient={[1, 0]}
          />
        )}
      </View>
      <Text style={styles.dontHaveAccountText}>or Login with</Text>
      <View style={styles.providerLoginView}>
        <PurpleFadedButton
          title="Google"
          onClick={signinGoogle}
          buttonWidth="48.5%"
          buttonHeight={60}
          iconImage={GoogleLogo}
          startGradient={[1, 0]}
          endGradient={[0, 1]}
        />
        <PurpleFadedButton
          title="Facebook"
          buttonWidth="48.5%"
          buttonHeight={60}
          iconImage={FacebookLogo}
          startGradient={[0, 1]}
          endGradient={[1, 0]}
        />
      </View>
      <View style={styles.gotoSignupView}>
        <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
        <GotoSignUpButton onClick={changeToSignup} title="SIGN UP" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginView: {
    width: '75%',
    height: '60%',
  },
  loginHeader: {
    color: '#F0EBD8',
    fontSize: 30,
    fontWeight: '300',
    marginBottom: 5,
  },
  loginInformationText: {
    color: '#999',
    fontSize: 12,
    marginLeft: 2,
  },
  providerLoginView: {
    marginTop: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginButtonView: {
    height: 120,
    justifyContent: 'center',
  },
  gotoSignupView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  dontHaveAccountText: {
    color: '#CCC',
    fontSize: 15,
    textAlign: 'center',
  },
});
