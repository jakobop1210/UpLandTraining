import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'

//Components
import Header from '../../Header';

export default function ProfileSettings() {
  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title="Profile settings" showGoBackButton={true}/>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
  }
});