import { StyleSheet, Text, Pressable, Image, View} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function PurpleFadedButton({ onClick, title, buttonWidth, buttonHeight, iconImage, startGradient, endGradient }) {

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
            <LinearGradient
                colors={['#482980' , '#522e92', '#673ab7']}
                start={startGradient}
                end={endGradient}
                style={{...styles.gradient, height: buttonHeight}}
            >
                <View style={styles.contentContainer}>
                  {iconImage && <Image source={iconImage} style={styles.iconImage} />}
                  <Text style={styles.buttonText}>{title}</Text>
                </View>
            </LinearGradient>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 30,
        marginBottom: 40,
      },
      gradient: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      buttonText: {
        color: '#EEEEEE',
        fontSize: 18,
      },
      iconImage: {
        width: 25,
        height: 25,
        marginRight: 10,
      },
});