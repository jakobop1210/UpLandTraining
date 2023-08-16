import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//Components
import StackNavigator from './StackNavigator';
import LoginScreen from './screens/login/LoginScreen';


export default function App() {
  return (
    <NavigationContainer>
      <LoginScreen/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
