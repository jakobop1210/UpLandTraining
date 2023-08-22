import { StyleSheet, Text, Pressable } from 'react-native';


export default function TextButton({ title, onClick }) {

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
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 120,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        color: "#F0EBD8",
        fontSize: 18
    }
});