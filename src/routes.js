import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './pages/Home/index';
import Camera from './pages/Camera/index';
import Gallery from './pages/Gallery/index';

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: "#3CB371" }, headerTintColor: "#FFF" }}
      initialRouteName="Home" >
      <Stack.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Stack.Screen name="Camera" component={Camera} options={{ title: "Camera" }} />
      <Stack.Screen name="Gallery" component={Gallery} options={{ title: "Galeria" }} />
    </Stack.Navigator>
  );
}
