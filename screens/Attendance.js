import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {View,Text, styles, TouchableOpacity, FlatList,ScrollView} from 'react-native';
import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProgressChart } from 'react-native-chart-kit';
import TokenContext from '../slices/TokenCOntext';
import { Image } from 'react-native';


const Attendance=({navigation})=>{
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
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Attendance</Text>
                    </View>
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
              </View>
            ),
        })
    },[]);


    const [attendanceList,setAttendanceList] = useState(null)
    const [isLoading,setIsLoading] = useState(false)


    const AttendanceList=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/attendanceList/',{
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
                setAttendanceList(data)
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Home")
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        AttendanceList();
        setIsLoading(false);
    },[])

    const subjects = []
    const dataset=[]
    const showData=[]
    const subj = []
    if(attendanceList!=null){
        attendanceList.data.map((item,index)=>{
            subj.push(item.subCode)
            subjects.push({sName:item.subject,sCode:item.subCode})
            dataset.push(item.current/item.required)
            showData.push(item.current+"/"+item.required)
        })
    }

    const chartConfig = {
        backgroundGradientFrom: "#F8F8FF",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#F8F8FF",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(255, 170, 68, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };
    // const colors = ['#FF3635','#FFAA44','#BDBDBD']   
    const [sub,setSub] = useState(0)
    const [isSub,setIsSub] = useState(false)

    

    return(
        <View className='flex-1'>
            {isLoading || subjects.length==0 || subj.length==0 || dataset.length==0 || showData.length==0?(<View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
            </View>):(
                <SafeAreaView className='bg-[#F8F8FF] flex-1'>
                <View className='h-[45%]'>
                    <View className='h-10 w-[95%] bg-[#FFA3A3] mx-3 mt-5 mb-3 rounded-[10px] flex-row items-center justify-end'>
                        <TouchableOpacity className='m-2 right-[40px] h-6 w-[30%] bg-white rounded-[10px] flex-row items-center justify-between px-3' onPress={()=>{
                            setIsSub(!isSub);
                        }}>
                            <Text>{subj.length>0?(subj[sub]):("-")}</Text>
                            {isSub?(<FontAwesome5 name="chevron-up" size={12} color="black"/>):(<FontAwesome5 name="chevron-down" size={12} color="black"/>)}
                        </TouchableOpacity>
                        <Text className='mr-7 text-[#800000] text-[18px] font-bold'>Attendance Report</Text>
                    </View>
                    
                    {isSub && subj!=null?(<View className='h-[50%] w-[30%] bg-white rounded-[10px] left-[20px]'>
                        <FlatList data={subj} renderItem={({item,index})=>{
                            return(
                                <TouchableOpacity key={index} className='w-[80%] h-5 border-b-[1px]  border-[#c5c6d0] ml-2 mt-1 justify-center items-center' onPress={()=>{
                                    setSub(index);
                                    setIsSub(false);
                                }}>
                                    <Text key={index}>{item}</Text>
                                </TouchableOpacity>
                            )
                        }}/>
                    </View>):(
                        <View className='w-[95%] mx-3 border-[1px] rounded-[10px] flex-row justify-center items-center'>
                            
                            <ProgressChart data={{
                                labels:["Current"],
                                data:[dataset[sub]]
                            }} 
                            chartConfig={chartConfig}
                            width={370}
                            height={240}
                            strokeWidth={18}
                            radius={80} />
                            <View className='absolute top-[72px] left-[98px] h-[41%] w-[27%] bg-white border-[3px] border-[#C1C1C1] justify-center items-center rounded-full'>
                                <Text className=' text-[#FF6968] text-[22px] font-extrabold'>{showData[sub]}</Text>
                            </View>
                        </View>
                    )}
                    
                </View>
    
                <ScrollView className='h-[55%] w-[95%] mx-3'>
                    {subjects.length==0?(<View><Text>No Data Found</Text></View>):(subjects.map((item,index)=>(
                        <View className='h-20 w-[95%] m-2 bg-white rounded-[10px] flex-row'>
                            <View className='h-20 w-[40%] justify-center items-center'>
                                <View className='h-10 w-10 rounded-full border-[1px] bg-[#0F123F] justify-center items-center'>
                                    <Text key={index} className='text-white'>{item.sCode}</Text>
                                </View>
                                <Text key={index} className='text-[12px]'>{item.sName}</Text>
                            </View>
    
                            <View className='h-20 w-[60%] pl-2  items-center flex-row'>
                                <View className='border-[1px] border-[#0F123F] flex-row rounded-[10px] gap-x-2'>
                                    <View className='h-7 w-7 rounded-full  justify-center items-center'>
                                        <Feather name="check-circle" size={18} color="#6FCF97" />
                                    </View>
                                    <View className='h-7 w-7 rounded-full  justify-center items-center'>
                                        <MaterialCommunityIcons name="progress-close" size={18} color="#FF6968" />
                                    </View>
                                    <View className='h-7 w-7 rounded-full  justify-center items-center'>
                                        <Feather name="check-circle" size={18} color="#6FCF97" />
                                    </View>
                                    <View className='h-7 w-7 rounded-full  justify-center items-center'>
                                        <MaterialCommunityIcons name="progress-close" size={18} color="#FF6968" />
                                    </View>
                                    <View className='h-7 w-7 rounded-full  justify-center items-center'>
                                        <Feather name="check-circle" size={18} color="#6FCF97" />
                                    </View>
                                </View>
                            </View>
    
                        </View>
                    )))}
                </ScrollView>
            </SafeAreaView>
            )}
        </View>
    );
}
export default Attendance