import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseAuth';

//Components
import TransparentButton from '../../buttons/TransparentButton';
import ProfileOptionButton from '../../buttons/ProfileOptionButton';

export default function ProfileOverview({ route }) {
  const { loggedInUser } = route.params;

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
        <View style={styles.userInfoView}>
            <View style={styles.profileImageView}>
            <FontAwesome name="user-o" style={styles.userProfileIcon} />
            <View style={styles.addProfileImageView}>
                <TransparentButton buttonWidth={40} buttonHeight={40} iconname="add-a-photo" iconType="MaterialIcons" iconsize={25} iconColor="#0D1321"/>
            </View>
            </View>
            <Text style={styles.loggedInAsText}>Logged in as</Text>
            <Text style={styles.userNameText}>{loggedInUser.displayName}</Text>
        </View>
        <View style={styles.userOptionsView}>
            <ProfileOptionButton navigateToScreen="EditProfile" title="Edit profile" iconname="user" iconColor="#4c3228" iconViewColor="#a08679" iconType="FontAwesome" />
            <ProfileOptionButton navigateToScreen="ProfileStats" title="My stats" iconname="stats-chart" iconColor="#1D2D44" iconViewColor="#748CAB" />
            <ProfileOptionButton navigateToScreen="ProfileSettings" title="Settings" iconname="settings" iconColor="#333333" iconViewColor="#989898" />
            <ProfileOptionButton title="Help" iconname="chatbox" iconColor="#a94b58" iconViewColor="#ddb2b8" />
        </View>
        <View style={styles.signoutButtonView}>
            <TransparentButton title="Sign Out" onClick={logOut} buttonWidth="40%" buttonHeight={50} iconname="logout" iconsize={20} iconColor="#F0EBD8"/>
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
      height: "50%",
      width: "100%",
      alignItems: "center",
      justifyContent: "center"
    },
    userOptionsView: {
      height: "50%",
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
      borderRadius: "100%",
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
      borderRadius: "100%",
      right: 0,
      bottom: 0,
    },
    userProfileIcon: {
      color: "#748CAB",
      fontSize: 60
    },
    loggedInAsText: {
      color: "#F0EBD8",
      fontSize: 13,
      opacity: 0.7, 
      marginBottom: 5
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