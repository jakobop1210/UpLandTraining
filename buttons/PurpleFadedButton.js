import { StyleSheet, Text, Pressable, Image, View } from 'react-native';
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
        {
          width: buttonWidth,
          height: buttonHeight
        }
      ]}>
      <LinearGradient
        colors={['#3E5C76', '#3E5C76', '#3E5C76', '#3E5C76', '#748CAB']}
        start={startGradient}
        end={endGradient}
        style={{ ...styles.gradient, height: buttonHeight }}
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
    color: '#F0EBD8',
    fontSize: 18,
  },
  iconImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
