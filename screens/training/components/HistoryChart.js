import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";
import { useState } from 'react'

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

export default function HistoryChart({ exerciseHistory }) {
  const [selectedRange, setSelectedRange] = useState('lastMonth');

  

  return (
    <View style={styles.chartContainer}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryBar data={data} x="quarter" y="earnings" />
      </VictoryChart>
      <View style={styles.rangeButtonsContainer}>
        <TouchableOpacity
          style={[styles.rangeButton, selectedRange === 'lastMonth' && styles.selectedButton]}
          onPress={() => setSelectedRange('lastMonth')}
        >
          <Text>Last Month</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rangeButton, selectedRange === 'thisYear' && styles.selectedButton]}
          onPress={() => setSelectedRange('thisYear')}
        >
          <Text>This Year</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.rangeButton, selectedRange === 'allTime' && styles.selectedButton]}
          onPress={() => setSelectedRange('allTime')}
        >
          <Text>All Time</Text>
        </TouchableOpacity>
      </View>
    </View>
  
  )
}


const styles = StyleSheet.create({
  chartContainer: {
    padding: 10,
  },
  rangeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  rangeButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#748CAB',
  },
});
