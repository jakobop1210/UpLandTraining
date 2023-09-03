import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const DropdownComponent = ({search, placeholder, chosenMuscleGroup, onUpdate, iconName}) => {
  const [value, setValue] = useState(null);
  const muscleGroups = ["Chest", "Back", "Shoulders", "Biceps", "Triceps", "Quads", "Hamstrings", "Glutes", "Calves", "Abs"]
  const timeOptions = ["30s", "45s", "1min", "1min 45s", "1min 30s", "1min 45s",  "2min", "2min 30s", "3min", "3min 30s", "4min", "4min 30s", "5min"]
  const [data, setData] =  useState([])
    
  // Fetch all exercises from database
  useEffect(() => {
    const db = getDatabase();
    const exerciseNamesRef = ref(db, "exercises/" + chosenMuscleGroup);

    onValue(exerciseNamesRef, (snapshot) => {
      const data = snapshot.val();
      if (data && search) {
        setData(Object.keys(data).map((key) => ({
          label: data[key],
          value: key,
        })));
      } else if (iconName==="timer") {
        setData(timeOptions.map((timeOption) => ({
          label: timeOption,
          value: timeOption,
        })));
      } else {
        setData(muscleGroups.map((muscleGroup) => ({
          label: muscleGroup,
          value: muscleGroup.toLowerCase(),
        })));
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
    width: "80%",
    height: 55,
    margin: 10,
    color: '#F0EBD8',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
  },
  containerStyle: {
    backgroundColor: '#1D2D44',
    borderWidth: 0,
    height: 220,
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