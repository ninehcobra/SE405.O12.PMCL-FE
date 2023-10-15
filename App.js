import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Login from './screens/Login';
import Register from './screens/Register';
import MainScreen from './screens/MainScreen';


export default function App() {

  console.log("hi  3 4")
  return (
    <SafeAreaProvider>
      <MainScreen x={1}></MainScreen>
    </SafeAreaProvider>
  );
}


