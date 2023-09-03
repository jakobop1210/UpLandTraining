import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 

//Screens
import HomeScreen from './screens/home/HomeScreen';
import TrainingStack from './screens/training/TrainingStack';
import ProgressScreen from './screens/progress/ProgressScreen';
import ProfileStack from './screens/profile/ProfileStack';

const Tab = createBottomTabNavigator();

export default function StackNavigator() {
  return (
    <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: "#1D2D44", height: 90, borderTopWidth:0, paddingTop: 10},
          tabBarLabelStyle: {fontSize: 12, fontWeight: "bold"},
          tabBarInactiveTintColor: "#748CAB",
          tabBarActiveTintColor: "#F0EBD8",
        }}>     
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome name="home" color={color} size={26} />
            )
        }}/>
        <Tab.Screen 
          name="Training" 
          component={TrainingStack} 
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="dumbbell" color={color} size={26} />
            )
        }}/>
        <Tab.Screen 
          name="Progress" 
          component={ProgressScreen} 
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome name="line-chart" color={color} size={26} />
            )
        }}/> 
        <Tab.Screen 
        name="My profile" 
        component={ProfileStack} 
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome name="user" color={color} size={26} />
            )
        }}/>
    </Tab.Navigator>
  ) 
}
