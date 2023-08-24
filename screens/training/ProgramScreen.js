import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

//Components
import Header from '../../Header';
import WorkoutView from './components/WorkoutView';
import AreYouSureModal from './components/AreYouSureModal';
import TextAndIconButton from '../../buttons/TextAndIconButton';
import CreateWorkoutModal from './components/CreateWorkoutModal';


export default function ProgramScreen({ route }) {
  const programName = route.params.name;
  const programKey = route.params.key;
  const [workouts, setWorkouts] = useState([]);
  const [workoutsKeys, setWorkoutsKeys] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [areYouSureModal, setAreYouSureModal] = useState(null)
  const [createWorkoutModal, setCreateWorkoutModal] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, `workouts/${programKey}`);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setWorkouts(Object.values(data));
        setWorkoutsKeys(Object.keys(data));
      } else {
        setUserPrograms([]);
        setWorkoutsKeys([])
      } (error) => {
        console.error("Error fetching workouts:", error);
      };
    });
  }, []);

  function deleteWorkout(workoutKey) {
    const db = getDatabase();
    remove(ref(db, `workouts/${programKey}/${workoutKey}`))
    .catch((error) => {
      console.error('Error deleting workout:', error);
    });
  }

  function updateEditMode() {
    setEditMode(!editMode)
  }

  // Navigates to CreateNewProgram screen
  function showCreateNewWorkoutModal() {
    setCreateWorkoutModal(
      <CreateWorkoutModal 
        exitModal={exitCreateWorkoutModal}
        programKey={programKey}
      />
    )
  }

  function showAreYoSureModal(workoutKey) {
    if (programKey) {
      setAreYouSureModal(
        <AreYouSureModal 
          exitModal={exitAreYouSureModal}
          chosenKey={workoutKey}
          deleteElement={deleteWorkout}
        />
      )
    }
  }

  function exitAreYouSureModal() {
    setAreYouSureModal(null)
  }

  function exitCreateWorkoutModal() {
    setCreateWorkoutModal(null)
  }

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title={programName} showGoBackButton={true} showEditButton={true} onClickEdit={updateEditMode}/>
      <View style={styles.workoutsView}>
        <ScrollView style={styles.workoutsScrollView}>
          {workouts.length === 0 
            ? <Text style={styles.noProgramText}>
                You have not created workouts yet. Get started 
                by clicking the "Add workouts" button below!
              </Text>
            : workouts.map((workout, index) => (
                <WorkoutView
                  key={index}
                  workoutName={workout.workoutName}
                  clickDelete={showAreYoSureModal}
                  editMode={editMode}
                  workoutKey={workoutsKeys[index]}
                  programKey={programKey}
                />
              )
          )}
        </ScrollView>
      </View>
      {editMode 
        ? <TextAndIconButton 
            onClick={updateEditMode} 
            title="Done editing" 
            iconName="done"
            iconSize={25}
          />
        : <TextAndIconButton 
            onClick={showCreateNewWorkoutModal} 
            title="Create new Workout"
            iconName="add"
            iconSize={25}
          />
        }
      {areYouSureModal}
      {createWorkoutModal}
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