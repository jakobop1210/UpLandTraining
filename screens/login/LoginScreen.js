import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

//Components
import LoginOption from './LoginOption';
import RegisterOption from './RegisterOption';


export default function LoginScreen() {
    const [chooseRegister, setChooseRegister] = useState(false);

    function changeChoosenScreen() {
        setChooseRegister(!chooseRegister)
    }

    return (
      <View style={styles.container}>
          {chooseRegister
            ? <RegisterOption changeToLogin={changeChoosenScreen}/>
            : <LoginOption changeToSignup={changeChoosenScreen}/>
          }
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        position: "relative",
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: "#222831"
    }
});