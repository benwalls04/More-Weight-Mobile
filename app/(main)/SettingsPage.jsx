import { StyleSheet, View, Alert } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import MainHeader from "@/components/main/MainHeader";
import { useUserContext } from "@/hooks/UserContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { ThemedPressable } from "@/components/ThemedPressable";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function SettingsPage() {
  const theme = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);
  const { signOut, deleteAccount } = useUserContext();
  const router = useRouter();

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            deleteAccount();
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container} label="Settings Page">
      <View style={styles.backButtonContainer}>
        <Ionicons 
          name="arrow-back" 
          size={28} 
          color={colors.text} 
          onPress={() => router.back()} 
        />
      </View>
      <MainHeader title="Settings" />
      
      <View style={styles.content}>
        <ThemedPressable 
          style={styles.optionButton}
          onPress={() => signOut()}
          label="Sign Out"
          hint="Signs you out of your account"
        >
          <Ionicons name="log-out-outline" size={24} color={colors.text} style={styles.optionIcon} />
          <ThemedText style={styles.optionText}>Sign Out</ThemedText>
        </ThemedPressable>
        
        <ThemedPressable 
          style={[styles.optionButton, styles.deleteButton]}
          onPress={handleDeleteAccount}
          label="Delete Account"
          hint="Deletes your account and all associated data"
        >
          <Ionicons name="trash-outline" size={24} color={colors.accentLight} style={styles.optionIcon} />
          <ThemedText style={[styles.optionText, styles.deleteText]}>Delete Account</ThemedText>
        </ThemedPressable>
      </View>
    </ThemedView>
  );
}

function createStyles(colors) {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 25
    },
    backButtonContainer: {
      position: 'absolute',
      top: 5,
      left: 20,
      zIndex: 3,
    },
    content: {
      width: '100%',
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    optionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      marginBottom: 15,
      borderRadius: 10,
    },
    optionIcon: {
      marginRight: 15,
    },
    optionText: {
      fontSize: 16,
    },
    deleteButton: {
      borderColor: colors.accentLight,
      borderWidth: 1,
    },
    deleteText: {
      color: colors.text,
    }
  });
}
