import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react'

//Components
import ProfileOverview from './ProfileOverview';
import EditProfile from './EditProfile';
import ProfileStats from './ProfileStats';
import ProfileSettings from './ProfileSettings';

const ProfileStack = createNativeStackNavigator();

export default function ProfileScreen({ route }) {
  const { loggedInUser } = route.params;


  return (
      <ProfileStack.Navigator
          screenOptions={{
            headerShown: false
      }}> 
          <ProfileStack.Screen 
            name="ProfileOverview"
            component={ProfileOverview}
            initialParams={{ loggedInUser }} 
          />
          <ProfileStack.Screen 
            name="EditProfile"
            component={EditProfile}
            initialParams={{ loggedInUser }} 
          /> 
          <ProfileStack.Screen 
            name="ProfileStats"
            component={ProfileStats}
            initialParams={{ loggedInUser }} 
          /> 
          <ProfileStack.Screen 
            name="ProfileSettings"
            component={ProfileSettings}
            initialParams={{ loggedInUser }} 
          /> 
      </ProfileStack.Navigator>
      
  )
}
