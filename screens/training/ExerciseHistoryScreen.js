import { StyleSheet, View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getAuth } from 'firebase/auth';

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



  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      {Object.keys(exerciseHistory).map((date) => (
        <View style={styles.historyView}key={date}>
          <Text style={styles.historyText}>{formatDate(date)}</Text>
          {exerciseHistory[date].map((set, index) => (
            <Text style={styles.historyText}key={index}>
              {`Set ${index + 1}: ${set.reps}reps (${set.weight})kg`}
            </Text>
          ))}
        </View>
      ))}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    position: "relative",
    alignItems: 'center',
    justifyContent: "center",
  },
  historyView: {
    flexDirection: "column",
    margin: 20
  },
  historyText: {
    color: "#F0EBD8",
    fontSize: 20,
  }
});