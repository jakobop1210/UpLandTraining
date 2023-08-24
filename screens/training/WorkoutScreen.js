import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

// Components
import Header from '../../Header';
import ExerciseView from './components/ExerciseView';
import CreateExerciseModal from './components/CreateExerciseModal';
import TextAndIconButton from '../../buttons/TextAndIconButton';
import AreYouSureModal from './components/AreYouSureModal';

export default function ProgramScreen({ route }) {
  const workoutName = route.params.name;
  const workoutKey = route.params.workoutKey;
  const programKey = route.params.programKey;
  const [exercises, setExercises] = useState([]);
  const [exerciseKeys, setExerciseKeys] = useState([])
  const [createExerciseModal, setCreateExerciseModal] = useState(null);
  const [areYouSureModal, setAreYouSureModal] = useState(null)
  const [editMode, setEditMode] = useState(false);


  // Fetch exercises based on programKey and workoutKey
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, `workouts/${programKey}/${workoutKey}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setExercises(Object.values(data));
        setExerciseKeys(Object.keys(data));
      } else {
        setExercises([]);
        setExerciseKeys([])
      } (error) => {
        console.error("Error fetching exercises:", error);
      };
    });
  }, []);

  // Delete exercise with key = exerciseKey
  function deleteExercise(exerciseKey) {
    const db = getDatabase();
    remove(ref(db, `workouts/${programKey}/${workoutKey}/${exerciseKey}`))
    .catch((error) => {
      console.error('Error deleting workout:', error);
    });
  }

  function updateEditMode() {
    setEditMode(!editMode)
  }

  // Set createExerciseModal so it becomes visible
  function showCreateExerciseModal() {
    setCreateExerciseModal(
      <CreateExerciseModal 
        exitModal={exitCreateExerciseModal}
        workoutKey={workoutKey}
        programKey={programKey}
      />
    )
  }

  // Set showAreYouSureModal so it becomes visible
  function showAreYoSureModal(exerciseKey) {
    if (programKey) {
      setAreYouSureModal(
        <AreYouSureModal 
          exitModal={exitAreYouSureModal}
          chosenKey={exerciseKey}
          deleteElement={deleteExercise}
        />
      )
    }
  }

  function exitAreYouSureModal() {
    setAreYouSureModal(null)
  }

  function exitCreateExerciseModal() {
    setCreateExerciseModal(null)
  }

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title={workoutName} showGoBackButton={true} showEditButton={true} onClickEdit={updateEditMode}/>
      <View style={styles.exercisesView}>
        <ScrollView style={styles.exercisesScrollView}>
          {exercises.length === 1 
            ? <Text style={styles.noExercisesText}>
                You have not created exercises yet. Get started 
                by clicking the "Add exercise" button below!
              </Text>
            : exercises.slice(0, -1).map((exercise, index) => (
                <ExerciseView
                  key={index}
                  exerciseName={exercise.exerciseName}
                  setsList={exercise.sets}
                  editMode={editMode}
                  clickDelete={showAreYoSureModal}
                  exerciseKey={exerciseKeys[index]}
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
      {areYouSureModal}
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
  },
  noExercisesText: {
    color: "#666666",
    fontSize: 20,
    width: 330,
    marginTop: 180,
    lineHeight: 35
  }
});