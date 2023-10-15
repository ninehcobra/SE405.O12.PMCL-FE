import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { Button, FlatList, StyleSheet, Switch, View, Alert, SafeAreaProvider } from 'react-native';
import { ActivityIndicator, MD2Colors, BottomNavigation, Text, Appbar } from 'react-native-paper';


export default function App() {




  useEffect(() => {

  }, [])

  console.log("hi  3 4")
  return (
    <View>
      <Text>Hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    flexDirection: 'column-reverse'
  },
});

