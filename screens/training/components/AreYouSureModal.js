import React, { useState } from 'react';
import { StyleSheet, Modal, View, Text, Dimensions } from 'react-native';

//Components
import PurpleFadedButton from '../../../buttons/PurpleFadedButton';
import TextAndIconButton from '../../../buttons/TextAndIconButton';

export default function AreYouSureModal({ showModal, exitModal}) {
    

    return (
      <Modal visible={showModal} animationType="fade" transparent={true}>
        <View style={styles.parentView}>
            <View style={styles.backDrop} />
          <View style={styles.contentView}>
            <Text style={styles.headerText}>Delete program?</Text>
            <Text style={styles.infoText}>Are you sure you want to delete the program? It will be permanently deleted</Text>
            <View style={styles.buttonsView}>
              <PurpleFadedButton 
                  title="Cancel"  
                  buttonWidth="45%" 
                  buttonHeight={50}   
                  startGradient={[1, 0]} 
                  endGradient={[0, 1]}
              />
              <PurpleFadedButton 
                  title="Delete program"  
                  buttonWidth="45%" 
                  buttonHeight={50}   
                  startGradient={[1, 0]} 
                  endGradient={[0, 1]}
              />
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: "absolute",
        width: width,
        height: height
    },
    contentView: {
        flexDirection: "column",
        height: 200,
        width: 340,
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
        marginTop: 5
    },
    buttonsView: {
        flexDirection: "row",
        marginTop: 30,
        justifyContent: "space-around"
    }
});