import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
import Login from './screens/Login';
import MainScreen from './screens/MainScreen';
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Register" component={Register} options={{ gestureEnabled: false }} />
        <Stack.Screen name='MainScreen' component={MainScreen} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>

  );
}


