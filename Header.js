import { StyleSheet, Text, View, Pressable } from 'react-native';

// Components
import GoBackButton from "./buttons/GoBackButton";
import IconButton from './buttons/IconButton'

export default function Header({ title, showGoBackButton, showEditButton, onClickEdit }) {
  
    return (
      <View style={styles.headerContainer}>
        {showGoBackButton && <GoBackButton />}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.editButtonView}> 
          {showEditButton && 
            <IconButton 
              onClick={onClickEdit} 
              iconName="edit" 
              iconType="AntDesign" 
              iconSize={25} 
              iconColor="#F0EBD8"
              />
            }
        </View>
      </View>
    );
} 

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    height: 120,
    marginBottom: 20
  },
  title: {
    color: "#F0EBD8",
    fontSize: 30,
    marginLeft: 10
  },
  editButtonView: {
    position: "absolute",
    bottom: 0,
    right: 30,
  }
});