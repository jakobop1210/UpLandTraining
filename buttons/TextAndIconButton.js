import { StyleSheet, Text, Pressable, Image, View} from 'react-native';
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
              <Text style={styles.buttonText}>{title}</Text>
              <MaterialIcons name={iconName} size={iconSize} color="#F0EBD8" />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
      },
      contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
      },
      buttonText: {
        color: '#F0EBD8',
        fontSize: 18,
        marginRight: 5
      },
});