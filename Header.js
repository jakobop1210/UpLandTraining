import { StyleSheet, Text, View, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoBackButton from "./buttons/GoBackButton";

export default function Header({ title, showGoBackButton }) {
  
    return (
      <View style={styles.headerContainer}>
        {showGoBackButton && <GoBackButton />}
        <Text style={styles.title}>{title}</Text>
      </View>
    );
} 

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    height: 130,
  },
  title: {
    color: "#F0EBD8",
    fontSize: 30,
    marginLeft: 10
  },
});