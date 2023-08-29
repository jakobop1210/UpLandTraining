import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
      itemTextStyle={{ color: '#F0EBD8' }}
      containerStyle={styles.containerStyle}
      itemContainerStyle={{ backgroundColor: '#1D2D44' }}
      iconStyle={styles.iconStyle}
      activeColor='#748CAB'
      autoScroll={false}
      data={data}
      iconColor='#F0EBD8'
      maxHeight={250}
      labelField="label"
      valueField="value"
      placeholder="Select muscle group"
      value={value}
      onChange={item => {
        setValue(item.value);
      }}
      renderLeftIcon={() => (
        <MaterialCommunityIcons style={styles.icon} name="arm-flex" color="#F0EBD8" size={22} />
      )}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    width: "85%",
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
    marginRight: 10,
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
});