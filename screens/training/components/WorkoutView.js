import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../../../buttons/IconButton';

export default function ProgramView({ workoutName, editMode, clickDelete, workoutKey }) {
  const navigation = useNavigation();

  function deleteWorkoutWithKey() {
    clickDelete(workoutKey)
  }

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("WorkoutScreen", {
          name: workoutName
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
        <Text style={styles.workoutName}>{workoutName}</Text>
        <ScrollView>
          
        </ScrollView>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  workoutDescriptionView: {
    position: "relative",
    width: 340,
    backgroundColor: "#3E5C76",
    height: 90,
    borderRadius: 10,
    paddingTop: 15,
    paddingLeft: 30,
    marginTop: 20
  },
  workoutName: {
    color: "#F0EBD8",
    fontSize: 23,
    fontWeight: "600",
    marginBottom: 8,
    width: "90%"
  },
  deleteButtonView: {
    position: "absolute",
    top: 10,
    right: 5,
    zIndex: 1000
  }
});
