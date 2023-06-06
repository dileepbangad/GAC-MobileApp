import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import BottomNavigator from "./BottomNavigator";
import CustomSideDrawer from "./CustomSideDrawer";

const Drawer=createDrawerNavigator();

const SideDrawer=()=>{
    const navigation = useNavigation();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false,
        })
    },[]);

    return(
        <Drawer.Navigator useLegacyImplementation={true} drawerContent={props=><CustomSideDrawer {...props}/>}>
            <Drawer.Screen name="BottomNavigator" component={BottomNavigator} options={{headerShown:true}}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default SideDrawer