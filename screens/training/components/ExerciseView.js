import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import IconButton from '../../../buttons/IconButton';
import { useEffect } from 'react';

// Components


export default function ExerciseView({ exerciseName, onClick, setsList, exerciseKey, editMode, clickDelete }) {
  
  // Delete workout with the chosen key
  function deleteWorkoutWithKey() {
    clickDelete(exerciseKey)
  }

  // Show tack exercise modal with the chosen name and sets
  function trackExercice() {
    onClick(exerciseName, setsList)
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
              iconSize={30}
              iconColor="#F0EBD8"
            />
          </View>
        }
        <Text style={styles.exerciseName}>{exerciseName}</Text>
        <View style={styles.setsListView}>
          <Text style={styles.setText}>{setsList.length} total set:  </Text>
          {setsList.map((set, index) => (
            <Text key={index} style={styles.setText}>
              {index != setsList.length-1 ? `${set}reps, ` : `${set}reps`}
            </Text>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  exerciseDescriptionView: {
    position: "relative",
    width: 360,
    backgroundColor: "#3E5C76",
    minHeight: 75,
    borderRadius: 10,
    paddingTop: 10,
    paddingLeft: 10,
    marginTop: 15
  },
  exerciseName: {
    color: "#F0EBD8",
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 8,
    width: "90%"
  },
  deleteButtonView: {
    position: "absolute",
    top: 10,
    right: 5,
    zIndex: 1000
  }, 
  setsListView: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10
  },
  setText: {
    color: "#DDD",
    fontSize: 15,
  }
});
