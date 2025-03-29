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
  
  return (visible &&
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
        </View>
        <View style={styles.buttonContainer}>
          <ThemedPressable type="selected" onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
          </ThemedPressable>
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
    },
    contentWrapper: {
      flex: 1,
      width: '100%',
      backgroundColor: colors.popupColor,
    }, 
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
    },
    closeButton: {
      borderRadius: 0,
      width: "90%", 
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
