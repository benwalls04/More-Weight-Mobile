import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useThemeContext } from '@/hooks/ThemeContext';
import { useEditContext } from '@/hooks/EditContext';

import { COLORS } from '@/constants/Colors';

const MovementPopup = ({
  movement,
  setsCpy,
  setSetsCpy
}) => {
  const theme = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const { maxIntensity } = useEditContext();

  const handleMaxIntensity = () => {
    const newSets = maxIntensity(setsCpy);
    setSetsCpy([...newSets]);
  }

  const handleValueChange = (index, field, value) => {
    // Allow decimal points for rest field
    if (field === 'rest') {
      // Allow empty string temporarily (for typing), decimal point, and numbers
      if (value === "" || value === "." || validChange(value, field)) {
        const newSets = [...setsCpy];
        newSets[index] = {
          ...newSets[index],
          [field]: value
        };
        setSetsCpy(newSets);
      }
    } else if (field === "lowerRep" || field === "upperRep") {
      const newSets = [...setsCpy];
      newSets.forEach(set => {
        set[field] = value === "" ? "" : Number(value);
      })
      setSetsCpy(newSets);
    }
      else {
      // Handle other fields - allow empty string temporarily for typing
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
      return num >= 1 && num <= 5 && (val.split('.')[1]?.length <= 2 || Number.isInteger(num));
    }

    const num = Number(val);
    if (isNaN(num)) return false;
    
    switch(field) {
      case 'RPE':
        return num >= 1 && num <= 11;
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
      <View style={styles.repRangeContainer}>
        <ThemedText>Rep Range: </ThemedText>
        <View style={styles.editableCell}>
          <TextInput
            style={styles.input}
            value={setsCpy[0].lowerRep.toString()}
            onChangeText={(value) => handleValueChange(0, 'lowerRep', value)}
            keyboardType="numeric"
            placeholder="Min"
            placeholderTextColor={colors.text}
          />
        </View>
        <ThemedText> - </ThemedText>
        <View style={styles.editableCell}>
          <TextInput
            style={styles.input}
            value={setsCpy[0].upperRep.toString()}
            onChangeText={(value) => handleValueChange(0, 'upperRep', value)}
            keyboardType="numeric"
            placeholder="Max"
            placeholderTextColor={colors.text}
          />
        </View>
      </View>
      <View style={styles.gridContainer}>
        <View style={styles.setsGrid}>
          <View style={styles.headerRow}>
            <ThemedText style={styles.headerText}>Set</ThemedText>
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
      <TouchableOpacity style={[styles.maxBtn, {backgroundColor: setsCpy.every(set => set.RPE === 10) ? colors.tint : colors.accentLight}]} onPress={handleMaxIntensity}>
        <ThemedText style={{fontSize: 14, textAlign: "center"}}>Max Intensity</ThemedText>
      </TouchableOpacity>
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
  repRangeContainer: {
    width: "70%",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    alignSelf: "center",
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
    paddingBottom: 10,
  },
  editableCell: {
    flex: 1,
    backgroundColor: colors.accentLight,
    borderRadius: 4,
    marginHorizontal: 4,
    height: 30,
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
  maxBtn: {
    height: 30,
    width: "85%",
    alignSelf: "center",
    marginTop: 10,
    backgroundColor: colors.accentLight,
    borderRadius: 0,
    borderWidth: 0,
  }
  });
}

export default MovementPopup;
