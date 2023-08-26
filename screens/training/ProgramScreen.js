import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getDatabase, ref, remove, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Components
import Header from '../../Header';
import WorkoutView from './components/WorkoutView';
import AreYouSureModal from './components/modals/AreYouSureModal';
import TextAndIconButton from '../../buttons/TextAndIconButton';
import CreateWorkoutModal from './components/modals/CreateWorkoutModal';

export default function ProgramScreen({ route }) {
  const programName = route.params.name;
  const programKey = route.params.programKey;
  const currentUser = getAuth().currentUser;
  const [programWorkouts, setProgramWorkouts] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [areYouSureModal, setAreYouSureModal] = useState(null);
  const [createWorkoutModal, setCreateWorkoutModal] = useState(null);
  
  // Fetch the workouts for the chosen program
  useEffect(() => {
    const db = getDatabase();
    const userWorkoutsRef = ref(db, `users/${currentUser.uid}/trainingPrograms/${programKey}/workouts`);
    onValue(userWorkoutsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProgramWorkouts(data);
      } else {
        setProgramWorkouts({});
      }
    }, (error) => {
      console.error("Error fetching programs:", error);
    });
  }, []);
  

  // Delete a workout with a given key
  function deleteWorkout(workoutKey) {
    const db = getDatabase();
    remove(ref(db, `users/${currentUser.uid}/trainingPrograms/${programKey}/workouts/${workoutKey}`))
      .catch((error) => {
        console.error('Error deleting workout:', error);
      });
  }

  // Toggle edit mode
  function updateEditMode() {
    setEditMode(!editMode);
  }

  // Show the modal for creating a new workout
  function showCreateNewWorkoutModal() {
    setCreateWorkoutModal(
      <CreateWorkoutModal 
        exitModal={exitCreateWorkoutModal}
        programKey={programKey}
      />
    );
  }

  // Show the modal for confirming workout deletion
  function showAreYouSureModal(workoutKey) {
      setAreYouSureModal(
        <AreYouSureModal 
          exitModal={exitAreYouSureModal}
          chosenKey={workoutKey}
          deleteElement={deleteWorkout}
          whatToDelete="workout"
        />
      );
      setEditMode(false);
  }

  // Close the confirmation modal for workout deletion
  function exitAreYouSureModal() {
    setAreYouSureModal(null);
  }

  // Close the modal for creating a new workout
  function exitCreateWorkoutModal() {
    setCreateWorkoutModal(null);
  }

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header 
        title={programName} 
        showGoBackButton={true} 
        showEditButton={true} 
        onClickEdit={updateEditMode}
      />
      <View style={styles.workoutsView}>
        <ScrollView style={styles.workoutsScrollView}>
          {programWorkouts
            ? Object.keys(programWorkouts).map((workoutKey) => (
                <WorkoutView
                  key={workoutKey}
                  workoutKey={workoutKey}
                  workoutName={programWorkouts[workoutKey].workoutName}
                  clickDelete={showAreYouSureModal}
                  editMode={editMode}
                  programKey={programKey}
                />
             ))
            : <Text style={styles.noWorkoutsText}>
                You have not created workouts yet. Get started 
                by clicking the "Add workouts" button below!
              </Text>
          }
        </ScrollView>
      </View>
      <TextAndIconButton 
        onClick={showCreateNewWorkoutModal} 
        title="Create new Workout"
        iconName="add"
        iconSize={25}
      />
      {areYouSureModal}
      {createWorkoutModal}
    </LinearGradient>
  );
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
  },
  noWorkoutsText: {
    color: "#666666",
    fontSize: 20,
    width: 330,
    marginTop: 180,
    lineHeight: 35
  }
});
