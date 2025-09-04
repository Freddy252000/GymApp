# GymApp - Modern Fitness Tracking Application

A comprehensive fitness tracking mobile application built with React Native CLI and TypeScript, featuring a modern UI design, responsive layout, and beautiful color themes.

## 🚀 Features

- **Modern UI Design**: Clean, intuitive interface with beautiful gradients and animations
- **Dark/Light Theme**: Automatic theme switching with manual override option
- **Responsive Design**: Optimized for various screen sizes and devices
- **Comprehensive Navigation**: Tab-based navigation with stack navigators
- **Authentication Flow**: Login, register, and forgot password screens
- **Onboarding Experience**: Welcome screens for new users
- **Dashboard**: Home screen with workout stats and quick actions
- **Workout Management**: Create, edit, and track workouts
- **Progress Tracking**: Monitor fitness progress with charts and statistics
- **Profile Management**: User profile and settings management

## 🎨 Design System

### Color Palette
- **Primary**: Energetic Orange (#F97316)
- **Secondary**: Professional Blue (#0EA5E9)
- **Success**: Fresh Green (#22C55E)
- **Warning**: Bright Yellow (#F59E0B)
- **Error**: Alert Red (#EF4444)
- **Neutral**: Modern Grays for text and backgrounds

### Typography
- **System Fonts**: iOS System, Android Roboto
- **Responsive Sizing**: From 12px to 128px
- **Font Weights**: Light to Black (100-900)

### Components
- **Buttons**: Multiple variants with gradient support
- **Cards**: Elevated, outlined, and default styles
- **Inputs**: Modern form inputs with validation
- **Headers**: Customizable navigation headers
- **Layouts**: Responsive layout containers

## 🛠️ Installation

### Prerequisites
- Node.js (>= 20)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **iOS Setup** (macOS only)
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Android Setup**
   - Ensure Android Studio is installed
   - Set up Android SDK and emulator

## 🚀 Running the App

### Start Metro Bundler
```bash
npm start
```

### Run on Android
```bash
npm run android
```

### Run on iOS (macOS only)
```bash
npm run ios
```

## 📁 Project Structure

```
GymApp/
├── src/
│   ├── components/
│   │   └── ui/              # Reusable UI components
│   ├── context/
│   │   └── ThemeContext.tsx # Theme management
│   ├── navigation/
│   │   ├── types.ts         # Navigation type definitions
│   │   ├── AuthStack.tsx    # Authentication navigation
│   │   ├── MainTabs.tsx     # Main app navigation
│   │   └── RootNavigator.tsx # Root navigation container
│   ├── screens/
│   │   ├── auth/            # Authentication screens
│   │   ├── main/            # Main app screens
│   │   ├── workouts/        # Workout management screens
│   │   ├── progress/        # Progress tracking screens
│   │   ├── profile/         # Profile management screens
│   │   └── onboarding/      # Onboarding screens
│   └── theme/
│       ├── colors.ts        # Color palette
│       ├── typography.ts    # Typography system
│       ├── spacing.ts       # Spacing system
│       ├── shadows.ts       # Shadow styles
│       └── index.ts         # Theme exports
├── android/                 # Android-specific files
├── ios/                     # iOS-specific files
└── App.tsx                  # Main app component
```

## 🎯 Key Components

### Theme System
- **ThemeProvider**: Context provider for theme management
- **useTheme**: Hook for accessing theme in components
- **Automatic Detection**: System theme detection with manual override

### Navigation
- **RootNavigator**: Main navigation container
- **AuthStack**: Authentication flow navigation
- **MainTabs**: Bottom tab navigation for main app
- **Stack Navigators**: Individual stack navigators for each section

### UI Components
- **Button**: Customizable button with variants and gradients
- **Card**: Container component with elevation and styling
- **Input**: Form input with validation and icons
- **Header**: Navigation header with customization options
- **Layout**: Responsive layout container

## 📦 Dependencies

### Core
- React Native 0.81.1
- React 19.1.0
- TypeScript 5.8.3

### Navigation
- @react-navigation/native
- @react-navigation/bottom-tabs
- @react-navigation/stack

### UI & Styling
- react-native-vector-icons
- react-native-linear-gradient
- react-native-safe-area-context

### Storage & State
- @react-native-async-storage/async-storage

### Charts & Visualization
- react-native-chart-kit
- react-native-svg

## 🔧 Development

### Adding New Screens
1. Create screen component in appropriate folder
2. Add to navigation types
3. Register in navigator
4. Update navigation flow

### Customizing Theme
1. Modify colors in `src/theme/colors.ts`
2. Update typography in `src/theme/typography.ts`
3. Adjust spacing in `src/theme/spacing.ts`

### Adding New Components
1. Create component in `src/components/ui/`
2. Export from `src/components/ui/index.ts`
3. Use theme system for consistent styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Native team for the amazing framework
- Community contributors for the packages used
- Design inspiration from modern fitness apps

---

**Happy Coding! 💪**
