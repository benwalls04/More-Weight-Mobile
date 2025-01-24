import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { useEffect, useState } from "react"

export default function LoadingScreen() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const textTimeout = setTimeout(() => {
      setShowText(true);
    }, 1000);

    // Clean up timeouts on component unmount
    return () => {
      clearTimeout(textTimeout);
    };
  }, []);

  return (
    <ThemedView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ThemedText style={{fontSize: 30}}>{showText ? 'Loading...' : ''}</ThemedText>
    </ThemedView>
  )
}