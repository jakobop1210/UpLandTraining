import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, TextInput } from 'react-native';

//Components
import ExitButton from '../../../buttons/ExitButton'


export default function AddExerciseModal({ showModal, exitModal, addWorkout }) {
    const [workoutName, setWorkoutName] = useState("");

    function createWorkout() {
        addExercise(exerciseName, inputArray);
        exitModal();
    }

    return (
        <Modal visible={showModal} animationType="fade" transparent={true}>
            <View style={styles.addWorkoutBackDrop}>
                <View style={styles.addWorkoutView}>
                    <ExitButton onClick={exitModal}/>

                </View>
            </View>
        </Modal>
    );

}

const styles = StyleSheet.create({
    addWorkoutBackDrop: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    addWorkoutView: {
        flexDirection: "column",
        alignItems: "center",
        height: 250,
        width: 300,
        backgroundColor: "#0D1321",
        padding: 10,
        paddingBottom: 60,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5
    },
});