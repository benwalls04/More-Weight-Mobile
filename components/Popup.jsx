import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useThemeContext } from '@/hooks/ThemeContext';
import { ThemedPressable } from '@/components/ThemedPressable';
import { COLORS } from '../constants/Colors';
import { useEditContext } from '@/hooks/EditContext';

const Popup = ({ visible, onClose, extraClose, body, canClose=true}) => {
  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const handleClose = () => {
    if (canClose) {
      onClose();

      if (extraClose) {
        extraClose();
      }
    }
  }
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose} 
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          <View style={styles.contentWrapper}>
            {body()}
          </View>
          <View style={styles.buttonContainer}>
            <ThemedPressable type="selected" onPress={handleClose} style={styles.closeButton} label="Close" hint="Closes the popup">
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
      width: '90%',
      padding: 15,
      overflow: 'hidden',
      maxHeight: "80%",
    },
    contentWrapper: {
      width: '100%',
      backgroundColor: colors.popupColor,
      marginBottom: 15,
      paddingVertical: 10,
    }, 
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginTop: 5,
    },
    closeButton: {
      borderRadius: 0,
      width: "100%", 
      height: 45,
    },
    closeText: {
      textAlign: 'center',
      color: 'white',
      fontSize: 16,
      fontWeight: '500',
    },
  });
}

export default Popup;
