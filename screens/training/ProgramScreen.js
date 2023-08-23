import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

//Components
import Header from '../../Header';

export default function ProgramScreen({ route }) {
  const programName = route.params.name
  
  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title={programName} showGoBackButton={true} showEditButton={true}/>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    alignItems: 'center',
  }
});