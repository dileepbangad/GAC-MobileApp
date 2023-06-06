import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import {View,Text, TouchableOpacity, Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const AboutUs=({navigation})=>{
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
                        <Text className="mt-2 text-white text-[22px] font-extrabold">About Us</Text>
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
            <View className='h-10 w-[95%] bg-[#FFA3A3] mx-5 mt-5 rounded-[10px] flex-row items-center justify-end'>
                    <Text className='mr-7 text-[#800000] text-[18px] font-bold'>About Us</Text>
            </View>
            <View className='h-[85%] w-[95%] bg-white mx-5 mt-5 py-5 rounded-[10px] items-center'>
                <Image source={require('../assets/images/Mainlogo.png')} className='h-[9%] w-[43%]'/>
                <View className='h-[85%] w-[90%] mt-5'>
                    <Text className='text-[14px] font-extrabold'>Welcome to Global Access Center!</Text>
                    <Text className='text-[14px] text-[#747476] text-justify'>
                        {"\n"}Digitalization is the new target in the ongoing phase, where the students also expect their college protocols to move towards digital approach.{"\n\n"}To make Educational Institutes worth competing 
                        with the real-world complications which vanishes precious time of students and Institute, we are 
                        introducing a totally time and effort saving platform which will enable the students to get the 
                        progress report, status of their attendance, submit the assignments, status of due and undue fees 
                        with online payment facility, access to digital library including topper’s notes, books 
                        recommendation based on the subjects.{"\n\n"}In this project we are creating a platform for students where they can meet all the requirements 
                        of each department which a student has to fulfill just through a single touch by sitting at their 
                        desired place which includes: ✓ Progress Report ✓ Attendance Record ✓ Assignments ✓
                        Lecture Details ✓ Digital Library ✓ Payment Desk Every student gets a uniquely generated GID 
                        (Global ID) with default passwords on their registered college Email Address. The password can 
                        be changed later, on the platform itself.
                    </Text>
                </View>              
            </View>
        </View>
    );
}

export default AboutUs;