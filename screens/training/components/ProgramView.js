import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProgramDescriptionContainer({ programName, splitLength, focusPoint, editMode }) {
    const navigation = useNavigation();

    return (
        <Pressable 
            onPress={() => {
                navigation.navigate("ProgramScreen", {
                    name: programName
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
            <View style={styles.ProgramDescriptionContainer}>
                {editMode && <MaterialIcons name="delete-outline" size={25} color="#F0EBD8" style={{position: "absolute", top: 10, right: 10}}/>}
                <View>
                    <Text style={styles.programName}>{programName}</Text>    
                </View>
                <View style={styles.programListContainer}>
                    <Text style={styles.programText}>Split length: {splitLength} days</Text>
                    <Text style={styles.programText}>Focuspoint: {focusPoint}</Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    ProgramDescriptionContainer: {
        position: "relative",
        width: 300,
        backgroundColor: "#3E5C76",
        height: 85,
        borderRadius: 10,
        padding: 10,
        marginTop: 20
    },
    programName: {
        color: "#F0EBD8",
        fontSize: 25,   
        fontWeight: "600",
        marginLeft: 10
    },
    programListContainer: {
        flexDirection: "row",
        marginTop: 5,
    },
    programText: {
        color: "#F0EBD8",
        marginLeft: 8
    }
});