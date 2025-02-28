import React, { useState, useEffect } from 'react';
import { View, TextInput, Modal, FlatList, StyleSheet, Dimensions} from 'react-native';
import { MOVEMENTS } from "@/constants/Movements";
import { useEditContext } from "@/hooks/EditContext";
import { useUserContext } from "@/hooks/UserContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPressable } from "@/components/ThemedPressable";
import PopupPressable from "@/components/PopupPressable";
import MovementPopup from "@/components/main/MovementPopup";
import Popup from "@/components/Popup";

const windowWidth = Dimensions.get("window").width;
const LINE_WIDTH = windowWidth * .9;

export default function WorkoutInfo({workoutIndex, dayIndex, movement}) {

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);

  const { addMovement, removeMovement, moveUp, moveDown, changeMovement, changeBias, getSubOptions, getSets } = useEditContext();
  const { routineCpy } = useUserContext();

  const lowerRep = routineCpy[dayIndex].movements[workoutIndex].lowerRep;
  const upperRep = routineCpy[dayIndex].movements[workoutIndex].upperRep;
  const bias = movement === "new movement"? 'neutral': routineCpy[dayIndex].movements[workoutIndex].bias;
    
  const sets = getSets(dayIndex, movement);
  const [popupVisible, setPopupVisible] = useState(false);
  const popupBody = () => {
    return (
      <MovementPopup sets={sets} movement={movement} />
    )
  }

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
      <Popup body={popupBody} visible={popupVisible} onClose={() => setPopupVisible(false)}/>
      <View style={[styles.flexboxRow]}>
        <PopupPressable popupBody={popupBody} style={styles.closeButton}>
            <ThemedText style={{fontSize: 20}}>+</ThemedText>
        </PopupPressable>
        
        <View style={[styles.flexboxRow, {flex: 9}]}>
          <ThemedText style={{width: "100%"}}>{biasText}</ThemedText>

          <View style={{width: "65%"}}>
            <TextInput
              style={styles.movementTitle}
              value={subText}
              onChange={(e) => handleChange(e)}
              onFocus={() => setShowSubs(true)}
              onBlur={handleBlur}
            />
          </View>
          <ThemedText style={{width: "35%", textAlign: "right", fontSize: 12}}>
            {lowerRep} - {upperRep} reps
          </ThemedText>

          <FlatList 
            data={tags}
            renderItem={({ item, index }) => (
              <View style={{marginLeft: 10}}>
                <ThemedPressable key={index} style={[styles.tag, { backgroundColor: tagsSelect[index] ? colors.tint : "gray"}]} onPress={() => handleBias(index)}>
                  <ThemedText style={styles.tagText}>{item}</ThemedText>
                </ThemedPressable>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tagContainer}
          />
        </View>
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

      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        <View style={styles.editBtnGrid}>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => addMovement(dayIndex, workoutIndex, movement)}>
            <ThemedText>+</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => removeMovement(dayIndex, movement)}>
            <ThemedText>-</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => moveUp(dayIndex, workoutIndex, movement)}>
            <ThemedText>u</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => moveDown(dayIndex, workoutIndex, movement)}>
            <ThemedText>d</ThemedText>
          </ThemedPressable>
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.editLine}>
            <ThemedText style={{color: colors.background}}>...</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};

function createStyles(colors) { 
  return StyleSheet.create({
  container: {
    padding: 0,
    width: '100%',
    justifyContent: "flex-start",
  },
  iconButton: {
    marginBottom: 5,
  },
  closeButton: {
    borderColor: "none",
    borderWidth: 0,
    width: 30,
    alignItems: "center",
    flex: 1,
  },
  flexboxCol: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  flexboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  movementTitle: {
    color: colors.text,
    textAlign: "left",
    paddingLeft: 12,
    fontSize: 18
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
  tagContainer: {
    marginTop: 8,
    alignItems: 'flex-start',
    width: '100%',
  },
  tagText: {
    fontSize: 12,
    textAlign: 'center',
  },
  tagSelect: {
    backgroundColor: colors.tint,
  },
  tag: {
    backgroundColor: 'gray',
    paddingHorizontal: 12,
    borderRadius: 12,
    height: 30,
    borderColor: "none"
  },
  editBtnGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    zIndex: 2
  },
  editBtn: {
    flex: 1,
    height: 30,
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  editLine: {
    backgroundColor: "gray",
    height: 1,
    width: LINE_WIDTH,
    marginTop: -30,
    zIndex: 1
  },
  });
}
