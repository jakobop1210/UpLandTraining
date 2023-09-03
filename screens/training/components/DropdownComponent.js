import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const DropdownComponent = ({search, placeholder, chosenMuscleGroup, onUpdate, iconName}) => {
  const [value, setValue] = useState(null);
  const [data, setData] =  useState([
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
  ]);

  // Fetch all exercises from database
  useEffect(() => {
    const db = getDatabase();
    const exerciseNamesRef = ref(db, "exercises/" + chosenMuscleGroup);

    onValue(exerciseNamesRef, (snapshot) => {
      const data = snapshot.val();
      if (data && search) {
        const transformedData = Object.keys(data).map((key) => ({
          label: data[key],
          value: key,
        }));
        setData(transformedData);
      }
    });
  }, [chosenMuscleGroup]); 


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
      data={data}
      search={search}
      searchPlaceholder="Search for exercise..."
      iconColor='#F0EBD8'
      maxHeight={250}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={item => {
        setValue(item.value);
        {search ? onUpdate(item.label) : onUpdate(item.label.toLowerCase())} ;
      }}
      renderLeftIcon={() => (
          <MaterialCommunityIcons style={styles.icon} name={iconName} color="#F0EBD8" size={22} />
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
  inputSearchStyle: {
    height: 45,
    fontSize: 16,
    borderRadius: 5,
    color: '#F0EBD8',
  },
});