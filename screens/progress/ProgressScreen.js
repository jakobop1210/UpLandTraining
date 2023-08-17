import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

export default function ProgressScreen() {
  return (
    <LinearGradient
      colors={['#0D1321', '#1D2D44']} // Define your desired start and end colors
      style={styles.container}
    >
      <Text>NutririonScreen</Text>
    </LinearGradient>
  )
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      position: "relative",
      alignItems: 'center',
      justifyContent: "center",
  }
});