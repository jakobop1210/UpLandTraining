import { StyleSheet, Text, Pressable } from 'react-native';

export default function LoginProviderButton({ onClick, title, textColor }) {

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
           <Text style={{...styles.buttonText, color: textColor}}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: "48%",
        borderRadius: 10,
        backgroundColor: "#CCC",
      },
      buttonText: {
        color: '#EEEEEE',
        fontSize: 20,
        fontWeight: '600',
      },
});