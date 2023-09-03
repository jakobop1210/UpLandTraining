import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Components
import Header from '../../Header'

export default function ExerciseHistoryScreen({ route }) {
  const exerciseName = route.params.exerciseName;
  const currentUser = getAuth().currentUser;
  const [exerciseHistory, setExerciseHistory] = useState({});
  const [activeButton, setActiveButton] = useState('Show List');

  // Fetch exercise history based on user uid and exercise name
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, `users/${currentUser.uid}/exerciseHistory/${exerciseName}`);
    
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setExerciseHistory(
          Object.keys(data).reduce((result, date) => {
            result[date] = data[date].sets;
            return result;
          }, {})
        );
      } else {
        setExerciseHistory({});
      }
    }, (error) => {
      console.error("Error fetching exercises:", error);
    });
  }, []);

  // Function to format date
  function formatDate(date) {
    return new Date(date).toLocaleString('en-US', {day: 'numeric', month: 'long', year: 'numeric' });
  }

  function sortDictByDate(dict) {
    const exerciseHistoryArray = Object.entries(exerciseHistory);
    exerciseHistoryArray.sort((a, b) => new Date(b[0]) - new Date(a[0]));
    return Object.fromEntries(exerciseHistoryArray);
  }

  function handleButtonClick(buttonName) {
    setActiveButton(buttonName);
  }

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title={exerciseName} showGoBackButton={true} showEditButton={true}/>
      {Object.keys(sortDictByDate(exerciseHistory)).map((date) => (
        <View key={date} style={styles.historyView}>
          <Text style={styles.historyTextHeader}>{formatDate(date)}</Text>
          {exerciseHistory[date].map((set, index) => (
            <Text key={index} style={styles.historyText}>
              {`Set ${index + 1}: ${set.reps}reps (${set.weight}kg)`}
            </Text>
          ))}
        </View>
      ))}
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[styles.button, activeButton === 'Show List' ? { backgroundColor: '#3E5C76' } : {}]}
          onPress={() => handleButtonClick('Show List')}
        >
          <Text style={styles.buttonText}>Show List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, activeButton === 'Show Graph' ? { backgroundColor: '#3E5C76' } : {}]}
          onPress={() => handleButtonClick('Show Graph')}
        >
          <Text style={styles.buttonText}>Show Graph</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
  },
  historyView: {
    flexDirection: "column",
    margin: 20,
    paddingLeft: 20,
  },
  historyTextHeader: {
    color: "#F0EBD8",
    fontSize: 23,
  },
  historyText: {
    color: "#F0EBD8",
    fontSize: 16,
    marginTop: 5,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#F0EBD8',
    fontSize: 18,
  },
});