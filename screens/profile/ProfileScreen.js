import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseAuth';

//Components
import PurpleFadedButton from '../../buttons/PurpleFadedButton';


export default function ProfileScreen() {

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <PurpleFadedButton title="Sign Out" onClick={logOut} buttonWidth="60%" buttonHeight={50} startGradient={[1, 0]} endGradient={[1, 1]}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      position: "relative",
      alignItems: 'center',
      justifyContent: "center",
      backgroundColor: "#222831"
  }
});