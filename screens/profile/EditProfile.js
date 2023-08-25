import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { auth } from '../../firebaseAuth';
import InputWithIcon from '../login/components/InputWithIcon';
import GoBackButton from '../../buttons/GoBackButton';
import PurpleFadedButton from '../../buttons/PurpleFadedButton';

export default function EditProfile() {
  const loggedInUser = auth.currentUser;
  const [name, setName] = useState(loggedInUser.displayName);
  const [email, setEmail] = useState(loggedInUser.email);
  const [password, setPassword] = useState(loggedInUser.password);
  const [confirmPassword, setConfirmPassword] = useState(loggedInUser.password);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [loading, setLoading] = useState('');

  // Function to update profile information
  const updateProfileInformation = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      alert("The passwords don't match!");
      setLoading(false);
      return;
    }
    try {
      // Update user's display name
      await updateProfile(loggedInUser, { displayName: name });
      // Update user's email address
      await updateEmail(loggedInUser, email);
      // Update user's password
      await updatePassword(loggedInUser, password);
      setLoading(false);
      alert("Profile information updated successfully!");
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <View style={styles.goBackButtonView}>
        <GoBackButton />
      </View>
      <View style={styles.editView}>
        <View style={styles.headerView}>
          <Text style={styles.editHeader}>Edit Profile</Text>
          <Feather name="edit" size={30} color="#F0EBD8" />
        </View>
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
          placeholder="Email Address"
          iconName="ios-mail-outline"
        />
        <InputWithIcon
          value={password}
          onChange={setPassword}
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
        <View style={styles.updateButtonView}>
          {loading 
            ? <ActivityIndicator size="large" color="#F0EBD8" />
            : <PurpleFadedButton 
                title="Update profile" 
                onClick={updateProfileInformation} 
                buttonWidth="100%" 
                buttonHeight={50} 
                startGradient={[1, 0]} 
                endGradient={[0, 1]}
              />
          }
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  goBackButtonView: {
    position: "absolute",
    left: 10,
    top: 60
  },
  editView: {
    width: "70%",
    height: "60%",
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
  },
  editHeader: {
    color: "#F0EBD8",
    fontSize: 35,
    fontWeight: "300",
    marginBottom: 5,
    marginRight: 10
  },
  editInformationText: {
    color: "#999",
    fontSize: 12,
    marginLeft: 2
  },
  updateButtonView: {
    height: 120,
    justifyContent: "center"
  }
});
