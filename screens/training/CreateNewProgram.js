import { StyleSheet, View, Text, TextInput } from 'react-native'
import { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';

// Components
import Header from '../../Header';
import DynamicInput from './components/DynamicInput';
import PurpleFadedButton from '../../buttons/PurpleFadedButton';

export default function CreateProgramScreen() {
  const [programName, setProgramName] = useState('');
  const [loading, setLoading] = useState('');

  function createProgram() {

  }

  function addWorkoutInput() {

  }


  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <Header title="New program" showGoBackButton={true} />
      <TextInput
        placeholder="Enter a program name"
        placeholderTextColor="#888"
        placeholderTextSize={20}
        autoCapitalize="none"
        onChangeText={setProgramName}
        value={programName}
        style={styles.input}
      />
      <DynamicInput labelText="Day" placeholderText="Workout name"/>
      <View style={styles.createProgramButtonView}>
        {loading 
          ? <ActivityIndicator size="large" color="#F0EBD8" />
          : <PurpleFadedButton 
              title="Create Program" 
              onClick={createProgram} 
              buttonWidth="60%" 
              buttonHeight={50} 
              startGradient={[0, 0]} 
              endGradient={[1, 0]}
            />
        }
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      position: "relative",
      alignItems: 'center',
  },
  programNameLabel: {
    color: "#F0EBD8",
    fontSize: 20, 
    marginBottom: 10, 
  },
  input: {
    width: "80%",
    height: 40,
    paddingHorizontal: 10,
    color: "#F0EBD8",
    fontSize: 22,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginTop: 30
  },
  createProgramButtonView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center"
  }
});