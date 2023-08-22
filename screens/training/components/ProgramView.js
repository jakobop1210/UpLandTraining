import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import IconButton from '../../../buttons/IconButton';

export default function ProgramDescriptionContainer({ programName, description, editMode, deleteProgram, programKey }) {
    const navigation = useNavigation();

    function deleteProgramWithKey() {
        deleteProgram(programKey)
    }

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
            <View style={styles.ProgramDescriptionView}>
              {editMode && 
                <View style={styles.deleteButtonView}>
                  <IconButton 
                    onClick={deleteProgramWithKey} 
                    iconName="delete-outline" 
                    iconType="MaterialIcons" 
                    iconSize={30} 
                    iconColor="#F0EBD8"
                  />
                </View>
              }
              <Text style={styles.programName}>{programName}</Text>   
              <ScrollView>
                <Text style={styles.descriptionText}>
                    <Text style={styles.description}>Description: </Text>
                    {description}
                </Text>
              </ScrollView>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    ProgramDescriptionView: {
        position: "relative",
        width: 360,
        backgroundColor: "#3E5C76",
        height: 135,
        borderRadius: 10,
        paddingTop: 20,
        paddingLeft: 20,
        marginTop: 30
    },
    programName: {
        color: "#F0EBD8",
        fontSize: 25,   
        fontWeight: "600",
        marginBottom: 8,
        width: "90%"
    },
    descriptionText: {
        color: "#F0EBD8",
        marginRight: 10,
        fontSize: 15
    },
    description: {
        fontWeight: '800'
    },
    deleteButtonView: {
        position: "absolute",
        top: 10,
        right: 5,
        zIndex: 1000
    }
});