import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

//Components
import LoginScreen from './screens/login/LoginScreen';
import StackNavigator from './StackNavigator';


export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
      console.log(currentUser);
    } else {
      setCurrentUser(null)
    }
  });

  return (
    <NavigationContainer>
        {currentUser ? <StackNavigator /> : <LoginScreen/>}
    </NavigationContainer>
  );
}
