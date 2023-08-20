import { StyleSheet, View, TextInput, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import React, { useEffect, useState } from 'react';
import { auth } from '../../firebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Components
import PurpleFadedButton from '../../buttons/PurpleFadedButton';
import GotoSignUpButton from '../../buttons/GotoSignUpButton';
import GoogleLogo from '../../assets/images/googleLogo.png';
import FacebookLogo from '../../assets/images/facebookLogo.png';

WebBrowser.maybeCompleteAuthSession();

export default function LoginOption({ changeToSignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [userInfo, setUserInfo] = useState(null)
    const [request, response, promtAsync] = Google.useAuthRequest({
        webClientId: "742231169006-lrb1evl5kkahcf176c1dlr7ta5tbut4s.apps.googleusercontent.com",
        iosClientId: "742231169006-mlsllnmm6hdq2cvjjov78n9opt5p6lje.apps.googleusercontent.com",
        androidClientId: "742231169006-admtigujv0ofgbsgj1tipktf9dk64ro5.apps.googleusercontent.com"
    })


    const handleLogin = async () => {
        setLoading(true);
        if (email === '' || password === '') {
            alert("You need to fill out alle the required fields")
            setLoading(false);
            return;
        } 
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                alert('Incorrect email or user does not exist');
            } else if (error.code === 'auth/wrong-password') {
                alert('Incorrect password');
            } 
        } finally { 
            setLoading(false);
        }
    };

    function signinGoogle() {
        promtAsync();
    }

    useEffect(() => {
        if (response?.type == "success") {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential); 
        }
    }, [response])
 
   
    return (
      <View style={styles.loginView}>
          <Text style={styles.loginHeader}>Login to Account</Text>
          <Text style={styles.loginInformationText}>Please fill in the information below</Text>
          <View style={styles.inputView}>
              <Ionicons name="ios-mail-outline" color="#BBB" size={24} />
              <TextInput
                  placeholder="Email Address"
                  placeholderTextColor="#888"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  value={email}
                  style={styles.input}
              />
          </View>
          <View style={styles.inputView}>
              <MaterialCommunityIcons name="account-key-outline" color="#AAA" size={24} />
              <TextInput
                  required
                  placeholder="Password"
                  placeholderTextColor="#888"
                  autoCapitalize="none"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry
                  style={styles.input}
              />
          </View>
          <View style={styles.rememberMeView}>
              <Checkbox 
                  style={styles.checkbox} 
                  value={rememberMe} 
                  onValueChange={setRememberMe} 
                  color={rememberMe ? '#673ab7' : undefined}
              />
              <Text style={styles.rememberMeText}>Remember Me?</Text>
          </View>
          <View style={styles.loginButtonView}>
            {loading 
                ? <ActivityIndicator size="large" color="#F0EBD8" />
                : <PurpleFadedButton title="Login" onClick={handleLogin} buttonWidth="100%" buttonHeight={50} startGradient={[0, 0]} endGradient={[1, 0]}/>
            }
          </View>
                <Text style={styles.dontHaveAccountText}>or Login with</Text>
          <View style={styles.providerLoginView}>
              <PurpleFadedButton title="Google" onClick={signinGoogle} buttonWidth="48.5%" buttonHeight={60} iconImage={GoogleLogo} startGradient={[1, 0]} endGradient={[0, 1]}/>
              <PurpleFadedButton title="Facebook" buttonWidth="48.5%" buttonHeight={60} iconImage={FacebookLogo} startGradient={[0, 1]} endGradient={[1, 0]}/>
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
        width: "75%",
        height: "60%",
    },
    loginHeader: {
        color: "#F0EBD8",
        fontSize: 30,
        fontWeight: "300",
        marginBottom: 5
    },
    loginInformationText: {
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
    providerLoginView: {
        marginTop: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    input: {
        width: "90%",
        height: "100%",
        paddingHorizontal: 10,
        color: "white",
        fontSize: 18,
        borderRadius: 5,
    },
    rememberMeView: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: 20,
        marginBottom: 10
    },
    rememberMeText: {
        color: "#CCC",
        fontSize: 13,
    },
    checkbox: {
        width: 20,
        height: 20,
        marginRight: 10,
        borderWidth: 1,
    },
    loginButtonView: {
        height: 120,
        justifyContent: "center"
    },
    gotoSignupView: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40
    },
    dontHaveAccountText: {
        color: "#CCC",
        fontSize: 15,
        textAlign: "center"
    }
})
