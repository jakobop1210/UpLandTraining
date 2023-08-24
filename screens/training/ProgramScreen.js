import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

//Components
import Header from '../../Header';
import WorkoutView from './components/WorkoutView'

export default function ProgramScreen({ route }) {
  const programName = route.params.name;
  const workouts = route.params.workoutsList;
  const programKey = route.params.key;
  const [editMode, setEditMode] = useState(false);

  function updateEditMode() {
    setEditMode(!editMode)
  }

  
  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title={programName} showGoBackButton={true} showEditButton={true} onClickEdit={updateEditMode}/>
      <View style={styles.workoutsView}>
        <ScrollView style={styles.workoutsScrollView}>
          {workouts.map((workout, index) => (
            <WorkoutView
              key={index}
              workoutName={workout} 
              editMode={editMode}
            />
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    alignItems: 'center',
  },
  workoutsView: {
    height: 560,
    width: "100%",
    alignItems: "center",
    marginBottom: 10
  },
  workoutsScrollView: {
    flex: 1,
    flexDirection: "column",
  }
});