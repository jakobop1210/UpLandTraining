import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens 
import TrainingScreen from "./TrainingScreen";
import ProgramScreen from './ProgramScreen';
import WorkoutScreen from './WorkoutScreen';
import ExerciseHistoryScreen from './ExerciseHistoryScreen'

const Stack = createNativeStackNavigator();

export default function TrainingStack() {
    
    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false
        }}> 
            <Stack.Screen 
              name="TrainingScreen"
              component={TrainingScreen}
            />
            <Stack.Screen 
              name="ProgramScreen"
              component={ProgramScreen}
            /> 
            <Stack.Screen 
              name="WorkoutScreen"
              component={WorkoutScreen}
            /> 
            <Stack.Screen 
              name="ExerciseHistory"
              component={ExerciseHistoryScreen}
            /> 
        </Stack.Navigator>
    );
}