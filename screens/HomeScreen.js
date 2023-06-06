import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TokenContext from "../slices/TokenCOntext";



const HomeScreen=(props)=>{
    const navigation = useNavigation();
    const tokencontext = useContext(TokenContext)
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false,
        })
    })

    
    const [isLoading,setIsLoading] = useState(false);

    const LoginHandler=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/refresh',{
                method:'POST',
                credentials:'include',
            }).then((res)=>{
                if(res.ok){
                    const json = res.json();
                    return json;    
                }
                else{
                    throw new Error("Authentication Failed Please Login!");
                }
            }).then((data)=>{
                console.log("api", data.token)
                tokencontext.Token = data.token;
                setIsLoading(false);
                navigation.navigate("SideDrawer")
            }).catch((error)=>{alert(error);navigation.navigate("Login")})
        }catch (error) {
            setIsLoading(false);
            navigation.navigate("Login")
        }finally {
            setIsLoading(false);
        }
    }

    return(
        <View className='flex-1'>
            {isLoading?(
            <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
            </View>
        ):(
            <SafeAreaView className='flex-1 relative bg-[#F8F8FF]'>
            <View className="flex-row px-6 mt-8 items-center space-x-2">
                {/* <View className="w-16 h-16 border-2 rounded-full items-center justify-center">
                    <Image source={{
                        uri:"https://res.cloudinary.com/dvfzcddm4/image/upload/v1679380251/Icons/icon_mvdn24.png"
                    }} className='h-11 w-8 mt-1 mr-1'/>
                </View> */}
                <Text className="text-gray-700 text-[32px] font-bold">Global Access Center</Text>
            </View>

            <View className="px-6 mt-8 space-y-3">
                <Text className="text-[#800000] text-[24px] font-bold text-center">Good Morning</Text>
                <Text className="text-[#2A2B48] text-base text-center">Welcome to Global Access Center</Text>
            </View>

            <View className='flex-row justify-center items-center h-[70%]'>
                <Image source={require("../assets/images/welcome.png")} className='w-[350px] h-[350px]'></Image>
            </View>

            <View className='space-y-4'>
                <TouchableOpacity className='py-3 bg-[#0F123F] mx-7 rounded-xl' onPress={()=>{setIsLoading(true); LoginHandler()}}>
                    <Text className='text-xl font-bold text-center text-white'>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        )}
        </View>
    );
}
export default HomeScreen;