import { useContext, useEffect, useLayoutEffect,useState } from 'react';
import {View,Text, TouchableOpacity, Image,ScrollView} from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { SafeAreaView } from 'react-native-safe-area-context';
import TokenContext from '../slices/TokenCOntext';

const Department=({navigation})=>{
    const tokenContext = useContext(TokenContext);
    const [isLoding,setIsLoading]= useState(false);
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
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Department Info</Text>
                    </View>
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
              </View>
            ),
        })
    },[]);

    const [faculty,setFaculty] = useState(null)
    const getFacultyDetails=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/department/',{
                method:'POST',
                credentials:'include',
                headers:{
                    "Authorization":"Bearer "+tokenContext.Token,
                },   
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
                setFaculty(data.data);
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("setting")
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        getFacultyDetails();
        setIsLoading(false);
    },[])

    const faculties = []

    if(faculty!=null){
        for(let i=0;i<faculty.length;i++){
            faculties.push({name:faculty[i].name,email:faculty[i].email,designation:faculty[i].designation,qualification:faculty[i].qualification,research:faculty[i].research,contact:'-',uri:faculty[i].photo,department:faculty[i].department})
        }
    }

    const [item1,setItem1] = useState(null);
    const[isViewed,setIsViewed] = useState(null);
    console.log("isdifd",isViewed)
    return(
        <View className='flex-1'>
            {isLoding || faculty==null?(
                <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
            </View>
            ):(
                <SafeAreaView className='bg-[#F8F8FF] flex-1 items-center'>
                <View className='h-10 w-[95%] mt-5 bg-[#FFA3A3] rounded-[10px] flex-row items-center justify-end'>
                        <Text className='mr-7 text-[#800000] text-[18px] font-bold'>CS Department</Text>
                </View>
                <View className='h-40 w-[95%] bg-white mt-5 rounded-[10px] flex-row items-center'>
                    <View className='h-[90%] w-[40%] justify-center items-center'>
                        <View className='h-[60%] w-[60%] bg-white rounded-full border-2 border-[#0F123F] justify-center items-center'>
                            <FontAwesome5 name="user" size={40} color="#FF6968" />
                        </View>
                        <Text className='mt-3 pl-1 text-[14px] font-extrabold text-[#800000]'>Head of Department</Text>
                    </View>
                    <View className="h-[90%] w-[60%]  justify-center items-center">
                        <Text className='text-[20px] font-extrabold'>Mr. Pradeep Jha</Text>
                        <Text className='text-[12px] font-extrabold text-[#C1C1C1]'>hod.cse@gitjaipur.com</Text>
                    </View>
                </View>
                <View className='h-10 w-[95%] bg-[#0F123F] mt-5 rounded-[10px] flex-row items-center justify-center'>
                        <Text className=' text-white text-[18px] font-bold'>Faculties</Text>
                </View>
    
                <ScrollView className='h-[60%] w-[100%] mt-5 rounded-[10px]'>
                    {faculties.map((item,index)=>(
                        <View key={index} className='h-20 w-[95%] m-2 bg-white rounded-[10px] flex-row'>
                            <View className='h-20 w-[20%] justify-center ml-5'>
                                <View className='h-[75%] w-[80%] rounded-full border-2 border-[#0F123F] justify-center items-center'>
                                    <Image source={{uri:item.uri}}  className='h-[50px] w-[50px] rounded-full'/>
                                </View>
                                {/* <Text className='text-[12px]'>{item.sName}</Text> */}
                            </View>
    
                            <View className='h-20 w-[60%] justify-center'>
                               <Text className='text-[16px] pl-2 font-extrabold text-[#800000]'>{item.name}</Text>
                               <Text className='text-[13px] pl-2 font-extrabold text-[#C1C1C1]'>{item.email}</Text>
                            </View>
    
                            <TouchableOpacity className='h-20 w-[10%] items-center justify-center' onPress={()=>{setIsViewed(item.email);console.log(item.email)}}>
                                <MaterialCommunityIcons name="information-outline" size={30} color="#0F123F" />
                                <Modal isVisible={isViewed ==item.email?(true):null} backdropOpacity={0.2} animationIn="slideInUp">
                                    <View className='h-[80%] bg-white rounded-[10px]'>
                                        <View className='h-10 flex-row rounded-t-[10px] justify-end'>
                                            <TouchableOpacity className='m-2' onPress={()=>{setIsViewed(null)}}>
                                                <MaterialCommunityIcons name="close-circle-outline" size={25} color="black" />
                                            </TouchableOpacity>
                                        </View>
                                        <View className='h-[70%] w-[90%] rounded-[10px] mt-10 mx-5 border-2 py-5 border-[#0F123F] items-center'>
                                            <View className='items-center'>
                                                <Image source={{uri:item.uri}}  className='h-[120px] w-[120px] rounded-full'/>
                                                <Text className='text-[#0F123F] text-[22px]'>{item.name}</Text>
                                            </View>
                                            <View className='mt-10 space-y-5 w-[80%] '>
                                                <View className='flex-row space-x-5 justify-between'>
                                                    <Text className='text-[#0F123F] font-extrabold text-[14px]'>Department</Text>
                                                    <Text className='text-gray-700 font-extrabold text-[14px]'>{item.department}</Text>
                                                </View>
                                                <View className='flex-row space-x-5 justify-between'>
                                                    <Text  className='text-[#0F123F] font-extrabold text-[14px]'>Designation</Text>
                                                    <Text className='text-gray-700 font-extrabold text-[14px]'>{item.designation}</Text>
                                                </View>
                                                <View className='flex-row space-x-5 justify-between'>
                                                    <Text  className='text-[#0F123F] font-extrabold text-[14px]'>Qualification</Text>
                                                    <Text className='text-gray-700 font-extrabold text-[14px]'>{item.qualification}</Text>
                                                </View>
                                                <View className='flex-row space-x-5 justify-between'>
                                                    <Text  className='text-[#0F123F] font-extrabold text-[14px]'>Research</Text>
                                                    <Text className='text-gray-700 font-extrabold text-[14px]'>{item.research}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </TouchableOpacity>
    
                        </View>
                    ))}
                </ScrollView>
            </SafeAreaView>
            )}
        </View>
    );
}
export default Department