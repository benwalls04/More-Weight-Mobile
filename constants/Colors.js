const redOne = 'rgb(255, 84, 84)'; 
const redTwo = 'rgb(255, 95, 95)';
const redThree = 'rgb(255, 130, 130)';
const grayOne = 'rgb(25, 25, 25)';
const grayTwo = 'rgb(62, 62, 62)';
const grayThree = 'rgb(120, 120, 120)';

export const COLORS = {
  light: {
    text: "white", 
    textTwo: grayThree,
    background: grayOne, 
    accent: grayTwo, 
    accentLight: grayThree, 
    accentDark: grayOne,
    tint: redTwo,
    borderColor: redOne,
    buttonColor: grayOne,
    inputBorderColor: "white",
    buttonColorSelected: redTwo,
    borderColorSelected: redTwo,
    textSelected: "white",
    shadowColor: grayThree,
    popupColor: grayTwo,
  }, 
  dark: {
    text: grayOne, 
    textTwo: grayTwo,
    background: "white", 
    accent: grayOne, 
    accentLight: grayThree, 
    accentDark: grayOne,
    tint: redTwo,
    borderColor: redOne,
    buttonColor: redThree,
    inputBorderColor: "white",
    buttonColorSelected: redThree,
    borderColorSelected: redOne,
    textSelected: "white",
    shadowColor: grayThree,
    popupColor: grayTwo
  }
}