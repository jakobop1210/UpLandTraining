import { StyleSheet, View, Text, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import { updateProfile, updateEmail, updatePassword, getAuth } from 'firebase/auth'; 
import { useState } from 'react'

//Components
import GoBackButton from '../../buttons/GoBackButton';
import PurpleFadedButton from '../../buttons/PurpleFadedButton';


export default function EditProfile({ route }) {
  const { loggedInUser } = route.params;
  const [name, setName] = useState(loggedInUser.displayName);
  const [email, setEmail] = useState(loggedInUser.email);
  const [password, setPassword] = useState(loggedInUser.password);
  const [confirmPassword, setConfirmPassword] = useState(loggedInUser.password);
  const [loading, setLoading] = useState('');

  const updateProfileInformation = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      alert("The passwords doesnt match!")
      return;
    }
    try {
      await updateProfile(loggedInUser, {displayName: name,});
      await updateEmail(loggedInUser, email);
      await updatePassword(loggedInUser, password);
      setLoading(false);
      alert("Profile information updated successfully!");
    } catch (error) {
      alert(error.message); 
      setLoading(false); 
    }
}

  return (
    <LinearGradient colors={['#0D1321', '#1D2D44']} style={styles.container}>
      <GoBackButton />
      <View style={styles.registerView}>
            <Text style={styles.registerHeader}>Edit Profile</Text>
            <Text style={styles.registerInformationText}>Edit information by filling in the input</Text>
            <View style={styles.inputView}>
              <Ionicons name="person-add-outline" color="#BBB" size={24} />
                <TextInput
                    placeholder="Name"
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    onChangeText={setName}
                    value={name}
                    style={styles.input}
                />
            </View>
            <View style={styles.inputView}>
              <Ionicons name="ios-mail-outline" color="#BBB" size={24} />
              <TextInput
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="#888"
                  autoCapitalize="none"
                  onChangeText={setEmail}
                  value={email}
                  style={styles.input}
              />
            </View>
            <View style={styles.inputView}>
              <MaterialCommunityIcons name="account-key-outline" color="#AAA" size={24} />
              <TextInput
                  placeholder="New password"
                  placeholderTextColor="#888"
                  autoCapitalize="none"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry
                  style={styles.input}
              />
            </View>
            <View style={styles.inputView}>
              <MaterialCommunityIcons name="account-key-outline" color="#AAA" size={24} />
              <TextInput
                  placeholder="Confirm new password"
                  placeholderTextColor="#888"
                  autoCapitalize="none"
                  onChangeText={setConfirmPassword}
                  value={confirmPassword}
                  secureTextEntry
                  style={styles.input}
              />
            </View>
            <View style={styles.registerButtonView}>
              {loading 
                  ? <ActivityIndicator size="large" color="#F0EBD8" />
                  : <PurpleFadedButton title="Update profile" onClick={updateProfileInformation} buttonWidth="100%" buttonHeight={50} startGradient={[1, 0]} endGradient={[0, 1]}/>
              }
            </View>
        </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center"
  },
  registerView: {
      width: "70%",
      height: "60%",
  },
  registerHeader: {
      color: "#F0EBD8",
      fontSize: 35,
      fontWeight: "300",
      marginBottom: 5
  },
  registerInformationText: {
      color: "#999",
      fontSize: 12,
      marginLeft: 2
  },
  inputView: {
      width: '100%',
      height: 60,
      marginTop: 20,
      borderColor: 'gray',
      borderBottomWidth: 1,
      flexDirection: "row",
      alignItems: "center"
  },
  input: {
      width: "90%",
      height: "100%",
      paddingHorizontal: 10,
      color: "white",
      fontSize: 18,
      borderRadius: 5,
  },
  registerButtonView: {
      height: 120,
      justifyContent: "center"
  },
});