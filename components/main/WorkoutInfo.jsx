import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Dimensions, TouchableOpacity, Alert} from 'react-native';
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

  const { addMovement, removeMovement, moveUp, moveDown, changeMovement, changeBias, getSubOptions, getSets, editSets, subChoice, setSubChoice, changeRepRange, maxed } = useEditContext();

  const [lowerRep, setLowerRep] = useState(workoutCpy.movements[workoutIndex].lowerRep);
  const [upperRep, setUpperRep] = useState(workoutCpy.movements[workoutIndex].upperRep);
  const dataKey = movement.includes("new movement") || !MOVEMENTS[movement] ? "default" : movement;
  const bias = movement.includes("new movement")? 'neutral': workoutCpy.movements[workoutIndex].bias; 
  
  const [editSetFlag, setEditSetFlag] = useState(false);
  const sets = getSets(movement);
  const [setsCpy, setSetsCpy] = useState(sets.map(set => ({ ...set })));

  useEffect(() => {
    setSetsCpy(sets.map(set => ({ ...set })));
  }, [movement, maxed])

  useEffect(() => {
    setLowerRep(workoutCpy.movements[workoutIndex].lowerRep);
    setUpperRep(workoutCpy.movements[workoutIndex].upperRep);
  }, [workoutCpy, workoutIndex, movement]);

  useEffect(() => {
    if (editSetFlag && (sets && lowerRep !== sets[0].lowerRep || upperRep !== sets[0].upperRep)){
      setLowerRep(sets[0].lowerRep);
      setUpperRep(sets[0].upperRep);
      changeRepRange(workoutIndex, sets[0].lowerRep, sets[0].upperRep);
      setEditSetFlag(false);
    }
  }, [setsCpy])

  const [popupVisible, setPopupVisible] = useState(false);
  const popupBody = () => {
    return (
      <MovementPopup movement={movement} setsCpy={setsCpy} setSetsCpy={setSetsCpy}/>
    )
  }

  const handleSetsClose = () => {
    setEditSetFlag(true);
    const validatedSetsCpy = setsCpy.map((setCpy, index) => {
      // Get the original set at the same index
      const originalSet = sets[index];
      
      // Create a new set object with validated fields
      const validatedSet = { ...setCpy };
      
      // Check and fix lowerRep
      if (!validatedSet.lowerRep || validatedSet.lowerRep <= 0 || validatedSet.lowerRep === '') {
        validatedSet.lowerRep = originalSet.lowerRep;
      }
      
      // Check and fix upperRep
      if (!validatedSet.upperRep || validatedSet.upperRep <= 0 || validatedSet.upperRep === '') {
        validatedSet.upperRep = originalSet.upperRep;
      }
      
      // Check and fix RPE
      if (!validatedSet.RPE || validatedSet.RPE <= 0 || validatedSet.RPE === '') {
        validatedSet.RPE = originalSet.RPE;
      }
      
      // Check and fix rest (must be > 0 and < 10)
      if (!validatedSet.rest || validatedSet.rest <= 0 || validatedSet.rest >= 10 || validatedSet.rest === '') {
        validatedSet.rest = originalSet.rest;
      }
      
      return validatedSet;
    });
    
    setSetsCpy(validatedSetsCpy);
    
    editSets(movement, validatedSetsCpy);
  }

  const handleBias = (index) => {
    if (tagsSelect[index] === false && !workoutFlag){
      const newBias = tags[index];
      let newTagsSelect = new Array(tagsSelect.length).fill(false);
      newTagsSelect[index] = true;
      setTagsSelect(newTagsSelect);
      changeBias(workoutIndex, movement, newBias);
      setBiasText(MOVEMENTS[dataKey].variants[newBias]);
    }
  }

  const initBiasText = () => {  
    if (movement.includes("new movement")){
      return '';
    } else {
      return MOVEMENTS[dataKey].variants[bias];
    }
  }
  
  const [biasText, setBiasText] = useState(initBiasText());
  useEffect(() => {
    setBiasText(initBiasText());
  }, [bias, movement])

  const initTags = () => {
    let tags = [];

    if (!workoutFlag){
      if (!movement.includes("new movement")){
        MOVEMENTS[dataKey].biasOrder.forEach(icon => {
          if (!tags.includes(icon)){
            tags.push(icon)
          }
        })
        if (tags.length === 1 && tags[0] === 'neutral'){
            tags = [MOVEMENTS[dataKey].primary];
        }
      }
    } else {
      tags = [MOVEMENTS[dataKey].primary];
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

  const getNewSubs = () => {
    let newSubs = getSubOptions(movement, bias, '');
    const variant = (movement + " " + biasText).trim();
    newSubs.unshift({baseMovement: movement, variant: variant, bias: bias});
    return newSubs;
  }
  const [subOptions, setSubOptions] = useState(getNewSubs());

  const handleSubClose = () => {
    if (subChoice && !subChoice.movement.includes("new movement")){
      changeMovement(workoutIndex, subChoice.movement, subChoice.bias);
      setSubChoice(null);
    } 
  }

  useEffect(() => {
    setSubOptions(getNewSubs());
  }, [movement]);

  const subPopupBody = () => {
    return (
      <View style={{width: '100%', alignItems: 'center', height: "250"}}>
        <ThemedText style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>Choose A {movement.includes("new movement")? "Movement": "Substitute"}</ThemedText>
        <SubList 
          list={subOptions} 
          style={{justifySelf: 'center', width: "100%", left: 0, height: "100%", marginTop: 50}}
          selectInteract={true}
          source="edit"
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Popup body={popupBody} visible={popupVisible} avoidSubCheck={true} onClose={() => setPopupVisible(false)}/>
      <View style={[styles.flexboxRow]}>
        <PopupPressable 
          popupBody={popupBody} 
          style={styles.closeButton} 
          label="Sets Information"
          hint="View Information on All of the Sets for This Movement"
          onClose={() => handleSetsClose()}>
            <ThemedText style={{fontSize: 25, marginTop: 20}}>+</ThemedText>
        </PopupPressable>
        
        <View style={[styles.flexboxRow, {flex: 9, marginTop: 16}]}>
          <View style={{width: "65%"}}>
            <ThemedText style={styles.biasText}>{biasText}</ThemedText>
          </View>

          <View style={{width: "70%", zIndex: 1}}>
            <ThemedText numberOfLines={1} style={styles.movementTitle}>{movement}</ThemedText>
          </View>
          <ThemedText style={styles.repsText}>
            {lowerRep} - {upperRep} reps
          </ThemedText>
        </View>
      </View>
        
      <View style={{width: '100%', alignItems: 'flex-start', paddingLeft: 35, marginBottom: 10, marginTop: 0}}>
        <FlatList 
          data={tags}
          renderItem={({ item, index }) => (
            <View style={{marginLeft: 10}}>
              <TouchableOpacity key={index} style={[styles.tag, { backgroundColor: tagsSelect[index] ? colors.tint : "gray"}]} onPress={() => handleBias(index)} accessible={true} accessibilityLabel={item} accessibilityRole="button" accessibilityHint="Select one of these tags to change the bias of this movement">
                <ThemedText style={styles.tagText}>{item}</ThemedText>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.tagContainer, {paddingLeft: 10}]}
        />
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        {!workoutFlag && (
          <View style={styles.editBtnGrid}>
            <ThemedPressable style={styles.editBtn} type="slanted" btnType="pressable" onPress={() => addMovement(workoutIndex, movement)} label="Add Movement Below">
              <ThemedText style={styles.btnText}>+</ThemedText>
            </ThemedPressable>
            <ThemedPressable style={styles.editBtn} type="slanted" btnType="pressable" onPress={() => removeMovement(movement, bias)} label="Remove This Movement">
              <ThemedText style={styles.btnText}>-</ThemedText>
            </ThemedPressable>
            <ThemedPressable style={styles.editBtn} type="slanted" btnType="pressable" onPress={() => moveUp(workoutIndex, movement)} label="Move This Movement Up">
              <ThemedText style={styles.btnText}>↑</ThemedText>
            </ThemedPressable>
            <ThemedPressable style={styles.editBtn} type="slanted" btnType="pressable" onPress={() => moveDown(workoutIndex, movement)} label="Move This Movement Down">
              <ThemedText style={styles.btnText}>↓</ThemedText>
            </ThemedPressable>
            <PopupPressable style={[styles.editBtn, styles.slantedBtn]} popupBody={subPopupBody} avoidSubCheck={false} onClose={() => handleSubClose()} canClose={subChoice && !subChoice.movement.includes("new movement")} label="Change This Movement">
              <ThemedText style={[styles.btnText, {marginTop: 0}]}>⇄</ThemedText>
            </PopupPressable>
          </View>
        )}

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
    lineHeight: 16,
    textAlign: "left",
    paddingLeft: 14,
    marginTop: 5,
  },
  tagContainer: {
    marginTop: 0,
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: workoutFlag ? 10 : 0,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    zIndex: 2,
    height: 35,
  },
  editBtn: {
    flex: 1,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
  },
  btnText: {
    textAlign: 'center',
    lineHeight: 20,
    includeFontPadding: false,
    marginTop: -10,
  },
  slantedBtn: {
    backgroundColor: colors.background,
    transform: [{ skewX: '-10deg' }],
    borderRadius: 0,
    borderColor: colors.tint,
    margin: 0,
    borderWidth: 1,
    width: 40,
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
