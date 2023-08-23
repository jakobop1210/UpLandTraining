import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, onValue, remove } from 'firebase/database';

//Components
import Header from '../../Header';
import ProgramView from './components/ProgramView';
import TextAndIconButton from '../../buttons/TextAndIconButton';
import AreYouSureModal from './components/AreYouSureModal';

export default function TrainingScreen() {
  const [editMode, setEditMode] = useState(false);
  const [userPrograms, setUserPrograms] = useState([]);
  const [programKeys, setProgramKeys] = useState([]);
  const currentUser = getAuth().currentUser
  const navigation = useNavigation();
  const [modalComponent, setModalComponent] = useState(null)

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'trainingPrograms/' + currentUser.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserPrograms(Object.values(data));
        setProgramKeys(Object.keys(data))
      } else {
        setUserPrograms([]);
        setProgramKeys([])
      }
    });
  }, []);


  function deleteProgram(programKey) {
    const db = getDatabase();
    remove(ref(db, `trainingPrograms/${currentUser.uid}/${programKey}`))
    .catch((error) => {
      console.error('Error deleting program:', error);
    });
  }

  function updateEditMode() {
    if (!editMode) {
      setEditMode(true);
    } else {
      setEditMode(false)
    }
  }

  // Navigates to CreateNewProgram screen
  function goToCreateNewProgram() {
    navigation.navigate("CreateNewProgram")
  }

  // Set the modalComponents so it becomes visible
  function showModal(programKey) {
    if (programKey) {
      setModalComponent(
        <AreYouSureModal 
          exitModal={exitModal}
          chosenProgramKey={programKey}
          deleteProgram={deleteProgram}
        />
      )
    }
  }

  function exitModal() {
    setModalComponent(null)
  }

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title="My programs" onClickEdit={updateEditMode} showEditButton={true}/>
      <View style={styles.programsView}>
        <ScrollView style={styles.programsScrollView}>
        {userPrograms.length === 0 
          ? (<Text style={styles.noProgramText}>You have not created any programs yet. Get started by clicking the "Create new Program" button below!</Text>)
          : (userPrograms.map((program, index) => (
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
        {editMode 
          ? 
            <TextAndIconButton 
              onClick={updateEditMode} 
              title="Done editing" 
              iconName="done"
              iconSize={25}
            />
          : <TextAndIconButton 
              onClick={goToCreateNewProgram} 
              title="Create new Program" 
              iconName="add"
              iconSize={25}
            />
        }
        {modalComponent}
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

