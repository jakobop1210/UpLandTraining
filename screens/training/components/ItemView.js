import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

// Components
import IconButton from '../../../buttons/IconButton';
import SmallIconAndTextButton from '../../../buttons/SmallIconAndTextButton';

export default function ItemView({ workoutKey, programKey, itemName, exercises, editMode, updateEditMode, clickDelete, isProgram }) {
  const navigation = useNavigation();
  let itemCount = 0;

  if (exercises) {
    itemCount = Object.keys(exercises).length;
  }

  function deleteProgramWithKey() {
    clickDelete(programKey);
  }

  function deleteWorkoutWithKey() {
    clickDelete(workoutKey);
  }

  function showProgramNotes() {

  }

  function getTotalSets() {
    let totalSets = 0;
    if (exercises) {
      Object.keys(exercises).forEach((exerciseKey) => {
        totalSets += exercises[exerciseKey].sets.length;
      });
    }
    return totalSets;
  }

  return (
    <Pressable
      onPress={() => {
        if (editMode) {
          updateEditMode();
        }
        navigation.navigate(isProgram ? 'ProgramScreen' : 'WorkoutScreen', {
          name: itemName,
          programKey: programKey,
          ...(isProgram ? {} : { workoutKey: workoutKey }),
        });
      }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
      ]}
    >
      <View style={styles.itemDescriptionView}>
        <View style={styles.deleteButtonView}>
          {editMode ? (
            <IconButton
              onClick={isProgram ? deleteProgramWithKey : deleteWorkoutWithKey}
              iconName="delete-outline"
              iconType="MaterialIcons"
              iconSize={30}
              iconColor="#F0EBD8"
            />
          ) : (
            <MaterialIcons
              name="arrow-forward-ios"
              size={25}
              color="#F0EBD8"
            />
          )}
        </View>
        <Text style={styles.itemName}>{itemName}</Text>
        <View style={styles.itemInfoView}>
        {isProgram 
          ? <>
            <MaterialCommunityIcons name="weight-lifter" size={18} color="#F0EBD8" />
            <Text style={styles.itemInfoText}>
              {itemCount === 1 ? `${itemCount} Workout` : `${itemCount} Workouts`}
            </Text>
            <SmallIconAndTextButton
              title="Notes"
              onClick={showProgramNotes}
              iconName="description"
              iconSize={18}
            />
            </>
          : <>
            <FontAwesome5 name="dumbbell" size={15} color="#F0EBD8" />
            <Text style={styles.itemInfoText}>
              {itemCount === 1 ? `${itemCount} Exercise` : `${itemCount} Exercises`}
            </Text>
            <MaterialIcons name="timer" size={18} color="#F0EBD8" />
            <Text style={styles.itemInfoText}>{getTotalSets() * 5}min</Text>
            </>
        }
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemDescriptionView: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#3E5C76',
    borderRadius: 8,
    padding: 25,
    marginTop: 15,
  },
  itemName: {
    color: '#F0EBD8',
    fontSize: 25,
    fontWeight: '500',
    marginBottom: 8,
    width: '90%',
  },
  itemInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInfoText: {
    color: '#F0EBD8',
    marginLeft: 4,
    fontSize: 15,
    marginRight: 10,
  },
  deleteButtonView: {
    position: 'absolute',
    top: 45,
    right: 15,
  },
});
