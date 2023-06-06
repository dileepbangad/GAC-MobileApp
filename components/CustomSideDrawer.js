import { View,Text,Image, TouchableOpacity} from "react-native"
import { MaterialIcons,FontAwesome5,MaterialCommunityIcons,FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import TokenContext from "../slices/TokenCOntext";

const CustomSideDrawer=()=>{
    const navigation = useNavigation();
    const tokenContext = useContext(TokenContext);
    const signoutHandler=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/logout',{
                method:'POST',
                credentials:'include',
            }).then((res)=>{
                if(res.ok){
                    const json = res.json();
                    tokenContext.Token=null;
                    tokenContext.name = null;
                    tokenContext.gid = null;
                    tokenContext.email = null;
                    tokenContext.semid = null;
                    tokenContext.profileurl = null;
                    tokenContext.section = null;
                    return json   
                }else{
                    navigation.navigate("SideDrawer")
                }
            }).then((data)=>{
                console.log(data)
                navigation.navigate("Home")
            });                
        }catch (error) {
            console.error(error);
            navigation.navigate("SideDrawer")
        }
    }
    return(
        <SafeAreaView className='flex-1 gap-y-5 bg-[#F8F8FF]'>
            <View className='h-[20%] bg-[#0F123F] items-center'>
                <View className='h-[60%] w-[35%] rounded-full bg-white items-center justify-center mt-3'>
                    <Image source={{uri:tokenContext.profileurl}} className='h-[95px] w-[95px] rounded-full'></Image>
                </View>
                <Text className='text-white text-[20px] mt-2 font-extrabold]'>{tokenContext.gid}</Text>
            </View>

            <View className='h-[60%] items-center'>
                <TouchableOpacity className='h-[10%] w-[90%] p-2 flex-row' onPress={()=>{navigation.navigate("Profile")}}>
                    <FontAwesome5 name="user" size={24} color="#FF6968" />
                    <Text className='mt-[3px] ml-5 text-[#0F123F] text-[15px] font-extrabold'>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-[10%] w-[90%] p-2 flex-row' onPress={()=>{navigation.navigate("Lectures")}}>
                    <MaterialCommunityIcons name="table-clock" size={24} color="#FF6968" />
                    <Text className='mt-[3px] ml-4 text-[#0F123F] text-[15px] font-extrabold'>Scheduled Lectures</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-[10%] w-[90%] p-2 flex-row' onPress={()=>{navigation.navigate("Department")}}>
                    <MaterialCommunityIcons name="information-outline" size={24} color="#FF6968" />
                    <Text className='mt-[3px] ml-4 text-[#0F123F] text-[15px] font-extrabold'>Department Info</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-[10%] w-[90%] p-2 flex-row' onPress={()=>{navigation.navigate("Calendar")}}>
                    <Ionicons name="md-calendar-sharp" size={24} color="#FF6968"/>
                    <Text className='mt-[3px] ml-4 text-[#0F123F] text-[15px] font-extrabold'>Academic Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-[10%] w-[90%] p-2 flex-row' onPress={()=>{navigation.navigate("Notice")}}>
                    <MaterialCommunityIcons name="message-bulleted" size={24} color="#FF6968" />
                    <Text className='mt-[3px] ml-4 text-[#0F123F] text-[15px] font-extrabold'>Notice</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-[10%] w-[90%] p-2 flex-row' onPress={()=>{navigation.navigate("AboutUs")}}>
                    <FontAwesome name="pencil-square-o" size={24} color="#FF6968" />
                    <Text className='mt-[3px] ml-4 text-[#0F123F] text-[15px] font-extrabold'>About Us</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-[10%] w-[90%] p-2 flex-row' onPress={()=>{navigation.navigate("ContactUs")}}>
                    <FontAwesome5 name="headphones-alt" size={24} color="#FF6968" />
                    <Text className='mt-[3px] ml-4 text-[#0F123F] text-[15px] font-extrabold'>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity className='h-[10%] w-[90%] p-2 flex-row' onPress={()=>{navigation.navigate("Setting")}}>
                    <MaterialIcons name="settings" size={24} color="#FF6968" />
                    <Text className='mt-[3px] ml-4 text-[#0F123F] text-[15px] font-extrabold'>Setting</Text>
                </TouchableOpacity>
            </View>
            
            <View className='h-[12%] border-t-[1px] border-[#BABEC6] justify-center'>
                <TouchableOpacity className='h-[60%] w-[80%] mt-2 ml-5 p-2 flex-row' onPress={()=>{signoutHandler()}}>
                    <MaterialIcons name="exit-to-app" size={35} color="#FF6968"/>
                    <Text className='mt-[3px] ml-5 text-[#0F123F] text-[20px] font-extrabold'>Sign-Out</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default CustomSideDrawer