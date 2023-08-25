import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

// Components
import Header from '../../Header';
import ExerciseView from './components/ExerciseView';
import ExerciseModal from './components/modals/ExerciseModal';
import AreYouSureModal from './components/modals/AreYouSureModal';
import TextAndIconButton from '../../buttons/TextAndIconButton';

export default function ProgramScreen({ route }) {
  const workoutName = route.params.name;
  const workoutKey = route.params.workoutKey;
  const programKey = route.params.programKey;
  const [exercises, setExercises] = useState([]);
  const [exerciseKeys, setExerciseKeys] = useState([])
  const [exerciseModal, setExerciseModal] = useState(null);
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
    setExerciseModal(
      <ExerciseModal 
        exitModal={exitExerciseModal}
        workoutKey={workoutKey}
        programKey={programKey}
        buttonText="Add exercise"
        showCreateExercise={true}
      />
    )
  }

   // Set createExerciseModal so it becomes visible and customize it for track exercise
   function showTrackExerciseModal(exerciseName, setsList) {
    setExerciseModal(
      <ExerciseModal 
        exerciseName={exerciseName}
        exitModal={exitExerciseModal}
        buttonText="Track exercise"
        showWeightTracker={true}
        setsList={setsList}
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

  function exitExerciseModal() {
    setExerciseModal(null)
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
                  onClick={showTrackExerciseModal}
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
      {exerciseModal}
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