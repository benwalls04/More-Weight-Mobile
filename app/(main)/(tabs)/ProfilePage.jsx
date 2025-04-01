import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import  MainHeader from "@/components/main/MainHeader";
import { useUserContext } from "@/hooks/UserContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { ThemedPressable } from "@/components/ThemedPressable";
import RoutineInfo from "@/components/main/RoutineInfo";
import { Ionicons } from '@expo/vector-icons';

export default function ProfilePage() {
  const theme = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);
  const {username, allRoutines, splitTitle, signOut} = useUserContext();
  const [activeTab, setActiveTab] = useState(0);

  const renderRoutine = () => {
    const renderedRoutines = allRoutines
      .sort((a, b) => {
        if (a.title === splitTitle) return -1;
        if (b.title === splitTitle) return 1;
        return 0;
      });

    return (
      <ScrollView style={{width: '100%'}} showsVerticalScrollIndicator={false}>
        {renderedRoutines.map((routine, index) => (
          <RoutineInfo routine={routine} last={index === renderedRoutines.length - 1} selected={routine.title === splitTitle}/>
        ))}
      </ScrollView>
    )
  }

  const renderSubHeader = () => {
    return (
      <View style={styles.tabContainer}>
      <ThemedPressable type="pill" style={[styles.tabButton, activeTab === 0 && styles.activeTab]} onPress={() => setActiveTab(0)}>
        <ThemedText style={styles.tabText}>Routines</ThemedText>
      </ThemedPressable>
      <ThemedPressable type="pill" style={[styles.tabButton, activeTab === 1 && styles.activeTab]} onPress={() => setActiveTab(1)}>
        <ThemedText style={styles.tabText}>Friends</ThemedText>
      </ThemedPressable>
      <ThemedPressable type="pill" style={[styles.tabButton, activeTab === 2 && styles.activeTab]} onPress={() => setActiveTab(2)}>
        <ThemedText style={styles.tabText}>Weight</ThemedText>
      </ThemedPressable>
      </View>
    )
  }
  const renderFriends = () => {
    return (
      <View>
        <ThemedText>Friends Coming Soon</ThemedText>
      </View>
    )
  }
  
  const renderWeight = () => {
    return (
      <View>
        <ThemedText>Weight Coming Soon</ThemedText>
      </View>
    )
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.signOutContainer}>
        <Ionicons name="log-out-outline" size={24} color={colors.text} onPress={() => signOut()} />
        <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
      </View>
      <MainHeader title={username} subHeaderComponent={renderSubHeader()}></MainHeader>
      
      <View style={styles.content}>
        <View style={styles.tabContent}>
          {activeTab === 0 && renderRoutine()}
          {activeTab === 1 && renderFriends()}
          {activeTab === 2 && renderWeight()}
        </View>
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
    userInfo: {
      width: '100%',
      paddingHorizontal: 20,
      marginTop: 10,
    },
    content: {
      width: '100%',
      flex: 1,
    },
    tabContainer: {
      flexDirection: 'row',
      paddingBottom: 10, 
      marginTop: 20,
      justifyContent: 'space-between',
    },
    tabButton: {
      width: 100,
      marginHorizontal: 10,
    },
    activeTab: {
      backgroundColor: colors.tint,
    },
    tabText: {
      fontSize: 12,
      lineHeight: 16,
    },
    tabContent: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 10,
    },
    signOutContainer: {
      position: 'absolute',
      top: 10,
      right: -20,
      alignItems: 'center',
      zIndex: 3,
    },
    signOutText: {
      lineHeight: 10,
      fontSize: 10,
      textAlign: 'center',
    }
  });
}



