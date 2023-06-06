import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {View,Text, TouchableOpacity, FlatList,ScrollView, Image} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { BarChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import TokenContext from '../slices/TokenCOntext';

const Progress=({navigation})=>{
    const tokenContext = useContext(TokenContext)
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
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Progress Report</Text>
                    </View>
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
              </View>
            ),
        })
    },[]);

    const [isSem,setIsSem]= useState(false);
    const [isLevel,setIsLevel] = useState(false);
    const [sem,setSem]= useState(tokenContext.semid);
    const [isShow,setIsShow] = useState(true); 
    const [level,setLevel] = useState("mid1");

    const subjects = []

    const semester = [1,2,3,4,5,6,7,8]

    const levels = ['mid1','mid2','rtu']


    const [progressData,setProgressData]=useState(null);
    const [isLoading,setIsLoading] = useState(false);

    const ProgressReport=async()=>{
        console.log(tokenContext.semid)
        try{
            await fetch('https://django-server-production-7222.up.railway.app/progressList/',{
                method:'POST',
                credentials:'include',
                headers:{
                    "Authorization":"Bearer "+tokenContext.Token,
                    'Accept': 'application/json',
                    "content-Type":"application/json"
                },
                body: JSON.stringify({
                    semid: tokenContext.semid
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
                setProgressData(data)
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Home")
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        ProgressReport();
        setSem(tokenContext.semid);
        setLevel("mid1");
        setIsLoading(false)
    },[])

    if(progressData!=null && progressData.mid1!=null){
        for(let i=0;i<progressData.mid1.length;i++){
            subjects.push(
                {sName:progressData.subName[i], sCode:progressData.subCode[i], sMid1:progressData.mid1[i],sMid2:progressData.mid2[i],sRTU:progressData.rtu[i]},
            )
        }
    }

    return(
        <View className='flex-1'>
            {isLoading || progressData==null?(
                <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
            </View>
            ):(
                <SafeAreaView className='bg-[#F8F8FF] flex-1'>
            <View className='h-[45%]'>
                <View className='h-10 w-[95%] bg-[#FFA3A3] mx-3 mt-5 mb-3 rounded-[10px] flex-row items-center justify-end'>
                    <Text className='mr-7 text-[#800000] text-[18px] font-bold'>Progress Bar</Text>
                    <TouchableOpacity className='m-2 h-6 w-20 bg-white rounded-[10px] flex-row items-center justify-between px-3' onPress={()=>{
                        setIsSem(!isSem);
                        setIsShow(false);
                        setIsLevel(false);
                    }}>
                        <Text>sem-{sem}</Text>
                        {isSem?(<FontAwesome5 name="chevron-up" size={12} color="black"/>):(<FontAwesome5 name="chevron-down" size={12} color="black"/>)}
                    </TouchableOpacity>
                    <TouchableOpacity className='m-2 h-6 w-20 bg-white rounded-[10px] flex-row items-center justify-between px-3' onPress={()=>{
                        setIsLevel(!isLevel);
                        setIsShow(false);
                        setIsSem(false);
                    }}>
                        <Text>{level}</Text>
                        {isLevel?(<FontAwesome5 name="chevron-up" size={12} color="black"/>):<FontAwesome5 name="chevron-down" size={12} color="black"/>}
                    </TouchableOpacity>
                </View>
                {isSem?(<View className='h-40 w-20 bg-white rounded-[10px] left-[200px]'>
                    <FlatList data={semester} renderItem={({item,index})=>{
                        return(
                            <TouchableOpacity key={index} className='w-[80%] h-5 border-b-[1px]  border-[#c5c6d0] ml-2 mt-1 justify-center items-center' onPress={()=>{
                                setSem(item);
                                tokenContext.semid = item;
                                if(tokenContext.semid==item){
                                    setProgressData(null)
                                    ProgressReport()
                                }
                                setIsSem(false);
                                setIsShow(true);
                            }}>
                                <Text key={index}>sem-{item}</Text>
                            </TouchableOpacity>
                        )
                    }}/>
                </View>):null}

                {isLevel?(<View className='h-20 w-20 bg-white rounded-[10px] left-[300px]'>
                    <FlatList data={levels} renderItem={({item,index})=>{
                        return(
                            <TouchableOpacity key={index} className='w-[80%] h-5 border-b-[1px]  border-[#c5c6d0] ml-2 mt-1 justify-center items-center' onPress={()=>{
                                setLevel(item);
                                setIsLevel(false);
                                setIsShow(true);
                            }}>
                                <Text key={index}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}/>
                </View>):null}
                
                {isShow && level=="mid1"?(
                    <BarChart
                    data={{
                      labels: progressData.subCode,
                      datasets: [
                        {
                          data:progressData.mid1,
                        },
                      ],
                    }}
                    width={370}
                    height={220}
                    chartConfig={{
                      backgroundColor: '#1cc910',
                      backgroundGradientFrom: '#eff3ff',
                      backgroundGradientTo: '#efefef',
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                    }}
                    style={{
                      borderRadius: 16,
                      padding:10
                    }}
                  />
                ):null}
                {isShow && level=="mid2"?(
                    <BarChart
                    data={{
                      labels: progressData.subCode,
                      datasets: [
                        {
                          data:progressData.mid2,
                        },
                      ],
                    }}
                    width={370}
                    height={220}
                    chartConfig={{
                      backgroundColor: '#1cc910',
                      backgroundGradientFrom: '#eff3ff',
                      backgroundGradientTo: '#efefef',
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                    }}
                    style={{
                      borderRadius: 16,
                      padding:10
                    }}
                  />
                ):null}
                {isShow && level=="rtu"?(
                    <BarChart
                    data={{
                      labels: progressData.subCode,
                      datasets: [
                        {
                          data:progressData.rtu,
                        },
                      ],
                    }}
                    width={370}
                    height={220}
                    chartConfig={{
                      backgroundColor: '#1cc910',
                      backgroundGradientFrom: '#eff3ff',
                      backgroundGradientTo: '#efefef',
                      decimalPlaces: 0,
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                    }}
                    style={{
                      borderRadius: 16,
                      padding:10
                    }}
                  />
                ):null}
            </View>

            <ScrollView className='h-[55%] w-[95%] mx-3'>
                {(subjects.length==0)?(<Text className='text-[20px] mt-5 text-center'>No Record Found</Text>):(
                    <View>
                        {subjects.map((item,index)=>(
                    <View className='h-20 w-[95%] m-2 bg-white rounded-[10px] flex-row'>
                        <View className='h-20 w-[40%] justify-center items-center'>
                            <View className='h-10 w-10 rounded-full  bg-[#0F123F] justify-center items-center'>
                                <Text key={index} className='text-white'>{item.sCode}</Text>
                            </View>
                            <Text key={index} className='text-[12px]'>{item.sName}</Text>
                        </View>

                        <View className='h-20 w-[60%] pl-5 items-center flex-row'>
                            <View className='h-20 w-[20%] justify-center items-center ml-5'>
                                <View className='h-10 w-10 rounded-full  bg-[#BEFBD7] justify-center items-center'>
                                    <Text key={index}>{item.sMid1}</Text>
                                </View>
                                <Text className='text-[12px]'>Mid-1</Text>
                            </View>
                            <View className='h-20 w-[20%] justify-center items-center ml-5'>
                                <View className='h-10 w-10 rounded-full  bg-[#FFDDB9] justify-center items-center'>
                                    <Text key={index}>{item.sMid2}</Text>
                                </View>
                                <Text className='text-[12px]'>Mid-2</Text>
                            </View>
                            <View className='h-20 w-[20%] justify-center items-center ml-5'>
                                <View className='h-10 w-10 rounded-full  bg-[#FFA3A3] justify-center items-center'>
                                    <Text key={index}>{item.sRTU}</Text>
                                </View>
                                <Text className='text-[12px]'>RTU</Text>
                            </View>
                        </View>

                    </View>
                ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
            )}
        </View>
    );
}
export default Progress