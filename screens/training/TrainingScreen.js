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

export default function TrainingScreen() {
  const [editMode, setEditMode] = useState(false);
  const [userPrograms, setUserPrograms] = useState([]);
  const [programKeys, setProgramKeys] = useState([]);
  const currentUser = getAuth().currentUser
  const navigation = useNavigation();

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'trainingPrograms/' + currentUser.uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUserPrograms(Object.values(data));
        setProgramKeys(Object.keys(data))
      }
    });

  }, []);

  function deleteProgram(programKey) {
    const db = getDatabase();
    remove(ref(db, `trainingPrograms/${currentUser.uid}/${programKey}`))
    .then(() => {
      alert(`Program deleted successfully`);
    })
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

  function goToCreateNewProgram() {
    navigation.navigate("CreateNewProgram")
  }

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title="My programs" onClickEdit={updateEditMode} showEditButton={true}/>
      <View style={styles.programsView}>
        <ScrollView style={styles.programsScrollView}>
          {userPrograms.map((program, index) => (
            <ProgramView
              key={index}
              programName={program.programName}
              description={program.programDescription}
              editMode={editMode}
              deleteProgram={deleteProgram}
              programKey={programKeys[index]}
            />
          ))}
        </ScrollView>
      </View>
          {editMode 
              ? <View style={styles.editModeButtonsView}>
                  <TextAndIconButton onClick={updateEditMode} title="Cancel" />
                  <TextAndIconButton onClick={updateEditMode} title="Save" />
                </View>
              : <TextAndIconButton 
                  onClick={goToCreateNewProgram} 
                  title="Create new Program" 
                  buttonWidth="60%" 
                  buttonHeight={50}
                  iconName="add"
                  iconSize={25}
                  iconType="MaterialIcons"
                />
          }
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
      height: 540,
      width: "100%",
      alignItems: "center",
      marginBottom: 10
  },
  programsScrollView: {
      flex: 1,
      flexDirection: "column",
  },
  buttonView: {
    height: 50,
},
editModeButtonsView: {
  width: "100%",
  flexDirection: "row",
  justifyContent: "center"
}
});

