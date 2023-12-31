import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ProfileOptionButton({ navigateToScreen, title, iconname, iconColor, iconViewColor, iconType }) {
  const navigation = useNavigation();
  
  // Define the selected icon based on the specified iconType
  let selectedIcon = <Ionicons name={iconname} size={30} color={iconColor} />;
  if (iconType === 'FontAwesome') {
    selectedIcon = <FontAwesome name={iconname} size={30} color={iconColor} />;
  }


  return (
    <Pressable
      onPress={() => { navigation.navigate(navigateToScreen) }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
      ]}
    >
      <View style={styles.contentContainer}>
        {/* Icon container with background color */}
        <View style={{ ...styles.iconView, backgroundColor: iconViewColor }}>
          {selectedIcon}
        </View>
        {/* Text for the button */}
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      {/* Right arrow icon */}
      <MaterialIcons name="keyboard-arrow-right" size={40} color="#F0EBD8" style={{ position: "absolute", right: 20, top: 21 }} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 80,
    justifyContent: "center",
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconView: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: '#F0EBD8',
    fontSize: 22,
    marginLeft: 20,
  }
});
