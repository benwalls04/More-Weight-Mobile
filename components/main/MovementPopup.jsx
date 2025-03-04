import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeContext } from '@/hooks/ThemeContext';
import { COLORS } from '@/constants/Colors';

const MovementPopup = ({
  sets,
  movement,
}) => {
  const theme = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  function validChange(val, field) {
    if (isNaN(val)) {
      return false;
    }
    if (field === 'RPE') {
      if (val < 7 || val > 11) {
        return false;
      }
    } else {
      if (val < 1 || val > 5) {
        return false;
      }
    }
    return true;
  }

  const renderSetRow = ({ item: set, index }) => (
    <View style={styles.setRow}>
      <ThemedText style={styles.cellText}>{index + 1}</ThemedText>
      <TouchableOpacity 
        style={styles.editableCell}
        onPress={() => {/* Add your edit logic here */}}
      >
        <ThemedText style={styles.cellText}>{set.RPE}</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.editableCell}
        onPress={() => {/* Add your edit logic here */}}
      >
        <ThemedText style={styles.cellText}>{set.rest}</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ThemedText type="header" style={{marginVertical: 15, alignSelf: "center"}}>{movement}</ThemedText>
      <View style={styles.gridContainer}>
        <View style={styles.setsGrid}>
          <View style={styles.headerRow}>
            <ThemedText style={styles.headerText}>Set</ThemedText>
            <ThemedText style={styles.headerText}>RPE</ThemedText>
            <ThemedText style={styles.headerText}>Rest</ThemedText>
          </View>
          <FlatList
            data={sets}
            renderItem={renderSetRow}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={sets.length > 6}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <View style={styles.imageContainer}>
        {/* Placeholder for image */}
      </View>
    </View>
  );
};

function createStyles(colors) {
  return StyleSheet.create({
    container: {
    width: '100%',
    flexDirection: "column",
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  gridContainer: {
    width: "50%",
  },
  imageContainer: {
    width: '50%',
  },
  setsGrid: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  editableCell: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: colors.accentLight,
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
  },
  });
}

export default MovementPopup;
