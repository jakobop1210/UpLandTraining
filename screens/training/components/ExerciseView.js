import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import IconButton from '../../../buttons/IconButton';
import { useEffect } from 'react';
import {  MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

// Components
import SmallIconAndTextButton from '../../../buttons/SmallIconAndTextButton';

export default function ExerciseView({ exerciseName, restTime, onClick, setsList, exerciseKey, editMode, clickDelete }) {
  const navigation = useNavigation();
  
  // Delete workout with the chosen key
  function deleteWorkoutWithKey() {
    clickDelete(exerciseKey)
  }

  // Show tack exercise modal with the chosen name and sets
  function trackExercice() {
    onClick(exerciseName, setsList)
  }

  function showExerciseHistory() {
    navigation.navigate("ExerciseHistory", {
      exerciseName: exerciseName
    })
  }
  
  return (
    <Pressable
      onPress={trackExercice}
      style={({ pressed }) => [
        {
          opacity: pressed
            ? 0.5
            : 1
        },
        styles.button
      ]}>
      <View style={styles.exerciseDescriptionView}>
        {editMode &&
          <View style={styles.deleteButtonView}>
            <IconButton
              onClick={deleteWorkoutWithKey}
              iconName="delete-outline"
              iconType="MaterialIcons"
              iconSize={28}
              iconColor="#F0EBD8"
            />
          </View>
        }
        <Text style={styles.exerciseName}>{exerciseName}</Text>
        <View style={styles.listView}>
          <MaterialIcons
            name="timer" 
            size={18} color="#F0EBD8" 
            style={{ marginRight: 2 }}
          />
          <Text style={styles.exerciseInfoText}>Rest: {restTime}</Text>
          <SmallIconAndTextButton
            title="History"
            onClick={showExerciseHistory}
            iconName="history"
            iconSize={19}
          />
        </View>
        <View style={styles.listView}>
          {setsList.map((set, index) => (
            <View key={index} style={styles.setView}>
              <Text style={styles.exerciseInfoText}>{set}reps</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  exerciseDescriptionView: {
    position: "relative",
    width: "100%",
    backgroundColor: "#3E5C76",
    borderRadius: 8,
    paddingTop: 10,
    paddingLeft: 20,
    marginTop: 15
  },
  exerciseName: {
    color: "#F0EBD8",
    fontSize: 22,
    marginBottom: 8,
    width: "90%"
  },
  deleteButtonView: {
    position: "absolute",
    top: 10,
    right: 5,
    zIndex: 1000
  }, 
  listView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    alignItems: "center"
  },
  setView: {
    borderColor: "#748CAB",
    borderWidth: 1,
    borderRadius: 40,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 5,
    marginTop: 5,
    justifyContent: "center",
  },
  trackWeightView: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    right: 0,
    top: 5,
    padding: 10,
  },
  exerciseInfoText: {
    color: "#F0EBD8",
    fontSize: 15,
  }
});
