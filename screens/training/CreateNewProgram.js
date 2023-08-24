import { StyleSheet, View, Text, TextInput } from 'react-native'
import { useState, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";

// Components
import GoBackButton from '../../buttons/GoBackButton';
import DynamicInput from './components/DynamicInput';
import IconButton from '../../buttons/IconButton';

export default function CreateProgramScreen() {
  const [programName, setProgramName] = useState('New Program');
  const inputRef = useRef(null);
  const [programDescription, setProgramDescription] = useState('');
  const navigation = useNavigation();

  function createProgram(workoutInput) {
    if (programName === '') {
      alert("Program name cannot be empty");
      return;
    } else if (workoutInput.includes('')) {
      alert("You have to give every workout a name");
      return;
    }
    const db = getDatabase();
    const user = getAuth().currentUser;

    const programRef = push(ref(db, 'trainingPrograms/' + user.uid), {
      programName: programName,
      programDescription: programDescription,
    });
    workoutInput.forEach((workout, index) => {
      push(ref(db, 'workouts/' + programRef.key), {
        workoutNr: index,
        workoutName: workout
      });
    })
    alert(`Program "${programName}" created`);
    navigation.goBack();
  }

  function updateHeaderEditable() {
    setHeaderEditable(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <View style={styles.programNameInputView}>
        <View style={styles.goBackButtonView}>
          <GoBackButton />
        </View>
        <TextInput
          ref={inputRef}
          autoCapitalize="none"
          onChangeText={setProgramName}
          value={programName}
          style={styles.programNameInput}
          maxLength={25}
        />
        <IconButton
          iconName="edit"
          onClick={updateHeaderEditable}
          iconSize={30}
          iconColor="#F0EBD8"
          iconType="AntDesign"
        />
      </View>
      <TextInput
        placeholder="Enter a program description..."
        multiline={true}
        maxLength={120}
        placeholderTextColor="#888"
        autoCapitalize="none"
        onChangeText={setProgramDescription}
        value={programDescription}
        style={styles.inputArea}
      />
      <View style={styles.inputsView}>
        <DynamicInput
          labelText="Day"
          placeholderText="Workout name"
          onClickCreate={createProgram}
          buttonText="Create program"
        />
      </View>
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
  programNameInputView: {
    flexDirection: "row",
    marginTop: 80,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  goBackButtonView: {
    position: "absolute",
    left: 0
  },
  programNameInput: {
    height: 40,
    color: "#F0EBD8",
    fontSize: 25,
    textAlign: "center",
    marginRight: 10
  },
  inputArea: {
    width: "75%",
    height: 100,
    paddingHorizontal: 10,
    color: "#F0EBD8",
    fontSize: 16,
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 50
  },
  inputsView: {
    backgroundColor: "#1D2D44",
    marginTop: 60,
    paddingTop: 20,
    width: "100%",
    height: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: "center"
  }
});
