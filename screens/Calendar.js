import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {View,Text, TouchableOpacity} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Agenda } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import TokenContext from '../slices/TokenCOntext';

const Calendar=({navigation})=>{
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
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Calendar</Text>
                    </View>
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
              </View>
            ),
        })
    },[]);

    const [events,setEvents] = useState(null)
    const getEventDetails=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/eventList/',{
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
                setEvents(data.data);
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("setting")
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        getEventDetails();
        setIsLoading(false);
    },[])

    x = {}
    if(events!=null){
        events.map((item,index)=>{
            x[item.date] = [{name:item.title + "-" +item.desc+"-"+item.event}]
        })
    }
    
    return(
        <SafeAreaView className='bg-[#F8F8FF] flex-1'>
            <View className='h-10 w-[95%] bg-[#FFA3A3] mx-3 mt-5 rounded-[10px] flex-row items-center justify-end'>
                    <Text className='mr-7 text-[#800000] text-[18px] font-bold'>Event Calendar</Text>
            </View>
            <View className='h-[90%] w-[95%] mx-3 mt-5'>
                <Agenda 
                items={x} renderItem={(item, firstItemInDay) => {
                    return (
                    <View className='h-20 w-[85%] m-5 bg-white rounded-[10px] justify-center items-center'>
                        <Text key={firstItemInDay}>{item.name}</Text>
                    </View>
                    )
                }}></Agenda>
            </View>
        </SafeAreaView>
    );
}
export default Calendar