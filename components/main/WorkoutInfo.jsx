import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, Image } from 'react-native';
import { MOVEMENTS } from "@/constants/Movements";
import { useEditContext } from "@/hooks/EditContext";
import { useUserContext } from "@/hooks/UserContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPressable } from "@/components/ThemedPressable";

export default function WorkoutInfo({workoutIndex, dayIndex, movement}) {

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const { addMovement, removeMovement, moveUp, moveDown, changeMovement, changeBias, getSubOptions } = useEditContext();
  const { routineCpy } = useUserContext();

  const lowerRep = routineCpy[dayIndex].movements[workoutIndex].lowerRep;
  const upperRep = routineCpy[dayIndex].movements[workoutIndex].upperRep;
  const bias = movement === "new movement"? 'neutral': routineCpy[dayIndex].movements[workoutIndex].bias;
  // FIXME: add logic for dropdowns after styling. 
  const showDropdown = false;

  const handleBias = (index) => {
    if (tagsSelect[index] === false){
      const newBias = tags[index];
      let newTagsSelect = new Array(tagsSelect.length).fill(false);
      newTagsSelect[index] = true;
      setTagsSelect(newTagsSelect);
      changeBias(dayIndex, workoutIndex, movement, newBias);
      setBiasText(MOVEMENTS[movement].variants[newBias]);
    }
  }

  const initBiasText = () => {
    if (movement === "new movement"){
      return '';
    } else {
      return MOVEMENTS[movement].variants[bias];
    }
  }
  
  const [biasText, setBiasText] = useState(initBiasText());
  useEffect(() => {
    setBiasText(initBiasText());
  }, [bias, movement])

  const initTags = () => {
    let tags = [];

    if (movement !== "new movement"){
      MOVEMENTS[movement].biasOrder.forEach(icon => {
        if (!tags.includes(icon)){
          tags.push(icon)
        }
      })
      if (tags.length === 1 && tags[0] === 'neutral'){
        tags = [MOVEMENTS[movement].primary];
      }
    }

    return tags
  }

  const [tags, setTags] = useState(initTags());
  useEffect(() => {
    setTags(initTags());
  }, [biasText, movement]);

  const initTagsSelect = () => { 
    if (tags.length === 1){
      return [false];
    } else {
      return tags.map(tag => tag === bias);
    }
  }
  const [tagsSelect, setTagsSelect] = useState(initTagsSelect()); 
  useEffect(() => {
    setTagsSelect(initTagsSelect());
  }, [tags]);


  const [subOptions, setSubOptions] = useState(getSubOptions(dayIndex, ''));
  const [showSubs, setShowSubs] = useState(false);
  const [subText, setSubText] = useState(movement);

  const handleChange = (e) => {
    setSubText(e.target.value.toLowerCase());
    setSubOptions(getSubOptions(dayIndex, e.target.value));
  }

  useEffect(() => {
    setSubText(movement);
  }, [movement]);
  useEffect(() => (setSubOptions(getSubOptions(dayIndex, ''))), [movement]);

  const handleBlur = () => {
    setTimeout(() => {
      setShowSubs(false);
    }, 100);
  }
  useEffect(() => {
    if (movement === "new movement"){
      setShowSubs(true);
    }
  }, [movement])

  return (
    <View style={styles.container}>
      <ThemedText>{biasText}</ThemedText>
      <ThemedPressable onPress={() => changeDropdowns(movement)}>
        <ThemedText>{showDropdown? "-": "+"}</ThemedText>
      </ThemedPressable>
      
      <View style={styles.flexboxRow}>
        <View style={{ width: '78%' }}>
          <TextInput
            style={styles.movementTitle}
            value={subText}
            onChange={(e) => handleChange(e)}
            onFocus={() => setShowSubs(true)}
            onBlur={handleBlur}
          />
        </View>
        <ThemedText>
          {lowerRep} - {upperRep} reps
        </ThemedText>
      </View>

      <Modal visible={showSubs} animationType="slide" transparent={true}>
        <View style={styles.modalView}>
          <FlatList
            data={subOptions}
            renderItem={({ item }) => (
              <ThemedPressable onPress={() => changeMovement(dayIndex, workoutIndex, movement, item)}>
                <ThemedText>{item}</ThemedText>
              </ThemedPressable>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </Modal>

      <View style={styles.tagBox}>
        {tags.map((tag, index) => (
          <ThemedPressable key={index} style={tagsSelect[index] ? styles.tagSelect : styles.tag} onPress={() => handleBias(index)}>
            <ThemedText>{tag}</ThemedText>
          </ThemedPressable>
        ))}
      </View>

      <View style={styles.centerDiv}>
        <View style={styles.btnGrid}>
          <ThemedPressable style={styles.editBtn} onPress={() => setShowSubs(true)}>
            <Image source={{ uri: "/media/footer-icons/change-icon.png" }} style={styles.iconImage} />
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} onPress={() => addMovement(dayIndex, workoutIndex, movement)}>
            <ThemedText>+</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} onPress={() => removeMovement(dayIndex, movement)}>
            <ThemedText>-</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} onPress={() => moveUp(dayIndex, workoutIndex, movement)}>
            <ThemedText>up</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} onPress={() => moveDown(dayIndex, workoutIndex, movement)}>
            <ThemedText>down</ThemedText>
          </ThemedPressable>
        </View>
      </View>

      <View style={styles.centerDiv}>
        <View style={styles.editLine} />
      </View>
    </View>
  );
};

function createStyles(colors) { 
  return StyleSheet.create({
  container: {
    padding: 10,
  },
  iconButton: {
    marginBottom: 5,
  },
  closeButton: {
    // Add styling for close button
  },
  flexboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  movementTitle: {
    // Add styling for the movement title text input
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  subOptionButton: {
    padding: 10,
    backgroundColor: 'white',
    margin: 5,
  },
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagSelect: {
    backgroundColor: 'green',
    padding: 5,
    margin: 5,
  },
  tag: {
    backgroundColor: 'gray',
    padding: 5,
    margin: 5,
  },
  centerDiv: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  editBtn: {
    padding: 10,
    backgroundColor: '#ddd',
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  editLine: {
    height: 1,
    backgroundColor: 'gray',
    marginTop: 10,
    },
  });
}
