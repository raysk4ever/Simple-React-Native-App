import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import LoginScreen from './screens/Login';
import PostScreen from './screens/Post';

const Stack = createNativeStackNavigator();

function Routes() {
  const user: any = null;
  const options: NativeStackNavigationOptions = {
    headerShadowVisible: false,
    headerShown: true,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={options}
        initialRouteName={user ? 'Home' : 'Login'}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
