import { StyleSheet, Text, View, Pressable } from 'react-native';

// Components
import GoBackButton from "./buttons/GoBackButton";
import IconButton from './buttons/IconButton'

export default function Header({ title, showGoBackButton, showEditButton, onClickEdit }) {
  
    return (
      <View style={styles.headerContainer}>
        <View style={styles.goBackButtonView}> 
          {showGoBackButton && <GoBackButton />}
        </View>
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
        </View>
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
    height: 110,
    marginBottom: 20
  },
  titleView: {
    width: "75%",
    alignItems: "center"
  },
  title: {
    color: "#F0EBD8",
    fontSize: 25,
  },
  editButtonView: {
    position: "absolute",
    bottom: 0,
    right: 25,
  },
  goBackButtonView: {
    position: "absolute",
    bottom: -8,
    left: 0,
  }
});