import { StyleSheet, Modal, View, Text, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { getDatabase, ref, set, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Components
import DynamicInput from '../DynamicInput';
import IconButton from '../../../../buttons/IconButton';
import DropdownComponent from '../DropdownComponent';

export default function ExerciseModal(props) {
  const [newExerciseName, setNewExerciseName] = useState('');
  const [chosenRestTime, setChosenRestTime] = useState('');
  const [chosenMuscleGroup, setChosenMuscleGroup] = useState('chest'); // Default muscle group

  // Add exercise to database to workouts/programkey/workoutkey
  function addExercise(repsList) {
    if (newExerciseName === '') {
      alert("Most choose an exercise");
      return;
    } else if (chosenRestTime === '') {
      alert("Must choose a rest time");
      return;
    }else if (repsList.includes('')) {
      alert("Every set must have a rep count");
      return;
    }
    const db = getDatabase();
    const currentUser = getAuth().currentUser;
    push(ref(db, `users/${currentUser.uid}/trainingPrograms/${props.programKey}/workouts/${props.workoutKey}/exercises`), {
      exerciseName: newExerciseName,
      restTime: chosenRestTime,
      sets: repsList
    });
    alert(`Exercise "${newExerciseName}" created`);
    props.exitModal()
  }

  // Track exercise with amount of reps and weight lifted
  function trackExercise(repsList, weightList) {
    if (repsList.includes('')) {
      alert("Every set must have a rep count");
      return;
    } else if (weightList.includes(null)) {
      alert("Every set must have a weight value");
      return;
    }

    const db = getDatabase();
    const currentUser = getAuth().currentUser;
    const date = new Date();
    const sets = repsList.map((reps, index) => ({
      weight: weightList[index],
      reps: reps,
    }));

    set(ref(db, `users/${currentUser.uid}/exerciseHistory/${props.exerciseName}/${date}`), {
      sets: sets
    });
    alert(`Exercise "${props.exerciseName}" tracked`);
    props.exitModal()
  }

  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View style={styles.parentView}>
        <View style={styles.backDrop} />
        <View style={styles.contentView}>
          <View style={styles.exitButtonView}>
            <IconButton 
              onClick={props.exitModal}
              iconName="close-outline" 
              iconSize={35}
              iconColor="#F0EBD8"
            />
          </View>
          {props.showCreateExercise
            ? <>
              <DropdownComponent search={false} placeholder="Select Muscle Group" onUpdate={setChosenMuscleGroup} iconName="arm-flex"/>
              <DropdownComponent search={true} placeholder="Select Exercise" chosenMuscleGroup={chosenMuscleGroup} onUpdate={setNewExerciseName} iconName="dumbbell"/>
              <DropdownComponent search={false} placeholder="Select Rest time" chosenMuscleGroup={chosenMuscleGroup} onUpdate={setChosenRestTime} iconName="timer"/>
              <DynamicInput
                labelText="Set"
                placeholderText="reps"
                onClickCreate={addExercise}
                buttonText={props.buttonText}
              />
              </>
            : <>
              <Text style={styles.exerciseNameText}>{props.exerciseName}</Text>
              <DynamicInput
                labelText="Set"
                placeholderText="reps"
                onClickCreate={trackExercise}
                showWeightInput={true}
                buttonText={props.buttonText}
                inputLength={props.setsList.length}
              />
              </>
          }
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
    height: 640,
    width: 340,
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
  },
  exerciseNameText: {
    color: "#F0EBD8",
    fontSize: 25,
    marginBottom: 30
  }
});
