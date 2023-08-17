import { StyleSheet, Text, Pressable, Image, View} from 'react-native';
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';

export default function TransparentButton({ onClick, title, buttonWidth, buttonHeight, iconname, iconType, iconsize, iconColor }) {
    let selectedIcon = <SimpleLineIcons name={iconname} size={iconsize} color={iconColor} />;

    if (iconType === 'MaterialIcons') {
        selectedIcon = <MaterialIcons name={iconname} size={iconsize} color={iconColor} />;
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
            { width: buttonWidth,
              height: buttonHeight
            } 
          ]}>
            <View style={styles.contentContainer}>
              {selectedIcon}
              {title && <Text style={styles.buttonText}>{title}</Text>}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
      },
      contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
      },
      buttonText: {
        color: '#F0EBD8',
        fontSize: 18,
        marginLeft: 10
      },
});