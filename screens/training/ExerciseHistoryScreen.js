import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Components
import Header from '../../Header'
import HistoryChart from './components/HistoryChart';

export default function ExerciseHistoryScreen({ route }) {
  const exerciseName = route.params.exerciseName;
  const currentUser = getAuth().currentUser;
  const [exerciseHistory, setExerciseHistory] = useState({});
  

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
      <HistoryChart exerciseHistory={exerciseHistory}/>
      <View style={styles.historyView}>
        <ScrollView style={styles.historyScrollView}>
          {Object.keys(sortDictByDate(exerciseHistory)).map((date) => (
            <View key={date} style={styles.historyDescriptionView}>
              <Text style={styles.historyTextHeader}>{formatDate(date)}</Text>
              {exerciseHistory[date].map((set, index) => (
                <Text key={index} style={styles.historyText}>
                  {`Set ${index + 1}: ${set.reps}reps (${set.weight}kg)`}
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
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
    height: "73%",
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  historyScrollView: {
    flex: 1,
    width: '90%',
    flexDirection: "column",
  },
  historyDescriptionView: {
    flexDirection: "column",
    margin: 20,
    padding: 20,
    width: "90%",
    backgroundColor: "#1D2D44",
    borderRadius: 10,
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
});