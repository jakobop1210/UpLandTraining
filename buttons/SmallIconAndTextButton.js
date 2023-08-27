import { StyleSheet, Text, Pressable, View} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TextAndIconButton({ onClick, title, iconName, iconSize }) {
  
  return (
    <Pressable 
      onPress={onClick}
      style={({ pressed }) => [
      {
        opacity: pressed
          ? 0.5
          : 1
      },
      styles.button
    ]}>
      <View style={styles.contentContainer}>
        <MaterialIcons name={iconName} size={iconSize} color="#F0EBD8" />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingLeft: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center"
  },
  buttonText: {
    color: '#F0EBD8',
    fontSize: 15,
    marginLeft: 2
  },
});