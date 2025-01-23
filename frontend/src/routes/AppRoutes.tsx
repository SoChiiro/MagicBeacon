import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

// Typage des routes pour TypeScript
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Profile: { user: {
      token: null; id: string; name: string; email: string; 
} };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppRoutes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={Register} options={{ title: 'Register' }} />
        <Stack.Screen name="Profile" component={Profile} options={{title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
