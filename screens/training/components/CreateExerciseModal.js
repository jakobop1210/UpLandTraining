import { StyleSheet, Modal, View, Text, Dimensions, TextInput } from 'react-native';
import { useState } from 'react';

// Components
import DynamicInput from './DynamicInput';
import IconButton from '../../../buttons/IconButton';

export default function CreateExerciseModal({ exitModal }) {
  const [exerciseName, setExerciseName] = useState('');

  function addExercise(repsList) {
    if (exerciseName === '') {
      alert("Program name cannot be empty");
      return;
    } else if (repsList.includes('')) {
      alert("Every set must have a rep count");
      return;
    }
    const db = getDatabase();
    const user = getAuth().currentUser;

    push(ref(db, 'workouts/' + user.uid), {
      programName: programName,
      programDescription: programDescription,
      workouts: workoutInput
    });
    alert(`Program "${exerciseName}" created`);
  }

  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View style={styles.parentView}>
        <View style={styles.backDrop} />
        <View style={styles.contentView}>
          <View style={styles.exitButtonView}>
            <IconButton 
              onClick={exitModal}
              iconName="close-outline" 
              iconSize={35}
              iconColor="#F0EBD8"
            />
          </View>
          <TextInput
            autoCapitalize="none"
            placeholder="Exercise name"
            placeholderTextColor="#888"
            onChangeText={setExerciseName}
            value={exerciseName}
            style={styles.exerciseNameInput}
            maxLength={25}
          />
          <DynamicInput
            labelText="Set"
            placeholderText="reps"
            onClickCreate={addExercise}
            buttonText="Add exercise"
          />
        </View>
      </View>
    </Modal>
  );

}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backDrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: "absolute",
    width: width,
    height: height
  },
  contentView: {
    flexDirection: "column",
    alignItems: "center",
    height: 520,
    width: 320,
    backgroundColor: "#1D2D44",
    padding: 20,
    borderRadius: 20,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5
  },
  exitButtonView: {
    position: "absolute",
    top: 5,
    right: 10
  },
  exerciseNameInput: {
    height: 45,
    width: "80%",
    color: "#F0EBD8",
    fontSize: 22,
    marginRight: 10,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderBottomColor: "#CCC",
    borderBottomWidth: 1
  }
});
