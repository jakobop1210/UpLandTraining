import { View, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 

export default function InputWithIcon({ value, onChange, inputRef, onSubmitRef, placeholder, iconName }) {


  return (
    <>
    <View style={styles.inputView}>
      <Ionicons name={iconName} color="#BBB" size={24} />
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor="#888"
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={onChange}
        value={value}
        secureTextEntry={iconName === "key-outline"}
        returnKeyType="next"
        onSubmitEditing={() => {
          if (onSubmitRef) {
            onSubmitRef.current.focus();
          }
        }}
        style={styles.input}
      />
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  inputView: {
    width: '100%',
    height: 60,
    marginTop: 20,
    borderColor: 'gray',
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  input: {
    width: "90%",
    height: "100%",
    paddingHorizontal: 10,
    color: "#F0EBD8",
    fontSize: 18,
  }
})
