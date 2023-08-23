import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import ProfileScreen from './ProfileScreen';
import EditProfile from './EditProfile';
import ProfileStats from './ProfileStats';
import ProfileSettings from './ProfileSettings';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        name="ProfileStats"
        component={ProfileStats}
      />
      <Stack.Screen
        name="ProfileSettings"
        component={ProfileSettings}
      />
    </Stack.Navigator>
  )
}
