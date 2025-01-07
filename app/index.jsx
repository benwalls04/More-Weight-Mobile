import { useState, useEffect, useContext } from "react";
import AuthGroup from "@/app/(auth)/_layout"
import TabsGroup from "@/app/(tabs)/_layout"

export default function RootLayout() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isNewUser, isAuth } = useContext(AuthContext);

  if (!isLoaded) {
    return null;
  }

  if (isAuth) {
    return(
      <TabsGroup></TabsGroup>
    )
  }

  if (isNewUser) {
    return (
      <SurveyGroup></SurveyGroup>
    )
  }

  return (
    <AuthGroup></AuthGroup>
  )
}