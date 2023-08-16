import { StyleSheet, TextInput} from 'react-native';
import React, { useState } from 'react';
import { auth } from '../../firebaseAuth';
import { createUserWithEmailAndPassword } from 'firebase/auth';


export default function RegisterScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState('');
    
    const handleRegister = async () => {
        setLoading(true);
        try {
            if (password !== confirmPassword) {
                alert("The passwords doesnt match!")
                return;
            }
            const response = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            alert('Register failer: ' + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <TextInput
                placeholder="First Name"
                placeholderTextColor="#888"
                autoCapitalize="none"
                onChangeText={setFirstName}
                value={firstName}
                style={styles.input}
            />
            <TextInput
                placeholder="Last Name"
                placeholderTextColor="#888"
                autoCapitalize="none"
                onChangeText={setLastName}
                value={lastName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#888"
                autoCapitalize="none"
                onChangeText={setEmail}
                value={email}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                autoCapitalize="none"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#888"
                autoCapitalize="none"
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                secureTextEntry
                style={styles.input}
            />
        </>
    );
}

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        justifyContent: "space-evenly",
        width: '100%'
    },
    input: {
        width: '60%',
        height: 50,
        marginTop: 30,
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        color: "white",
        fontSize: 18,
        borderRadius: 5,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
      },
});
