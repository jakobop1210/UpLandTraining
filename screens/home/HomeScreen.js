import { StyleSheet, View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#0D1321', '#1D2D44']} // Define your desired start and end colors
      style={styles.container}
    >
      <Text>Welcome!</Text>
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