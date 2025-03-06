import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, StyleSheet, Dimensions, ScrollView} from 'react-native';
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

export default function WorkoutInfo({workoutCpy, workoutIndex, movement, workoutFlag}) {

  const { theme } = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors, workoutFlag);

  const { addMovement, removeMovement, moveUp, moveDown, changeMovement, changeBias, getSubOptions, getSets } = useEditContext();

  const lowerRep = workoutCpy.movements[workoutIndex].lowerRep;
  const upperRep = workoutCpy.movements[workoutIndex].upperRep;
  const bias = movement === "new movement"? 'neutral': workoutCpy.movements[workoutIndex].bias;
    
  const sets = getSets(movement);
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


  const [subOptions, setSubOptions] = useState([]);
  const [showSubs, setShowSubs] = useState(false);
  const [subText, setSubText] = useState(movement);

  const handleChange = (e) => {
    setSubText(e.target.value.toLowerCase());
    const newText = e.target.value.toLowerCase();
    setSubText(newText);
    if (showSubs) {
      setSubOptions(getSubOptions(newText));
    }
  }

  useEffect(() => {
    setSubText(movement);
  }, [movement]);
  useEffect(() => (setSubOptions(getSubOptions(''))), [movement]);

  const handleFocus = () => {
    setShowSubs(true);
    // Load options when dropdown is shown
    setSubOptions(getSubOptions(subText));
  };

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
        
        <View style={[styles.flexboxRow, {flex: 9}, {marginTop: biasText === '' ? 0 : 10}]}>
          <View style={{width: "65%"}}>
            <ThemedText style={styles.biasText}>{biasText}</ThemedText>
          </View>

          <View style={{width: "70%"}}>
            <TextInput
              style={styles.movementTitle}
              value={subText}
              onChange={(e) => handleChange(e)}
              onFocus={!workoutFlag ? handleFocus : () => {}}
              onBlur={!workoutFlag ? handleBlur : () => {}}
              editable={!workoutFlag}
            />
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

      {showSubs && (
      <View style={[styles.subDropdown, {top: biasText === '' ? 50: 62}]}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}
          indicatorStyle="white" // Try setting an explicit color
          persistentScrollbar={true} // Make scrollbar always visible
          style={{ 
            maxHeight: 150,
            width: '100%' // Ensure full width
          }}
          contentContainerStyle={{
            paddingRight: 5 // Add padding for the scrollbar
          }}
        >
          {subOptions.map((item, index) => (
            <ThemedPressable 
              key={index.toString()}
              style={styles.subOption} 
              onPress={() => changeMovement(workoutIndex, item)}
            >
              <ThemedText>{item}</ThemedText>
            </ThemedPressable>
          ))}
        </ScrollView>
      </View>
      )}

      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        <View style={styles.editBtnGrid}>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => addMovement(workoutIndex, movement)}>
            <ThemedText>+</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => removeMovement(movement)}>
            <ThemedText>-</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => moveUp(workoutIndex, movement)}>
            <ThemedText>u</ThemedText>
          </ThemedPressable>
          <ThemedPressable style={styles.editBtn} type="slanted" onPress={() => moveDown(workoutIndex, movement)}>
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
  subDropdown: {
    position: 'absolute',
    left: 29,
    width: 250,
    maxHeight: 105,
    backgroundColor: colors.background,
    overflow: 'hidden',
    zIndex: 4,
  },
  subOption: {
    fontSize: 10,
    textAlign: 'left',
    height: 35,
    backgroundColor: colors.accent,
    color: colors.text,
    borderColor: 'rgb(62, 62, 62)',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    zIndex: 5,
  },
  tagContainer: {
    marginTop: 5,
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
  },
  editBtn: {
    flex: 1,
    height: workoutFlag ? 0 : 30,
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
