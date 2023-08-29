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

export default function DropdownComponentWithSearch() {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      itemTextStyle={{ color: '#F0EBD8' }}
      containerStyle={styles.containerStyle}
      itemContainerStyle={{ backgroundColor: '#1D2D44' }}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      activeColor='#748CAB'
      autoScroll={false}
      search
      searchPlaceholder="Search for exercise..."
      data={data}
      iconColor='#F0EBD8'
      maxHeight={250}
      labelField="label"
      valueField="value"
      placeholder="Select exercise"
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <FontAwesome5 style={styles.icon} name="dumbbell" color="#F0EBD8" size={18} />
      )}
    />
  );
};


const styles = StyleSheet.create({
  dropdown: {
    width: "90%",
    margin: 16,
    height: 55,
    color: '#F0EBD8',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  containerStyle: {
    backgroundColor: '#1D2D44',
    borderWidth: 0,
  },
  icon: {
    marginRight: 12,
    marginLeft: 5,
  },
  placeholderStyle: {
    fontSize: 18,
    color: '#F0EBD8',
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#F0EBD8',
  },
  inputSearchStyle: {
    height: 50,
    fontSize: 16,
    borderRadius: 5,
  },
});