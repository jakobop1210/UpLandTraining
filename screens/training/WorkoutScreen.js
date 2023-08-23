import { StyleSheet, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

// Components
import Header from '../../Header';

export default function ProgramScreen({ route }) {
  const workoutName = route.params.name

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title={workoutName} showGoBackButton={true} showEditButton={true}/>
      <Text>Workout Screen!!!</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    alignItems: 'center'
  }
});