import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

// Components
import Header from '../../Header';
import WorkoutView from './components/WorkoutView';
import CreateExerciseModal from './components/CreateExerciseModal';
import TextAndIconButton from '../../buttons/TextAndIconButton';

export default function ProgramScreen({ route }) {
  const workoutName = route.params.name;
  const workoutKey = route.params.workoutKey;
  const programKey = route.params.programKey;
  const [exercises, setExercises] = useState([]);
  const [createExerciseModal, setCreateExerciseModal] = useState(null);


  // Fetch exercises based on programKey and workoutKey
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, `workouts/${programKey}/${workoutKey}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setExercises(Object.values(data));
      } else {
        setExercises([]);
      } (error) => {
        console.error("Error fetching exercises:", error);
      };
    });
  }, []);

  function updateEditMode() {
    setEditMode(!editMode)
  }

  function showCreateExerciseModal() {
    setCreateExerciseModal(
      <CreateExerciseModal 
        exitModal={exitModal}
        workoutKey={workoutKey}
        programKey={programKey}
      />
    )
  }

  function exitModal() {
    setCreateExerciseModal(null)
  }

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title={workoutName} showGoBackButton={true} showEditButton={true} onClickEdit={updateEditMode}/>
      <View style={styles.exercisesView}>
        <ScrollView style={styles.exercisesScrollView}>
          {exercises.length === 0 
            ? <Text style={styles.noProgramText}>
                You have not created exercises yet. Get started 
                by clicking the "Add exercise" button below!
              </Text>
            : exercises.slice(0, -1).map((excercise, index) => (
                <WorkoutView
                  key={index}
                  workoutName={excercise.exerciseName}
                />
              )
          )}
        </ScrollView>
      </View>
      <TextAndIconButton 
        onClick={showCreateExerciseModal} 
        title="Add exercise" 
        iconName="add"
        iconSize={25}
      />
      {createExerciseModal}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    alignItems: 'center'
  },
  exercisesView: {
    height: 560,
    width: "100%",
    alignItems: "center",
    marginBottom: 10
  },
  exercisesScrollView: {
    flex: 1,
    flexDirection: "column",
  }
});