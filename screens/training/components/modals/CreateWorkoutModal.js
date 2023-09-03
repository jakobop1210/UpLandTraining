import { StyleSheet, Modal, View, Text, Dimensions, TextInput } from 'react-native';
import { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Components
import TextAndIconButton from '../../../../buttons/TextAndIconButton';
import IconButton from '../../../../buttons/IconButton';

export default function CreateWorkoutModal({ exitModal, programKey }) {
  const [workoutName, setWorkoutName] = useState('');

  // Add workout to database when a new workout is created
  function addWorkout() {
    if (workoutName === '') {
      alert("Workout name cannot be empty");
      return;
    }
    const db = getDatabase();
    const user = getAuth().currentUser;
    push(ref(db, `users/${user.uid}/trainingPrograms/${programKey}/workouts`), {
      workoutName: workoutName
    });
    alert(`Workout "${workoutName}" created`);
    exitModal()
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
            placeholder="Workout name"
            placeholderTextColor="#888"
            onChangeText={setWorkoutName}
            value={workoutName}
            style={styles.workoutNameInput}
            maxLength={25}
          />
          <TextAndIconButton
            title="Create Workout"
            iconName="create"
            iconSize={22}
            onClick={addWorkout}
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
    justifyContent: "space-between",
    height: 250,
    width: 300,
    backgroundColor: "#1D2D44",
    padding: 30,
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
  workoutNameInput: {
    height: 45,
    width: "80%",
    color: "#F0EBD8",
    fontSize: 22,
    marginRight: 10,
    marginBottom: 50,
    paddingHorizontal: 25,
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1
  }
});
