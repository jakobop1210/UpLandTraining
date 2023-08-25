import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, ActivityIndicator } from 'react-native';

// Components
import TextAndIconButton from '../../../buttons/TextAndIconButton';
import PurpleFadedButton from '../../../buttons/PurpleFadedButton';

export default function DynamicInput(props) {
  const [loading, setLoading] = useState(false);
  const [inputFields, setInputFields] = useState(initialInputFields(props.inputLength));

  // Function to initialize input fields based on inputLength prop
  function initialInputFields(length) {
    return Array.from({ length: length || 1 }, (_, index) => ({
      id: index,
      text: '',
      weight: null,
    }));
  }

  // Function to update input fields in the state
  function updateInputFields(updatedFields) {
    setInputFields(updatedFields);
  }

  // Function to add a new input field
  function addInput() {
    const newField = { id: inputFields.length, text: '', weight: null };
    updateInputFields([...inputFields, newField]);
  }

  // Function to remove the last input field
  function removeInput() {
    if (inputFields.length > 1) {
      const updatedFields = [...inputFields];
      updatedFields.pop();
      updateInputFields(updatedFields);
    }
  }

  // Function to handle the creation action
  function callCreate() {
    // Extract text and weight values from input fields
    const textValuesList = inputFields.map((field) => field.text);
    const weightValuesList = inputFields.map((field) => field.weight);
    props.onClickCreate(textValuesList);
  }

  // Function to handle text input changes
  function handleInputChange(id, text) {
    const updatedFields = [...inputFields];
    const index = updatedFields.findIndex((field) => field.id === id);
    if (index !== -1) {
      updatedFields[index].text = text;
      updateInputFields(updatedFields);
    }
  }

  // Function to handle weight input changes
  function handleWeightChange(id, weight) {
    const updatedFields = [...inputFields];
    const index = updatedFields.findIndex((field) => field.id === id);
    if (index !== -1) {
      updatedFields[index].weight = weight;
      updateInputFields(updatedFields);
    }
  }

  return (
    <>
      <View style={styles.addRemoveButtonContainer}>
        <TextAndIconButton onClick={addInput} iconName="add" title="Add" iconSize={25} />
        <TextAndIconButton onClick={removeInput} title="Remove" iconName="remove" iconSize={25} />
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView>
          {inputFields.map((field) => (
            <View key={field.id} style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{props.labelText} {field.id + 1}</Text>
              <TextInput
                style={[styles.input, props.showWeightInput ? { width: '30%' } : {}]}
                onChangeText={(text) => handleInputChange(field.id, text)}
                placeholder={props.placeholderText}
                placeholderTextColor="#888"
                maxLength={30}
              />
              {props.showWeightInput && (
                <TextInput
                  style={[styles.input, props.showWeightInput ? { width: '45%' } : {}]}
                  onChangeText={(weight) => handleWeightChange(field.id, weight)}
                  placeholder="Weight in kg"
                  placeholderTextColor="#888"
                  maxLength={10}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#F0EBD8" />
      ) : (
        <PurpleFadedButton
          title={props.buttonText}
          onClick={callCreate}
          buttonWidth="60%"
          buttonHeight={50}
          startGradient={[0, 0]}
          endGradient={[1, 0]}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  addRemoveButtonContainer: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-evenly',
  },
  scrollViewContainer: {
    height: 270,
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputLabel: {
    color: '#F0EBD8',
    fontSize: 18,
  },
  input: {
    width: '70%',
    height: 40,
    paddingHorizontal: 10,
    fontSize: 18,
    color: '#F0EBD8',
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginLeft: 10,
  },
});
