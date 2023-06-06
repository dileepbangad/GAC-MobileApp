import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import {View,Text, TouchableOpacity, Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const ContactUs=({navigation})=>{
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
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Contact Us</Text>
                    </View>
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
              </View>
            ),
        })
    },[]);

    return (
        <View className='bg-[#F8F8FF] flex-1 items-center'>
            <View className='h-10 w-[95%] bg-[#FFA3A3] mt-5 rounded-[10px] flex-row items-center justify-end'>
                    <Text className='mr-7 text-[#800000] text-[18px] font-bold'>Contact Us</Text>
            </View>
            <View className='h-[85%] w-[95%] bg-white mx-5 mt-5 py-5 rounded-[10px] items-center'>
                <Image source={require('../assets/images/Mainlogo.png')} className='h-[9%] w-[43%]'/>
                <View className='h-[85%] w-[90%] mt-5'>
                    <Text className='text-[14px] font-extrabold'>Welcome to Global Access Center!</Text>
                    <Text className='text-[14px] text-[#747476] text-justify'>
                        {"\n"}Email : globalaccesscenter@gmail.com{"\n\n"}Contact : +91 8887776654{"\n\n"}In case you require any further assistance, please mail us at globalaccesscenter@gmail.com
                    </Text>
                </View>              
            </View>
        </View>
    );
}

export default ContactUs;