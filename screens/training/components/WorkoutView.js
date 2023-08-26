import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Components
import IconButton from '../../../buttons/IconButton';

export default function WorkoutView({ workoutName, editMode, updateEditMode, clickDelete, workoutKey, programKey, exercises }) {
  const navigation = useNavigation();

  // Delete workout with the chosen key
  function deleteWorkoutWithKey() {
    clickDelete(workoutKey)
  }

  function getTotalSets() {
    let totalSets = 0;
    Object.keys(exercises).forEach((exerciseKey) => {
      totalSets += exercises[exerciseKey].sets.length;
    });
    return totalSets;
  }

  return (
    <Pressable
      onPress={() => {
        {editMode && updateEditMode()}
        navigation.navigate("WorkoutScreen", {
          workoutName: workoutName,
          workoutKey: workoutKey,
          programKey: programKey
        })
      }}
      style={({ pressed }) => [
        {
          opacity: pressed
            ? 0.5
            : 1
        },
        styles.button
      ]}>
      <View style={styles.workoutDescriptionView}>
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
        <MaterialIcons 
          name="keyboard-arrow-right" 
          size={40} color="#F0EBD8" 
          style={{ position: "absolute", right: 10, top: 22 }} 
        />
        <Text style={styles.workoutName}>{workoutName}</Text>
        <View style={styles.workoutInfoView}>
          <FontAwesome5
            name="dumbbell" 
            size={15} color="#F0EBD8" 
          />
          <Text style={styles.workoutInfoText}>{Object.keys(exercises).length} exercises</Text>
          <MaterialIcons
            name="timer" 
            size={18} color="#F0EBD8" 
          />
          <Text style={styles.workoutInfoText}>{getTotalSets()*5} minutes</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  workoutDescriptionView: {
    position: "relative",
    width: "100%",
    backgroundColor: "#3E5C76",
    height: 90,
    borderRadius: 10,
    paddingTop: 15,
    paddingLeft: 30,
    marginTop: 20
  },
  workoutName: {
    color: "#F0EBD8",
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 8,
    width: "90%"
  },
  workoutInfoView: {
    flexDirection: "row",
  },
  workoutInfoText: {
    color: "#F0EBD8",
    marginLeft: 5,
    marginRight: 10
  },
  deleteButtonView: {
    position: "absolute",
    top: 10,
    right: 5,
  }
});
