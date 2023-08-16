import { StyleSheet, View, TextInput, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import React, { useState } from 'react';
import { auth } from '../../firebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';

//Components
import PurpleFadedButton from '../../buttons/PurpleFadedButton';
import GotoSignUpButton from '../../buttons/GotoSignUpButton';
import GoogleLogo from '../../assets/images/googleLogo.png';
import FacebookLogo from '../../assets/images/facebookLogo.png';


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [rememberMe, setRememberMe] = useState(false);


    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            alert('Login failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.loginView}>
            <Text style={styles.loginHeader}>Login</Text>
            <View style={styles.inputView}>
                <MaterialCommunityIcons name="email-multiple-outline" color="#CCC" size={24} />
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
                <Ionicons name="key-outline" color="#CCC" size={24} />
                <TextInput
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
            <PurpleFadedButton title="Login" buttonWidth="100%" buttonHeight={50} startGradient={[0, 0]} endGradient={[1, 0]}/>
            <Text style={styles.rememberMeText}>or Login with</Text>
            <View style={styles.providerLoginView}>
                <PurpleFadedButton title="Google" buttonWidth="48.5%" buttonHeight={60} iconImage={GoogleLogo} startGradient={[1, 0]} endGradient={[0, 1]}/>
                <PurpleFadedButton title="Facebook" buttonWidth="48.5%" buttonHeight={60} iconImage={FacebookLogo} startGradient={[0, 0]} endGradient={[0, 1]}/>
            </View>
            <View style={styles.signupView}>
                <Text style={styles.signupText}>Don't have an account?</Text>
                <GotoSignUpButton />
            </View>  
        </View>
    );
}

const styles = StyleSheet.create({
    loginView: {
        width: "75%",
        height: "60%",
        alignItems: "center" 
    },
    loginHeader: {
        color: "#EEEEEE",
        fontSize: 30,
        fontWeight: "300",
        marginBottom: 20
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
    signupView: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40
    },
    signupText: {
        color: "#CCC",
        fontSize: 15,
    }
})