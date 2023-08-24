import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

// Components
import Header from '../../Header';
import CreateExerciseModal from './components/CreateExerciseModal';
import TextAndIconButton from '../../buttons/TextAndIconButton';

export default function ProgramScreen({ route }) {
  const workoutName = route.params.name
  const [createExerciseModal, setCreateExerciseModal] = useState(null)

  function updateEditMode() {
    setEditMode(!editMode)
  }

  function showCreateExerciseModal() {
    setCreateExerciseModal(
      <CreateExerciseModal 
        exitModal={exitModal}
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