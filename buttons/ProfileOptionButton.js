import { StyleSheet, Text, Pressable, Image, View} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function ProfileOptionButton({ onClick, title, iconname, iconColor, iconViewColor, iconType }) {
    let selectedIcon = <Ionicons name={iconname} size={30} color={iconColor} />;

    if (iconType === 'FontAwesome') {
        selectedIcon = <FontAwesome name={iconname} size={30} color={iconColor} />;
    } 

    return (
        <Pressable 
            onPress={onClick}
            style={({ pressed }) => [
            {
              opacity: pressed
                ? 0.5
                : 1
            },
            styles.button,
          ]}>
            <View style={styles.contentContainer}>
              <View style={{...styles.iconView, backgroundColor: iconViewColor}}>
                {selectedIcon}
              </View>
              <Text style={styles.buttonText}>{title}</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={40} color="#F0EBD8" style={{position: "absolute", right: 20, top: 21}} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: "100%",
        height: 80,
        justifyContent: "center",
      },
      contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      iconView: {
        width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
      },
      buttonText: {
        color: '#F0EBD8',
        fontSize: 22,
        marginLeft: 20
      }
});