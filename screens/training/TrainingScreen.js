import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';

// Components
import Header from '../../Header';
import ProgramView from './components/ProgramView';
import TextAndIconButton from '../../buttons/TextAndIconButton';
import AreYouSureModal from './components/modals/AreYouSureModal';

export default function TrainingScreen() {
  const [editMode, setEditMode] = useState(false);
  const [userPrograms, setUserPrograms] = useState([]);
  const [programKeys, setProgramKeys] = useState([]);
  const [areYouSureModal, setAreYouSureModal] = useState(null);
  const currentUser = getAuth().currentUser;
  const navigation = useNavigation();

  // Fetch the training programs for the logged-in user
  useEffect(() => {
    const db = getDatabase();
    const userProgramsRef = ref(db, `trainingPrograms/${currentUser.uid}`);
    
    onValue(userProgramsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const programs = Object.values(data);
        const keys = Object.keys(data);
        setUserPrograms(programs);
        setProgramKeys(keys);
      } else {
        setUserPrograms([]);
        setProgramKeys([]);
      }
    }, (error) => {
      console.error("Error fetching programs:", error);
    });
  }, []);

  // Delete a program with its key, including associated workouts and exercises
  function deleteProgram(programKey) {
    const db = getDatabase();
    
    remove(ref(db, `trainingPrograms/${currentUser.uid}/${programKey}`))
      .catch((error) => {
        console.error('Error deleting program:', error);
      });

    remove(ref(db, `workouts/${programKey}`))
      .catch((error) => {
        console.error('Error deleting workouts:', error);
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
        />
      );
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
          {userPrograms.length === 0 ? (
            <Text style={styles.noProgramText}>
              You have not created any programs yet. Get started 
              by clicking the "Create new Program" button below!
            </Text>
          ) : (
            userPrograms.map((program, index) => (
              <ProgramView
                key={index}
                programName={program.programName}
                description={program.programDescription}
                editMode={editMode}
                clickDelete={showModal}
                programKey={programKeys[index]}
              />
            ))
          )}
        </ScrollView>
      </View>
      {editMode ? (
        <TextAndIconButton 
          onClick={updateEditMode} 
          title="Done editing" 
          iconName="done"
          iconSize={25}
        />
      ) : (
        <TextAndIconButton 
          onClick={goToCreateNewProgram} 
          title="Create new Program" 
          iconName="add"
          iconSize={25}
        />
      )}
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
    height: 560,
    width: "100%",
    alignItems: "center",
    marginBottom: 10
  },
  programsScrollView: {
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
