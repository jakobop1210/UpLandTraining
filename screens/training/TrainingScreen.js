import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

//Components
import Header from '../../Header';
import ProgramView from './components/ProgramView';
import TextAndIconButton from '../../buttons/TextAndIconButton';

export default function TrainingScreen() {
  const [editMode, setEditMode] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {

  }, [])

  function updateEditMode() {
    if (!editMode) {
      setEditMode(true);
    } else {
      setEditMode(false)
    }
  }

  function createNewProgram() {
    navigation.navigate("CreateNewProgram")
  }

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title="My programs" onClickEdit={updateEditMode} showEditButton={true}/>
      <View style={styles.programsView}>
        <ScrollView style={styles.programsScrollView}>
          <ProgramView programName="H2023" splitLength={7} focusPoint="Even" editMode={editMode}/>
          <ProgramView programName="H2023" splitLength={7} focusPoint="Even" editMode={editMode}/>
          <ProgramView programName="H2023" splitLength={7} focusPoint="Even" editMode={editMode}/>
          <ProgramView programName="H2023" splitLength={7} focusPoint="Even" editMode={editMode}/>
          <ProgramView programName="H2023" splitLength={7} focusPoint="Even"editMode={editMode}/>
          <ProgramView programName="H2023" splitLength={7} focusPoint="Even" editMode={editMode}/>
        </ScrollView>
      </View>
          {editMode 
              ? <View style={styles.editModeButtonsView}>
                  <TextAndIconButton onClick={updateEditMode} title="Cancel" />
                  <TextAndIconButton onClick={updateEditMode} title="Save" />
                </View>
              : <TextAndIconButton 
                  onClick={createNewProgram} 
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

