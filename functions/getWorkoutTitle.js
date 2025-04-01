

export default function getWorkoutTitle(dayTitle) {
  if (dayTitle.includes("chest") && dayTitle.includes("back") && dayTitle.includes("shoulders") && dayTitle.includes("triceps") && dayTitle.includes("biceps")) {
    return "upper body";
  } else if (dayTitle.includes("chest") && dayTitle.includes("back") && dayTitle.includes("shoulders") && dayTitle.includes("triceps") && dayTitle.includes("biceps") && dayTitle.includes("legs")) {
    return "full body";
  } else if (dayTitle.includes("chest") && dayTitle.includes("triceps")) {
    return "push";
  } else if (dayTitle.includes("back") && dayTitle.includes("biceps")) {
    return "pull";
  } else if (dayTitle.includes("biceps") && dayTitle.includes("triceps")) {
    return "arms";
  } else {
    return dayTitle;
  }
}