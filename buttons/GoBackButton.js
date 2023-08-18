import { StyleSheet, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function goBackButton() {
    const navigation = useNavigation();

    return (
        <Pressable 
            onPress={() => navigation.goBack()}
            style={({ pressed }) => [
                {
                  opacity: pressed
                    ? 0.5
                    : 1
                },
                styles.button
            ]}>
            <MaterialIcons name="keyboard-arrow-left" size={50} color="#F0EBD8" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 60,
        left: 10,
        height: 50,
        width: 60,  
    }
});