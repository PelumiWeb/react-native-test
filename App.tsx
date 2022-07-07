import axios from './axios';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme } from "native-base";
import Homescreen from "./screens/Homescreen"
import Newscreen from './screens/Newscreen';

const Stack = createNativeStackNavigator();

export default function App() {
const theme = extendTheme({colors: {}});

  
 return (
  <NavigationContainer>
    <NativeBaseProvider> 
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Homescreen} />
    <Stack.Screen name="News" component={Newscreen} />

  </Stack.Navigator>
  </NativeBaseProvider>

</NavigationContainer>
 )
}


