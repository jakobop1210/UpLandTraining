import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome5 } from '@expo/vector-icons';

const data = [
  { label: 'Chest', value: 'chest' },
  { label: 'Shoulders', value: 'shoulders' },
  { label: 'Triceps', value: 'triceps' },
  { label: 'Back', value: 'back' },
  { label: 'Biceps', value: 'biceps' },
  { label: 'Quads', value: 'quads' },
  { label: 'Hamstrings', value: 'hamstrings' },
  { label: 'Glutes', value: 'glutes' },
  { label: 'Calves', value: 'calves' },
  { label: 'Abs', value: 'abs' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select muscle group"
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <FontAwesome5 style={styles.icon} name="dumbbell" color="#F0EBD8" size={20} />
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    width: "80%",
    margin: 16,
    height: 50,
    borderBottomColor: '#F0EBD8',
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#F0EBD8',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#F0EBD8',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});