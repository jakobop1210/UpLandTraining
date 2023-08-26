import { StyleSheet, Modal, View, Text, Dimensions } from 'react-native';

// Components
import TextButton from '../../../../buttons/TextButton';

export default function AreYouSureModal({ exitModal, chosenKey , deleteElement, whatToDelete }) {

  // Delete the chosen elements from the database and exit the modal
  function iAmSure() {
    deleteElement(chosenKey)
    exitModal()
  }

  return (
    <Modal visible={true} animationType="fade" transparent={true}>
      <View style={styles.parentView}>
        <View style={styles.backDrop} />
        <View style={styles.contentView}>
          <Text style={styles.headerText}>Delete {whatToDelete}?</Text>
          <Text style={styles.infoText}>Are you sure you want to delete {whatToDelete}? It will be deleted permanently, and cannot be restored.</Text>
          <View style={styles.buttonsView}>
            <TextButton title="Cancel" onClick={exitModal} />
            <TextButton title="Yes, I'm sure" onClick={iAmSure} />
          </View>
        </View>
      </View>
    </Modal>
  );

}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backDrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: "absolute",
    width: width,
    height: height
  },
  contentView: {
    flexDirection: "column",
    height: 220,
    width: 320,
    backgroundColor: "#1D2D44",
    padding: 20,
    borderRadius: 20,
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5
  },
  headerText: {
    color: "#F0EBD8",
    fontSize: 25
  },
  infoText: {
    color: "#CCC",
    fontSize: 16,
    marginTop: 5,
    lineHeight: 25
  },
  buttonsView: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-around"
  }
});
