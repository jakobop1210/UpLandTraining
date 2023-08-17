import { StyleSheet, Pressable, Text } from 'react-native'
import React from 'react'

export default function GotoSignUpButton({ onClick, title }) {
  return (
    <Pressable 
      onPress={onClick}
      style={({ pressed }) => [
        {
          opacity: pressed
            ? 0.5
            : 1
        }
      ]}>
        <Text style={styles.gotoSignupButtonText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    gotoSignupButtonText: {
        fontSize: 17,
        color: "#748CAB",
        marginLeft: 6
    }
})
