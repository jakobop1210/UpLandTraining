import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseAuth';

//Components
import IconButton from '../../buttons/IconButton';
import TextAndIconButton from '../../buttons/TextAndIconButton';
import ProfileOptionButton from '../../buttons/ProfileOptionButton';

export default function ProfileOverview() {
  const [loggedInUser, setLoggedInUser] = useState(auth.currentUser);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && setLoggedInUser(auth.currentUser);
  }, [isFocused]);

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      alert(console.error(e))
    }
  };

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
        <View style={styles.userInfoView}>
            <View style={styles.profileImageView}>
            <FontAwesome name="user-o" style={styles.userProfileIcon} />
            <View style={styles.addProfileImageView}>
                <IconButton iconName="add-a-photo" iconType="MaterialIcons" iconSize={25} iconColor="#0D1321"/>
            </View>
            </View>
            <Text style={styles.loggedInAsText}>Logged in as</Text>
            <Text style={styles.userNameText}>{loggedInUser.displayName}</Text>
            <Text style={styles.loggedInAsText}>{loggedInUser.email}</Text>
        </View>
        <View style={styles.userOptionsView}>
            <ProfileOptionButton navigateToScreen="EditProfile" title="Edit profile" iconname="user" iconColor="#4c3228" iconViewColor="#a08679" iconType="FontAwesome" />
            <ProfileOptionButton navigateToScreen="ProfileStats" title="My stats" iconname="stats-chart" iconColor="#1D2D44" iconViewColor="#748CAB" />
            <ProfileOptionButton navigateToScreen="ProfileSettings" title="Settings" iconname="settings" iconColor="#333333" iconViewColor="#989898" />
            <ProfileOptionButton title="Help" iconname="chatbox" iconColor="#a94b58" iconViewColor="#ddb2b8" />
        </View>
        <View style={styles.signoutButtonView}>
            <TextAndIconButton title="Sign Out" onClick={logOut} iconName="logout" iconSize={25}/>
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
        justifyContent: "center",
    },
    userInfoView: {
      height: "45%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    },
    userOptionsView: {
      height: "55%",
      width: "100%",
      backgroundColor: "#1D2D44",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingLeft: 30,
      paddingTop: 20
    },
    profileImageView: {
      borderColor: "#748CAB",
      borderWidth: 2,
      borderRadius: 100,
      width: 130,
      height: 130,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 25
    },
    addProfileImageView: {
      width: 40,
      height: 40,
      position: 'absolute',
      backgroundColor: "#748CAB",
      borderRadius: 100,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    userProfileIcon: {
      color: "#748CAB",
      fontSize: 60
    },
    loggedInAsText: {
      color: "#F0EBD8",
      fontSize: 13,
      opacity: 0.7, 
      marginBottom: 5,
      marginTop: 5
    },
    userNameText: {
      color: "#F0EBD8",
      fontSize: 30
    },
    signoutButtonView: {
        width: "100%",
        position: "absolute",
        bottom: 15,
        alignItems: "center"
      }
  });