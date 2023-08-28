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
  const DropdownWithSearch = ({ placeholderText }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    
    return (
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: '#F0EBD8' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={placeholderText}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <FontAwesome5
              style={styles.icon}
              color={isFocus ? '#F0EBD8' : '#F0EBD8'}
              name="dumbbell"
              size={15}
            />
          )}
        />
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      marginTop: 10,
      padding: 16,
      width: '100%',
      color: '#F0EBD8',
    },
    dropdown: {
      height: 55,
      borderColor: '#748CAB',
      color: '#F0EBD8',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 10,
      marginLeft: 5,
    },
    label: {
      position: 'absolute',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color: '#F0EBD8',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#F0EBD8',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      backgroundColor: '#1D2D44',
      color: '#F0EBD8',
    },
  });