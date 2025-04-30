import { useState } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import  MainHeader from "@/components/main/MainHeader";
import { useUserContext } from "@/hooks/UserContext";
import { useThemeContext } from "@/hooks/ThemeContext";
import { COLORS } from "@/constants/Colors";
import { ThemedPressable } from "@/components/ThemedPressable";
import RoutineInfo from "@/components/main/RoutineInfo";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ProfilePage() {
  const theme = useThemeContext();
  const colors = theme === "dark" ? COLORS.dark : COLORS.light;
  const styles = createStyles(colors);
  const {username, allRoutines, splitTitle, signOut} = useUserContext();
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();

  const renderRoutine = () => {
    const renderedRoutines = allRoutines
      .sort((a, b) => {
        if (a.title === splitTitle) return -1;
        if (b.title === splitTitle) return 1;
        return 0;
      });

    return (
      <View style={{width: '100%', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <ScrollView 
          style={{width: '100%'}} 
          contentContainerStyle={{paddingBottom: 10}}
          showsVerticalScrollIndicator={false}
        >
          {renderedRoutines.map((routine, index) => (
            <RoutineInfo 
              key={index} 
              routine={routine} 
              last={index === renderedRoutines.length - 1} 
              selected={routine.title === splitTitle}
            />
          ))}
          
          <ThemedPressable 
            style={styles.addRoutineRow} 
            onPress={() => router.push('(survey)')}
            activeOpacity={0.7}
            label="Create a new routine"
            hint="Takes you to the survey to create a new routine"
          >
            <ThemedText style={styles.addRoutineText}>Create a new routine</ThemedText>
          </ThemedPressable>
        </ScrollView>
      </View>
    )
  }

  const renderSubHeader = () => {
    return (
      <View style={styles.tabContainer}>
      <ThemedPressable type="pill" style={[styles.tabButton, activeTab === 0 && styles.activeTab]} onPress={() => setActiveTab(0)} label="View Your Routines" hint="View your saved routines">
        <ThemedText style={styles.tabText}>Routines</ThemedText>
      </ThemedPressable >
      <ThemedPressable type="pill" style={[styles.tabButton, activeTab === 1 && styles.activeTab]} onPress={() => setActiveTab(1)} label="Friends Tab" hint="View your friends">
        <ThemedText style={styles.tabText}>Friends</ThemedText>
      </ThemedPressable>
      <ThemedPressable type="pill" style={[styles.tabButton, activeTab === 2 && styles.activeTab]} onPress={() => setActiveTab(2)} label="Weight Tab" hint="View your weight progress">
        <ThemedText style={styles.tabText}>Weight</ThemedText>
      </ThemedPressable>
      </View>
    )
  }
  const renderFriends = () => {
    return (
      <View>
        <ThemedText type="header" style={{marginTop: 20}}>Friends Coming Soon</ThemedText>
      </View>
    )
  }
  
  const renderWeight = () => {
    return (
      <View>
        <ThemedText type="header" style={{marginTop: 20}}>Weight Coming Soon</ThemedText>
      </View>
    )
  }

  return (
    <ThemedView style={styles.container} label="Profile Page">
      <View style={styles.settingsContainer}>
        <ThemedPressable 
          style={styles.settingsIconTouchable}
          onPress={() => router.push('/SettingsPage')}
          label="Settings"
          hint="Takes you to the settings page"
        >
          <Ionicons name="settings-outline" size={30} color={colors.text} />
        </ThemedPressable>
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
      width: '90%',
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
      height: 45
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
    settingsContainer: {
      position: 'absolute',
      top: -10,
      right: 0,
      alignItems: 'center',
      zIndex: 3,
    },
    settingsIconTouchable: {
      alignItems: 'center',
      padding: 10,
      borderWidth: 0,
    },
    addRoutineRow: {
      marginTop: 15,
      marginBottom: 5,
      paddingVertical: 8,
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: colors.backgroundLight,
    },
    addRoutineText: {
      color: colors.text,
      fontWeight: '500',
    },
  });
}



