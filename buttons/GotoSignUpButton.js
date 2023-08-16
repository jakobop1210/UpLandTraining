import { StyleSheet, Pressable, Text } from 'react-native'
import React from 'react'

const GotoSignUpButton = () => {
  return (
    <Pressable 
        style={({ pressed }) => [
            {
              opacity: pressed
                ? 0.5
                : 1
            }
    ]}>
        <Text style={styles.gotoSignupButtonText}>SIGN UP</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    gotoSignupButtonText: {
        fontSize: 17,
        color: "#6A5ACD",
        marginLeft: 6
    }
})

export default GotoSignUpButton