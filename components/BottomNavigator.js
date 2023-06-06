import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View,Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5,MaterialIcons } from "@expo/vector-icons";

import Dashboard from "../screens/Dashboard";
import Library from "../screens/Library";
import Scanner from "../screens/Scanner";
import FeeDesk from "../screens/Feedesk";
import Profile from "../screens/Profile";
import Lectures from "../screens/Lectures";
import Department from "../screens/Department";
import Notice from "../screens/Notice";
import AboutUs from "../screens/AboutUs";
import ContactUs from "../screens/ContactUs";
import Setting from "../screens/Setting";
import Progress from "../screens/Progress";
import Assignment from "../screens/Assignment";
import Attendance from "../screens/Attendance";
import Calendar from "../screens/Calendar";
import { SafeAreaView } from "react-native-safe-area-context";
import FeeTransaction from "../screens/FeeTransaction";

const Tab = createBottomTabNavigator();

const BottomNavigator=()=>{
    const navigation = useNavigation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false,
        })
    },[]);

    return(
        <SafeAreaView className='bg-[#F8F8FF] flex-1'>
            <Tab.Navigator initialRouteName="Home" screenOptions={{tabBarActiveTintColor: '#FFB8B7',tabBarInactiveTintColor:'white',tabBarStyle:{backgroundColor:'#0F123F'},tabBarShowLabel:true}}>
                <Tab.Screen name="Home" component={Dashboard} options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="home" size={size} color={color}/>
                    ),
                }}></Tab.Screen>

                <Tab.Screen name="Library" component={Library} options={{
                    tabBarLabel: "Library",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="library-books" size={size} color={color} />
                    ),
                }}></Tab.Screen>

                {/* <Tab.Screen name="Scanner" component={Scanner} options={{
                    tabBarLabel: "Scanner" ,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="qr-code-scanner" size={size} color={color} />
                    ),
                }}></Tab.Screen> */}

                <Tab.Screen name="Feedesk" component={FeeDesk} options={{
                    tabBarLabel: "Feedesk",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="wallet" size={size} color={color} />
                    ),
                }}></Tab.Screen>

                <Tab.Screen name="Profile" component={Profile} options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="user" size={size} color={color} />
                    ),
                }}></Tab.Screen>

                <Tab.Screen name='Lectures' component={Lectures} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                <Tab.Screen name='Department' component={Department} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                <Tab.Screen name='Notice' component={Notice} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                <Tab.Screen name='AboutUs' component={AboutUs} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                <Tab.Screen name='ContactUs' component={ContactUs} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                <Tab.Screen name='Setting' component={Setting} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                <Tab.Screen name='Progress' component={Progress} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                <Tab.Screen name='FeeTransaction' component={FeeTransaction} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                <Tab.Screen name='Assignment' component={Assignment} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                <Tab.Screen name='Attendance' component={Attendance} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                <Tab.Screen name='Calendar' component={Calendar} options={{tabBarItemStyle:{display:'none',},}}></Tab.Screen>
                
            </Tab.Navigator>
        </SafeAreaView>
    );
}

export default BottomNavigator