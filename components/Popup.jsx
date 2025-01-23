import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeContext } from '@/hooks/ThemeContext';
import { ThemedPressable } from '@/components/ThemedPressable';
import { COLORS } from '../constants/Colors';

const Popup = ({ visible, onClose, body }) => {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose} 
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <View style={{flexDirection: 'row', width: '100%'}}>
            {body()}
          </View>
          <View style={styles.buttonContainer}>
            <ThemedPressable type="selected" onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
            </ThemedPressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

function createStyles (colors) {
  return StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    popupContainer: {
      backgroundColor: colors.popupColor,
      borderRadius: 10,
      maxHeight: "75%",
      width: '90%',
      alignItems: 'center',
      paddingBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      position: 'absolute',
      bottom: -15,
    },
    closeButton: {
      borderRadius: 0,
      width: "75%", 
      height: 30,
    },
    closeText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
    },
  });
}

export default Popup;
