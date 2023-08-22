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
            ]}>
            <MaterialIcons name="keyboard-arrow-left" size={45} color="#F0EBD8" />
        </Pressable>
    );
}
