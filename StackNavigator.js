import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'; 
import React from 'react';

//Screens
import HomeScreen from './screens/home/HomeScreen';
import TrainingScreen from './screens/training/TrainingScreen';
import ProgressScreen from './screens/progress/ProgressScreen';
import ProfileScreen from './screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default StackNavigator = () => {
  return (
    <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {backgroundColor: "#FFD369", height: 90},
          tabBarLabelStyle: {fontSize: 12, fontWeight: "bold"},
          tabBarInactiveTintColor: "#6B6E74",
          tabBarActiveTintColor: "#222831",
        }}>     
        <Tab.Screen name="Home" component={HomeScreen} 
          options={{
            tabBarIcon: ({color}) => (
                <FontAwesome name="home" color={color} size={26} />
            )
        }}/>
        <Tab.Screen name="Training" component={TrainingScreen} 
          options={{
            tabBarIcon: ({color}) => (
                <FontAwesome5 name="dumbbell" color={color} size={26} />
            )
        }}/>
        <Tab.Screen name="Progress" component={ProgressScreen} 
          options={{
            tabBarIcon: ({color}) => (
                <FontAwesome name="line-chart" color={color} size={26} />
            )
        }}/> 
        <Tab.Screen name="My profile" component={ProfileScreen} 
          options={{
            tabBarIcon: ({color}) => (
              <FontAwesome name="user" color={color} size={26} />
            )
        }}/>
    </Tab.Navigator>
  ) 
}
