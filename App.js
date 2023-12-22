import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './screens/Register';
import Login from './screens/Login';
import MainScreen from './screens/MainScreen';
import Shop from './screens/subscreen/Shop';
import Toast from 'react-native-toast-message';
const Stack = createNativeStackNavigator();
import { Provider } from 'react-redux';
import { store } from "./redux/store"
import Hierarchy from './screens/subscreen/Hierarchy';
import UserDetail from './screens/subscreen/UserDetail';
import CreateOrder from './screens/subscreen/CreateOrder';

export default function App() {

  return (
    <Provider store={store}>
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
          <Stack.Screen name='Shop' component={Shop} options={{ gestureEnabled: false }} />
          <Stack.Screen name='Hierarchy' component={Hierarchy} options={{ gestureEnabled: false }} />
          <Stack.Screen name='UserDetail' component={UserDetail} options={{ gestureEnabled: false }} />
          <Stack.Screen name='CreateOrder' component={CreateOrder} options={{ gestureEnabled: false }} />

        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}


