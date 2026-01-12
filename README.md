# More Weight

A comprehensive workout tracking and routine management mobile application built with React Native and Expo. More Weight helps users create personalized workout splits, track their training progress, and visualize their fitness journey through detailed analytics.

## What It Does

More Weight is a fitness tracking app that enables users to:

- **Create Custom Workout Splits**: New users complete an interactive survey to generate personalized workout routines based on their experience level, available equipment, and training preferences
- **Track Workouts**: Log sets, reps, and weights during workouts with an intuitive interface
- **Monitor Progress**: View detailed progress graphs for each exercise, filtered by muscle group
- **Manage Multiple Routines**: Save and switch between different workout routines
- **Edit Workouts**: Customize existing routines by adding, removing, or modifying exercises
- **User Authentication**: Secure login/signup with credential storage using Expo SecureStore

## Tech Stack

### Core Framework
- **React Native** (0.76.5) - Cross-platform mobile development
- **Expo** (~52.0.24) - Development platform and tooling
- **React** (18.3.1) - UI library

### Routing & Navigation
- **Expo Router** (~4.0.16) - File-based routing system
- **React Navigation** - Navigation primitives

### State Management
- **React Context API** - Global state management through multiple context providers:
  - `UserContext` - User data, routines, and authentication
  - `AuthContext` - Authentication state
  - `ThemeContext` - Theme management (dark/light mode)
  - `WorkoutContext` - Active workout state and progress tracking
  - `EditContext` - Routine editing functionality
  - `SurveyContext` - Survey flow state

### Data & Storage
- **Axios** (^1.7.9) - HTTP client for API communication
- **Expo SecureStore** (~14.0.1) - Secure credential storage
- **AsyncStorage** (1.23.1) - Local data persistence

### UI & Styling
- **React Native StyleSheet** - Component styling
- **Expo Linear Gradient** (~14.0.2) - Gradient components
- **Expo Blur** (~14.0.1) - Blur effects
- **React Native SVG** (15.8.0) - SVG rendering for graphs

### Additional Features
- **Expo Haptics** (~14.0.0) - Haptic feedback
- **React Native Reanimated** (~3.16.1) - Animations
- **NetInfo** (11.4.1) - Network connectivity monitoring

### Development Tools
- **TypeScript** (^5.3.3) - Type checking
- **Jest** (^29.2.1) - Testing framework

## Architecture

### High-Level Architecture

The application follows a **component-based architecture** with **context-driven state management**:

```
┌─────────────────────────────────────────┐
│         Root Layout (_layout.jsx)       │
│  ┌───────────────────────────────────┐  │
│  │   Context Providers (Nested)      │  │
│  │  - UserProvider                   │  │
│  │  - AuthProvider                   │  │
│  │  - ThemeProvider                  │  │
│  └───────────────────────────────────┘  │
│              │                           │
│    ┌─────────┴─────────┐                │
│    │                   │                │
│  Auth Flow        Main App Flow         │
│  (survey)         (main)/(tabs)         │
└─────────────────────────────────────────┘
```

### File Structure

- **`app/`** - File-based routing structure:
  - `(auth)/` - Authentication screens (Login, Signup)
  - `(survey)/` - Onboarding survey flow
  - `(main)/(tabs)/` - Main application tabs (Workout, Track, Profile)
  - `(main)/` - Additional screens (Edit, Settings)

- **`components/`** - Reusable UI components:
  - `main/` - Workout-specific components (SetScreen, WorkoutInfo, Graph, etc.)
  - `survey/` - Survey components (SurveyGrid, SurveyRange)
  - Themed components (ThemedView, ThemedText, ThemedPressable)

- **`hooks/`** - Context providers and custom hooks for state management

- **`constants/`** - Static data (Movements, Colors, Survey data, etc.)

- **`functions/`** - Utility functions

### Data Flow

1. **Authentication**: User credentials stored securely → API authentication → User data loaded into context
2. **Workout Creation**: Survey responses → API call to generate routine → Routine stored in context
3. **Workout Tracking**: Set logging → API calls to persist data → Context updates → UI reflects changes
4. **Progress Tracking**: Historical data fetched from API → Processed for graphs → Displayed in TrackPage

### Backend Integration

The app communicates with a backend API hosted at `https://more-weight.com`:
- User authentication (`/login`, `/new-user`)
- Routine management (`/add-routine`, `/set-routine`)
- Workout logging (`/log-set`, `/get-last`)
- Progress tracking (`/progress`)
- Account management (`/delete-account`)

## How It's Used

### Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npx expo start
   ```

3. **Run on Your Platform**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device
   - Press `w` for web browser

### User Flow

1. **New Users**:
   - Start at welcome screen → Select "New User"
   - Complete interactive survey (equipment, experience, preferences)
   - Choose or create custom workout split
   - Create account with username/password
   - Edit generated routine if needed
   - Begin tracking workouts

2. **Returning Users**:
   - Login with saved credentials (auto-login if previously logged in)
   - Access main app with saved routines and progress

3. **Daily Usage**:
   - **Workout Tab**: View today's workout → Start workout → Log sets with weight/reps → Complete workout
   - **Track Tab**: View progress graphs for exercises → Filter by muscle group → View detailed logs
   - **Profile Tab**: Manage routines → Switch active routine → Create new routines → Access settings

### Key Features

- **Offline Detection**: App checks network connectivity before allowing certain operations
- **Workout Progress Saving**: Automatically saves workout progress when app goes to background
- **Rest Timer**: Built-in rest timer during workouts
- **Progress Visualization**: Interactive graphs showing weight/reps progression over time
- **Multiple Routines**: Users can create and switch between multiple workout routines
- **Theme Support**: Dark/light theme support (currently defaults to dark)

### Development Notes

- The app uses file-based routing, so navigation is handled through the file structure in `app/`
- State is managed through React Context, with each major feature having its own context provider
- The backend API must be running and accessible for full functionality
- Credentials are stored securely using Expo SecureStore
- The app is configured for iOS, Android, and Web platforms
