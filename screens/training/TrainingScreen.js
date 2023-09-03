import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

// Components
import Header from '../../Header';
import ItemView from './components/ItemView';
import TextAndIconButton from '../../buttons/TextAndIconButton';
import AreYouSureModal from './components/modals/AreYouSureModal';


export default function TrainingScreen() {
  const [editMode, setEditMode] = useState(false);
  const [userPrograms, setUserPrograms] = useState({});
  const [areYouSureModal, setAreYouSureModal] = useState(null);
  const currentUser = getAuth().currentUser;
  const navigation = useNavigation();

  // Fetch the training programs for the logged-in user
  useEffect(() => {
    const db = getDatabase();
    const userProgramsRef = ref(db, `users/${currentUser.uid}/trainingPrograms`);
    onValue(userProgramsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserPrograms(data);
      } else {
        setUserPrograms({});
      }
    }, (error) => {
      console.error("Error fetching programs:", error);
    });
  }, []);

  // Delete a program with its key, including associated workouts and exercises
  function deleteProgram(programKey) {
    const db = getDatabase();
    remove(ref(db, `users/${currentUser.uid}/trainingPrograms/${programKey}`))
      .catch((error) => {
        console.error('Error deleting program:', error);
      });
  }

  // Toggle edit mode
  function updateEditMode() {
    setEditMode(!editMode);
  }

  // Navigate to CreateNewProgram screen
  function goToCreateNewProgram() {
    navigation.navigate("CreateNewProgram");
  }

  // Show the confirmation modal for deleting a program
  function showModal(programKey) {
    if (programKey) {
      setAreYouSureModal(
        <AreYouSureModal 
          exitModal={exitModal}
          chosenKey={programKey}
          deleteElement={deleteProgram}
          whatToDelete="program"
        />
      );
      setEditMode(false);
    }
  }

  // Close the confirmation modal
  function exitModal() {
    setAreYouSureModal(null);
  }

   return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title="My programs" onClickEdit={updateEditMode} showEditButton={true}/>
      <View style={styles.programsView}>
        <ScrollView style={styles.programsScrollView}>
          {userPrograms 
            ? Object.keys(userPrograms).map((programKey) => (
                <ItemView
                  key={programKey}
                  programKey={programKey}
                  itemName={userPrograms[programKey].programName}
                  editMode={editMode}
                  clickDelete={showModal}
                  updateEditMode={updateEditMode}
                  exercises={userPrograms[programKey].workouts}
                  isProgram={true}
                />
              ))
            : <Text style={styles.noProgramText}>
              You have not created any programs yet. Get started 
              by clicking the "Create new Program" button below!
            </Text>
          }
        </ScrollView>
      </View>
      <TextAndIconButton 
        onClick={goToCreateNewProgram} 
        title="Create new Program" 
        iconName="add"
        iconSize={25}
      />
      {areYouSureModal}
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
  programsView: {
    height: 580,
    width: "100%",
    alignItems: "center",
    marginBottom: 10
  },
  programsScrollView: {
    width: "90%",
    flex: 1,
    flexDirection: "column",
  },
  noProgramText: {
    color: "#666666",
    fontSize: 20,
    width: 330,
    marginTop: 180,
    lineHeight: 35
  }
});
