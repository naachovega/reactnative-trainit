import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import AuthContex, { initialUser, initialLocation } from './Context/index';
import AsyncStorage from './Storage/index.js'
import HomeNavigation from './Screens/Navigation';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import { useColorScheme } from 'react-native'
import LoginNavigation from './Screens/Navigation/LoginNavigation';


export default function App() {

  const [user, setUser] = useState(initialUser)
  const [theme, setTheme] = useState(useColorScheme())
  const [location, setLocation] = useState(initialLocation)

  useEffect(useCallback(() => {
    AsyncStorage.getData('user')
      .then(data => {
        if (data) {
          setUser(data)
        }
      });
  }), [])

  useEffect(useCallback(() => {
    //Guarda el user en el storage del dispositivo

    if (user) {
      AsyncStorage.storeData('user', user)
    } else {
      AsyncStorage.clearAll()
    }

  }), [user])


  const [fontsLoaded] = useFonts({
    'Poppins-MediumItalic': require('./assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic': require('./assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-BoldItalic': require('./assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold': require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <AuthContex.Provider value={{ user, setUser, theme, setTheme, location, setLocation }}>
      <StatusBar style="dark" />
      {!user ?
        <LoginNavigation />
        :
        <HomeNavigation />
      }
    </AuthContex.Provider>
  )
} 
