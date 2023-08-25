import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../../../buttons/IconButton';

export default function ProgramView(props) {
  const navigation = useNavigation();

  // Delete program with the chosen key
  function deleteProgramWithKey() {
    props.clickDelete(props.programKey)
  }

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("ProgramScreen", {
          name: props.programName,
          key: props.programKey,
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
        {props.editMode &&
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
        <Text style={styles.programName}>{props.programName}</Text>
        <ScrollView>
          <Text style={styles.descriptionText}>
            <Text style={styles.description}>Description: </Text>
            {props.description}
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
    height: 140,
    borderRadius: 10,
    paddingTop: 15,
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
    color: "#DDDDDD",
    marginRight: 10,
    fontSize: 15,
    lineHeight: 23
  },
  description: {
    fontWeight: '600',
    color: "#F0EBD8"
  },
  deleteButtonView: {
    position: "absolute",
    top: 10,
    right: 5,
    zIndex: 1000
  }
});
