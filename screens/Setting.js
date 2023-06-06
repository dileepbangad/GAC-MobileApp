import { useNavigation } from '@react-navigation/native';
import { useContext, useLayoutEffect, useState } from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import TokenContext from '../slices/TokenCOntext';

const Setting=({navigation})=>{
    const tokenContext = useContext(TokenContext);
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            header: () =>
            (
              <View className="h-[50px] bg-[#0F123F]">
                <View className="flex-row items-center">
                    <TouchableOpacity className='px-5 mt-3' onPress={()=>{navigation.openDrawer()}}>
                        <FontAwesome5 name="bars" size={25} color="white" />
                    </TouchableOpacity>
                    <View className='w-[70%] items-center justify-center' >
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Setting</Text>
                    </View>
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
              </View>
            ),
        })
    },[]);

    const changeAPI=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/changepassword',{
                method:'POST',
                credentials:'include',
                headers:{
                    "Authorization":"Bearer "+tokenContext.Token,
                    'Accept': 'application/json',
                    "content-Type":"application/json",
                },
                body: JSON.stringify({
                    password :password
                  }),
            }).then((res)=>{
                console.log(res)
                if(res.ok){
                    const json = res.json();
                    return json
                }else{
                    throw res.json;
                }
            }).then((data)=>{
                console.log(data)
                alert(data.msg)
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("setting")
        }
    }

    const changePassword=()=>{
        if(password==null || password.trim()==""){
            setIsClicked(false)
        }
        else if(password==change){
            changeAPI()
            setIsClicked(false);
        }else{
            alert("Password Do not match")
            setIsClicked(true)
        }
    }

    const [isClicked,setIsClicked]=useState(false);
    const [password,setPassword] = useState(null);
    const [change,setChange] =useState(null);
    const [isLoading,setIsLoading] = useState(false);

    return (
        <View className='flex-1'>
            {isLoading?(
            <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                    <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
                </View>
        ):(
            <ScrollView className='bg-[#F8F8FF] flex-1'>
            <View className='items-center'><View className='h-10 w-[95%] bg-[#FFA3A3] mt-5 rounded-[10px] flex-row items-center justify-end'>
                    <Text className='mr-7 text-[#800000] text-[18px] font-bold'>Setting</Text>
            </View>
            <View className='bg-white h-20 w-[95%] mt-5 px-5 rounded-[10px] flex-row justify-between items-center'>
                <View>
                    <Text className='text-[#0F123F] font-extrabold text-[22px]'>Change Password</Text>
                </View>
                <TouchableOpacity className='bg-[#398384] rounded-[10px] h-[40%] w-[30%] justify-center items-center' onPress={()=>{
                if(isClicked){
                    changePassword();
                    setIsClicked(false);
                }
                setIsClicked(!isClicked);}}>
                    <Text className='text-white font-extrabold'>{isClicked?("CHANGE"):("Click")}</Text>
                </TouchableOpacity>
            </View>
            {isClicked?(
                    <View className='bg-white mt-5 p-7 space-y-3 h-80 rounded-[10px] w-[95%]'>
                        <Text className='text-gray-700 text-[16px] ml-4'>Password</Text>
                        <TextInput onChangeText={setPassword} className='p-4 bg-[#F8F8FF] text-gray-700 text-[16px] rounded-2xl mb-3 border-2 border-[#FFA3A3]'
                        placeholder='Enter Your New Password' secureTextEntry>
                        </TextInput>
                        <Text className='text-gray-700 text-[16px] ml-4'>Confirm Password</Text>
                        <TextInput onChangeText={setChange} className='p-4 bg-[#F8F8FF] text-gray-700 text-[16px] rounded-2xl mb-3 border-2 border-[#FFA3A3]'
                        secureTextEntry
                        placeholder='Re-Enter your Password '>
                        </TextInput>
                    </View>
                ):null}</View>
        </ScrollView>
        )}
        </View>
    );
}

export default Setting;