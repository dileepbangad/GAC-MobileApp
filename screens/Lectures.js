import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {View,Text, TouchableOpacity, FlatList, Button,Image} from 'react-native';
import { FontAwesome5,MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { SafeAreaView } from 'react-native-safe-area-context';
import TokenContext from '../slices/TokenCOntext';
import PdfReader from '@bildau/rn-pdf-reader';


const Lectures=({navigation})=>{

    const tokenContext = useContext(TokenContext);
    const [isLoading,setIsLoading] = useState(false);
    const [isViewed,setIsViewed] = useState(false);
    const [pdfHeading,setPdfHeading] = useState("");

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
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Scheduled Lectures</Text>
                    </View>
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
              </View>
            ),
        })
    },[]);

    const [scheduleData,setScheduleData] = useState(null);
    const scheduledLecture=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/schedule/',{
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
                setScheduleData(data);
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("setting")
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        scheduledLecture();
        setIsLoading(false);
    },[])

    const timetable= [];
    if(scheduleData!=null){
       timetable.push({section:scheduleData.section, updateOn:scheduleData.updateDate, link:scheduleData.link})
    }

    return(
        <View className='flex-1'>
            {isLoading || scheduleData==null?(
                <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
            </View>
            ):(
                <SafeAreaView className='bg-[#F8F8FF] flex-1 items-center'>
                <View className='h-10 w-[95%] bg-[#FFA3A3] mx-3 mt-5 rounded-[10px] flex-row items-center justify-end'>
                        <Text className='mr-7 text-[#800000] text-[18px] font-bold'>Be on Time!</Text>
                </View>
    
                {(timetable.length==0)?(<Text className='text-[20px] mt-5'>No Data Found</Text>):(
                        <FlatList className='w-[95%] ' data={timetable} renderItem={({item,index})=>{
                                return(
                                    <View key={index} className='mt-5 items-center px-3 h-10 bg-white rounded-[10px] flex-row justify-between'>
                                        <Text className='text-[#0288D1] font-extrabold'>Section-{item.section}</Text>
                                        <Text className='text-[#FF8E07] font-extrabold'>Update On : {item.updateOn}</Text>
                                        <TouchableOpacity key={index} className='h-[60%] w-[15%] bg-[#6FCF97] rounded-[10px] justify-center items-center' onPress={()=>{setIsViewed(true);setPdfHeading("Section-"+item.section);}}>
                                            <Text className='text-white text-[12px]'>View</Text>
                                            <Modal isVisible={isViewed} backdropOpacity={0.2} animationIn="slideInUp">
                                                <View className='h-[80%] bg-white rounded-[10px]'>
                                                    <View className='h-10 bg-[#111441] flex-row rounded-t-[10px]'>
                                                        <View className='w-[90%] justify-center pl-[110px]'>
                                                            <Text className='text-white text-[20px] font-extrabold'>{pdfHeading}</Text>
                                                        </View>
                                                        <TouchableOpacity className='mt-2' onPress={()=>{setIsViewed(false)}}>
                                                            <MaterialCommunityIcons name="close" size={24} color="white"/>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <PdfReader withScroll withPinchZoom source={{
                                                                uri:item.link
                                                    }}/>
                                                </View>
                                            </Modal>
                                        </TouchableOpacity>
                                    </View>
                                )
    r                    }}/>
                 )}
            </SafeAreaView>
            )}
        </View>
    );
}
export default Lectures