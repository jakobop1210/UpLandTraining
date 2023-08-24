import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, Input } from 'react-native';

// Components
import TextAndIconButton from '../../../buttons/TextAndIconButton';
import PurpleFadedButton from '../../../buttons/PurpleFadedButton';

export default function DynamicInput({ labelText, placeholderText, onClickCreate, buttonText }) {
  const [loading, setLoading] = useState(false);
  const [valuesList, setValuesList] = useState(['']);
  const [inputFields, setInputFields] = useState([
    {
      inputLabel: <Text style={styles.inputLabel}>{labelText} 1</Text>,
      textInput: <TextInput
        style={styles.input}
        onChangeText={(text) => updateValuesList(text, valuesList.length - 1)}
        placeholder={placeholderText}
        placeholderTextColor="#888"
        maxLength={30}
      />
    }
  ]);

  function callCeate() {
    onClickCreate(valuesList)
  }

  // Add input to screen by clicking the "Add+" button
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

  // Remove input from screen by clicking the "Remove-" button
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

  // Update valuesList when editing one of the inputs
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
      {loading
        ? <ActivityIndicator size="large" color="#F0EBD8" />
        : <PurpleFadedButton
            title={buttonText}
            onClick={callCeate}
            buttonWidth="60%"
            buttonHeight={50}
            startGradient={[0, 0]}
            endGradient={[1, 0]}
          />
      }
    </>
  );
}

const styles = StyleSheet.create({
  addRemoveButtonContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-evenly"
  },
  scrollViewContainer: {
    height: 270,
    marginBottom: 20
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  inputLabel: {
    color: "#F0EBD8",
    fontSize: 18,
    marginRight: 10
  },
  input: {
    width: "70%",
    height: 40,
    paddingHorizontal: 10,
    fontSize: 18,
    color: "#F0EBD8",
    borderColor: 'gray',
    borderBottomWidth: 1,
  }
});
