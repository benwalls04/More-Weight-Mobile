import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Dimensions, ScrollView} from 'react-native';
import { MOVEMENTS } from "@/constants/Movements";
import { useEditContext } from "@/hooks/EditContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { ThemedPressable } from "@/components/ThemedPressable";
import SubList from "@/components/main/SubList";
import PopupPressable from "@/components/PopupPressable";
import MovementPopup from "@/components/main/MovementPopup";
import Popup from "@/components/Popup";

const windowWidth = Dimensions.get("window").width;
const LINE_WIDTH = windowWidth * .9;

export default function WorkoutInfo({workoutCpy, workoutIndex, movement, workoutFlag}) {

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors, workoutFlag);

  const { addMovement, removeMovement, moveUp, moveDown, changeMovement, changeBias, getSubOptions, getSets, editSets } = useEditContext();

  const lowerRep = workoutCpy.movements[workoutIndex].lowerRep;
  const upperRep = workoutCpy.movements[workoutIndex].upperRep;
  const bias = movement === "new movement"? 'neutral': workoutCpy.movements[workoutIndex].bias;    
  const sets = getSets(movement);
  const [setsCpy, setSetsCpy] = useState(sets.map(set => ({ ...set })));

  useEffect(() => {
    setSetsCpy(sets.map(set => ({ ...set })));
  }, [movement])

  console.log(workoutCpy.movements[workoutIndex].movement)
  console.log(sets)
  console.log(setsCpy)
  console.log("--------")

  const [popupVisible, setPopupVisible] = useState(false);
  const popupBody = () => {
    return (
      <MovementPopup movement={movement} setsCpy={setsCpy} setSetsCpy={setSetsCpy}/>
    )
  }

  const handleBias = (index) => {
    if (tagsSelect[index] === false){
      const newBias = tags[index];
      let newTagsSelect = new Array(tagsSelect.length).fill(false);
      newTagsSelect[index] = true;
      setTagsSelect(newTagsSelect);
      changeBias(workoutIndex, movement, newBias);
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

    if (!workoutFlag){
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
    } else {
      tags = [MOVEMENTS[movement].primary];
      if (bias !== 'neutral'){
        tags.push(bias);
      }
    }

    return tags
  }

  const [tags, setTags] = useState(initTags());
  useEffect(() => {
    setTags(initTags());
  }, [biasText, movement]);

  const initTagsSelect = () => { 
    if (!workoutFlag){
      if (tags.length === 1){
        return [false];
      } else {
        return tags.map(tag => tag === bias);
      }
    } else {
      return [false];
    }
  }

  const [tagsSelect, setTagsSelect] = useState(initTagsSelect()); 
  useEffect(() => {
    setTagsSelect(initTagsSelect());
  }, [tags]);

  const [subOptions, setSubOptions] = useState(getSubOptions(movement, bias, ''));
  const [subPopupVisible, setSubPopupVisible] = useState(false);
  const [subChoice, setSubChoice] = useState("new movement");

  const changeSubOption = (workoutIndex, choice) => {
    setSubChoice(choice);
  }

  const handleSubClose = () => {
    changeMovement(workoutIndex, subChoice === "new movement" ? movement : subChoice);
    setSubPopupVisible(false);
  }

  useEffect(() => {
    setSubOptions(getSubOptions(movement, bias, ''));
    if (movement === "new movement"){
      setSubPopupVisible(true);
    }
  }, [movement]);

  const subPopupBody = () => {
    return (
      <View style={{width: '100%', alignItems: 'center', height: 250}}>
        <ThemedText style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>Choose A Substitute</ThemedText>
        <SubList 
          list={subOptions} 
          changeMovement={changeSubOption} 
          workoutIndex={workoutIndex} 
          style={{justifySelf: 'center', width: "100%", left: 0, height: "100%", marginTop: 50}}
          height={178}
          selectInteract={true}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Popup body={subPopupBody} visible={subPopupVisible} onClose={() => handleSubClose()}/>
      <Popup body={popupBody} visible={popupVisible} onClose={() => setPopupVisible(false)}/>
      <View style={[styles.flexboxRow]}>
        <PopupPressable 
          popupBody={popupBody} 
          style={styles.closeButton} 
          onClose={() => {
            if (setsCpy && setsCpy.length > 0) {
              editSets(movement, setsCpy);
            } else {
              console.warn("setsCpy is empty, not saving changes");
            }
          }}>
            <ThemedText style={{fontSize: 20}}>+</ThemedText>
        </PopupPressable>
        
        <View style={[styles.flexboxRow, {flex: 9}, {marginTop: biasText === '' ? 16 : 10}]}>
          <View style={{width: "65%"}}>
            <ThemedText style={styles.biasText}>{biasText}</ThemedText>
          </View>

          <View style={{width: "70%", zIndex: 1}}>
            <ThemedText style={styles.movementTitle}>{movement}</ThemedText>
          </View>
          <ThemedText style={styles.repsText}>
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

      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        <View style={styles.editBtnGrid}>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => addMovement(workoutIndex, movement)}>
            <ThemedText>+</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => removeMovement(movement)}>
            <ThemedText>-</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => moveUp(workoutIndex, movement)}>
            <ThemedText>↑</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => moveDown(workoutIndex, movement)}>
            <ThemedText>↓</ThemedText>
          </ThemedPressable>
          <PopupPressable style={[styles.editBtn, styles.slantedBtn]} popupBody={subPopupBody} onClose={() => handleSubClose()}>
            <ThemedText>⇄</ThemedText>
          </PopupPressable>
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

function createStyles(colors, workoutFlag) { 
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
    marginTop: workoutFlag ? 0 : 10,
  },
  movementTitle: {
    color: colors.text,
    textAlign: "left",
    paddingLeft: 12,
    fontSize: 18,
    zIndex: 0
  },
  repsText: {
    padding: 0,
    fontSize: 12,
    textAlign: "left",
    paddingLeft: 26,
  },
  biasText: {
    fontStyle: "italic",
    fontSize: 12,
    lineHeight: 6,
    textAlign: "left",
    paddingLeft: 14,
  },
  tagContainer: {
    marginTop: 5,
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 10,
  },
  tagText: {
    fontSize: 12,
    textAlign: 'center',
  },
  tagSelect: {
    backgroundColor: colors.tint,
  },
  tag: {
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    borderRadius: 12,
    height: 28,
    borderWidth: 0,
  },
  editBtnGrid: {
    visibility: workoutFlag ? 'hidden' : 'visible',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '50%',
    zIndex: 2,
    height: 30,
  },
  editBtn: {
    flex: 1,
    height: workoutFlag ? 0 : 30,
  },
  slantedBtn: {
    backgroundColor: colors.background,
    alignItems: "center",
    transform: [{ skewX: '-10deg' }],
    borderRadius: 0,
    borderColor: colors.tint,
    margin: 0,
    justifyContent: 'center',
    borderWidth: 1,
    width: 35,
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
