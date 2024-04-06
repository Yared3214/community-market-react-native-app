import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import HomeScreen from './Apps/Screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Apps/Navigation/TabNavigation';
import * as SecureStore from "expo-secure-store";

export default function App() {
  const tokenCache = {
    async getToken(key) {
      try {
        return SecureStore.getItemAsync(key);
      } catch (err) {
        return null;
      }
    },
    async saveToken(key, value) {
      try {
        return SecureStore.setItemAsync(key, value);
      } catch (err) {
        return;
      }
    },
  };
  return (
    <ClerkProvider 
    tokenCache={tokenCache}
    publishableKey='pk_test_bGlrZWQtcHJhd24tNC5jbGVyay5hY2NvdW50cy5kZXYk'>
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <SignedIn>
          <NavigationContainer>
            <TabNavigation/>
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
        <LoginScreen/>
        </SignedOut>

    </View>
    </ClerkProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
