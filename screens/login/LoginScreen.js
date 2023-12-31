import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

// Components
import LoginOption from './LoginOption';
import RegisterOption from './RegisterOption';

export default function LoginScreen() {
  const [chooseRegister, setChooseRegister] = useState(false);

  // Change between login and register screen
  function changeChoosenScreen() {
    setChooseRegister(!chooseRegister);
  }

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.linear}>
      {chooseRegister 
        ? <RegisterOption changeToLogin={changeChoosenScreen} />
        : <LoginOption changeToSignup={changeChoosenScreen} />
      }
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D1321',
  },
  linear: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
