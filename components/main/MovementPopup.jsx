import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeContext } from '@/hooks/ThemeContext';
import { COLORS } from '@/constants/Colors';

const MovementPopup = ({
  movement,
  setsCpy,
  setSetsCpy
}) => {
  const theme = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const handleValueChange = (index, field, value) => {
    // Allow decimal points for rest field
    if (field === 'rest') {
      // Allow empty string, decimal point, and numbers
      if (value === "" || value === "." || validChange(value, field)) {
        const newSets = [...setsCpy];
        newSets[index] = {
          ...newSets[index],
          [field]: value === "" ? "" : value
        };
        setSetsCpy(newSets);
      }
    } else {
      // Handle other fields as before
      if (value === "" || validChange(value, field)) {
        const newSets = [...setsCpy];
        newSets[index] = {
          ...newSets[index],
          [field]: value === "" ? "" : Number(value)
        };
        setSetsCpy(newSets);
      }
    }
  };

  function validChange(val, field) {
    if (field === 'rest') {
      // Allow numbers with up to two decimal places between 1 and 5
      const num = parseFloat(val);
      if (isNaN(num)) return false;
      return num >= 1 && num <= 5 && val.split('.')[1]?.length <= 2;
    }

    const num = Number(val);
    if (isNaN(num)) return false;
    
    switch(field) {
      case 'RPE':
        return num >= 7 && num <= 11;
      case 'lowerRep':
      case 'upperRep':
        return Number.isInteger(num) && num > 0;
      default:
        return false;
    }
  }

  const renderSetRow = ({ item: set, index }) => (
    <View style={styles.setRow}>
      <ThemedText style={styles.cellText}>{index + 1}</ThemedText>
      <View style={styles.editableCell}>
        <TextInput
          style={styles.input}
          value={setsCpy[index].lowerRep.toString()}
          onChangeText={(value) => handleValueChange(index, 'lowerRep', value)}
          keyboardType="numeric"
          placeholder="Min"
          placeholderTextColor={colors.text}
        />
      </View>
      <View style={styles.editableCell}>
        <TextInput
          style={styles.input}
          value={setsCpy[index].upperRep.toString()}
          onChangeText={(value) => handleValueChange(index, 'upperRep', value)}
          keyboardType="numeric"
          placeholder="Max"
          placeholderTextColor={colors.text}
        />
      </View>
      <View style={styles.editableCell}>
        <TextInput
          style={styles.input}
          value={setsCpy[index].RPE.toString()}
          onChangeText={(value) => handleValueChange(index, 'RPE', value)}
          keyboardType="numeric"
          placeholder="RPE"
          placeholderTextColor={colors.text}
        />
      </View>
      <View style={styles.editableCell}>
        <TextInput
          style={styles.input}
          value={setsCpy[index].rest.toString()}
          onChangeText={(value) => handleValueChange(index, 'rest', value)}
          keyboardType="numeric"
          placeholder="Rest"
          placeholderTextColor={colors.text}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ThemedText type="header" style={{marginVertical: 15, alignSelf: "center"}}>{movement}</ThemedText>
      <View style={styles.gridContainer}>
        <View style={styles.setsGrid}>
          <View style={styles.headerRow}>
            <ThemedText style={styles.headerText}>Set</ThemedText>
            <ThemedText style={styles.headerText}>Min Reps</ThemedText>
            <ThemedText style={styles.headerText}>Max Reps</ThemedText>
            <ThemedText style={styles.headerText}>RPE</ThemedText>
            <ThemedText style={styles.headerText}>Rest</ThemedText>
          </View>
          <FlatList
            data={setsCpy}
            renderItem={renderSetRow}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={setsCpy.length > 6}
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
    width: "100%",
  },
  imageContainer: {
    width: '100%',
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
    backgroundColor: colors.accentLight,
    borderRadius: 4,
    marginHorizontal: 4,
    height: 35,
    justifyContent: 'center',
  },
  input: {
    color: colors.text,
    textAlign: 'center',
    height: '100%',
    fontSize: 14,
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
  },
  });
}

export default MovementPopup;
