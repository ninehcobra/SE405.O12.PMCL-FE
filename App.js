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
import CreateShop from './screens/subscreen/CreateShop'
import AboutUs from './screens/subscreen/AboutUs';
import ChangePassword from './screens/subscreen/ChangePassword';
import Search from './screens/subscreen/Search';
import Tracking from './screens/subscreen/Tracking';

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
          <Stack.Screen name='CreateShop' component={CreateShop} options={{ gestureEnabled: false }} />
          <Stack.Screen name='AboutUs' component={AboutUs} options={{ gestureEnabled: false }} />
          <Stack.Screen name='ChangePassword' component={ChangePassword} options={{ gestureEnabled: false }} />
          <Stack.Screen name='Search' component={Search} options={{ gestureEnabled: false }} />
          <Stack.Screen name='Tracking' component={Tracking} options={{ gestureEnabled: false }} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}


