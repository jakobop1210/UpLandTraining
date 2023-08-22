import React, { useState } from 'react';
import { StyleSheet , View, Text, TextInput, ScrollView, Input} from 'react-native';

// Components
import TextAndIconButton from '../../../buttons/TextAndIconButton';
import PurpleFadedButton from '../../../buttons/PurpleFadedButton';

export default function DynamicInput({ labelText, placeholderText, createProgram }) {
  const [loading, setLoading] = useState(false);
  const [valuesList, setValuesList] = useState(['']);
  const [inputFields, setInputFields] = useState([
    {
      inputLabel: <Text style={styles.inputLabel}>{labelText} 1</Text>,
      textInput: <TextInput
                    style={styles.input} 
                    onChangeText={(text) => updateValuesList(text, valuesList.length-1)}
                    placeholder={placeholderText}
                    placeholderTextColor="#888"
                    maxLength={30}
                  />
    }
  ]);

  function callCeateProgram() {  
    createProgram(valuesList)
  }

  function addInput() {
    const inputNr = inputFields.length + 1;
    setInputFields(inputFields => [...inputFields, 
      {
        inputLabel: <Text style={styles.inputLabel}>{labelText} {inputNr}</Text>,
        textInput: <TextInput
                      style={styles.input} 
                      onChangeText={(text) => updateValuesList(text, valuesList.length)}
                      placeholder={placeholderText}
                      placeholderTextColor="#888"
                      maxLength={30}
                    />
      }
    ]); 
    setValuesList([...valuesList, ''])
  }  

  function removeInput() {
    if (inputFields.length > 1) {
      let newInputs = [...inputFields];
      newInputs.splice(-1, 1);
      setInputFields(newInputs);
      let newList = [...valuesList];
      newList.splice(-1, 1);
      setValuesList(newList);
    }
  } 

  function updateValuesList(text, inputNr) {
    setValuesList(prevValuesList => {
      const newList = [...prevValuesList];
      newList[inputNr] = text;
      return newList;
    });
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
            {inputFields.map((element, index) => (
              <View key={index} style={styles.inputContainer}>
                {element.inputLabel}
                {element.textInput}
              </View>
            ))}  
          </ScrollView>
          </View>
        </View>
        <View style={styles.createProgramButtonView}>
          {loading 
            ? <ActivityIndicator size="large" color="#F0EBD8" />
            : <PurpleFadedButton 
                title="Create Program" 
                onClick={callCeateProgram} 
                buttonWidth="60%" 
                buttonHeight={50} 
                startGradient={[0, 0]} 
                endGradient={[1, 0]}
              />
          }
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
    marginTop: 20,
    height: 500,
    backgroundColor: "#1D2D44",
    paddingLeft: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  scrollViewContainer: {
    height: 270,
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
    width: "60%",
    height: 40,
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#F0EBD8",
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
  createProgramButtonView: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center"
  }
});