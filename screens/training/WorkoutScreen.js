import { StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

export default function ProgramScreen() {
  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Text>TrainingScreen</Text>
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