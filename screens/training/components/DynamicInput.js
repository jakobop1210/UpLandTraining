import React, { useState } from 'react';
import { StyleSheet , View, Text, TextInput, ScrollView, Input} from 'react-native';

// Components
import TextAndIconButton from '../../../buttons/TextAndIconButton';

export default function DynamicInput({ labelText, placeholderText, onChange }) {
  const [inputFields, setInputFields] = useState([]);
  const [inputs, setInputs] = useState([
    {
      inputLabel: <Text style={styles.inputLabel}>{labelText} 1</Text>,
      textInput: <TextInput
                    style={styles.input} 
                    onChangeText={(text) => setInputFields(inputFields => {
                      return inputFields.map((item, j) => {
                        return j === 0 ? text : item
                      })
                    })}
                    placeholder={placeholderText}
                    placeholderTextColor="#888"
                    maxLength={30}
                  />
    }
  ]);


  function addInput() {
      const inputNr = inputs.length + 1;
      setInputs(inputs => [...inputs, 
        {
            inputLabel: <Text style={styles.inputLabel}>{labelText} {inputNr}</Text>,
            textInput: <TextInput
                          style={styles.input} 
                          onChangeText={(text) => setInputFields(...inputFields, inputFields[inputNr-1] = text)}
                          placeholder={placeholderText}
                          placeholderTextColor="#888"
                          maxLength={30}
                        />
        }
      ]);  
  }  

  function removeInput() {
    if (inputs.length > 1) {
        let newInputs = [...inputs];
        newInputs.splice(-1, 1);
        setInputs(newInputs);
    }
  }  

  return (
      <>
        <View style={styles.addRemoveButtonContainer}>
          <TextAndIconButton onClick={addInput} iconName="add" title="Add" iconSize={25} />
          <TextAndIconButton onClick={removeInput} title="Remove" iconName="remove" iconSize={25} />
        </View>
        <View style={styles.inputsView}>
          <View style={styles.scrollViewContainer}>
          <ScrollView>
            {inputs.map((element, index) => (
              <View key={index} style={styles.inputContainer}>
                {element.inputLabel}
                {element.textInput}
              </View>
            ))}  
          </ScrollView>
          </View>
        </View>
      </>
  );
}

const styles = StyleSheet.create({
  addRemoveButtonContainer: {
      flexDirection: "row",
      marginTop: 30,
      width: "60%",
      justifyContent: "space-evenly"
  },
  inputsView: {
    width: "100%",
    marginTop: 30,
    height: 500,
    backgroundColor: "#1D2D44",
    paddingLeft: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  scrollViewContainer: {
    height: 320,
  },
  inputContainer: {
      marginTop: 30,
      flexDirection: "row",
      alignItems: "center"
  },
  inputLabel: {
      color: "#F0EBD8",
      fontSize: 18,
      marginRight: 10
  },

  input: {
    width: "70%",
    height: 50,
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#F0EBD8",
    borderColor: 'gray',
    borderBottomWidth: 1,
  }
});