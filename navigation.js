import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login';
import SideDrawer from './components/SideDrawer';

const stack = createNativeStackNavigator();

export default function Navigation(){
    return(
        <NavigationContainer>
            <stack.Navigator initialRouteName='Home'>
                <stack.Screen name="Home" component={HomeScreen}></stack.Screen>
                <stack.Screen name="Login" component={Login}></stack.Screen>
                <stack.Screen name="SideDrawer" component={SideDrawer}></stack.Screen>
            </stack.Navigator>
        </NavigationContainer>
    )
}