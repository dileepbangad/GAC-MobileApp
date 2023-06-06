import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {View,Text, TouchableOpacity, Image} from 'react-native';
import {FontAwesome, FontAwesome5,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TokenContext from '../slices/TokenCOntext';

const Dashboard=({navigation})=>{
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
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Dashboard</Text>
                    </View>
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
              </View>
            ),
        })
    },[]);

    const [isLoading,setIsLoading] = useState(false);

    const userData=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/user',{
                method:'GET',
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
                tokenContext.gid = data.gid;
                tokenContext.email = data.email;
                tokenContext.name = data.name;
                tokenContext.semid = data.semid;
                tokenContext.section = data.section;
            }).catch((data)=>{navigation.navigate("Home")});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Home")
        }
    }

    const AssignmentList=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/assignments/',{
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
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Home")
        }
    }

    const [dashboardData,setDashboardData]=useState(null);

    const Dashboardcontent=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/dashboard/',{
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
                tokenContext.profileurl=data.profile_pic;
                setDashboardData(data)
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Home")
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        userData();
        AssignmentList();
        Dashboardcontent();
        setIsLoading(false)
    },[])


    
    return(
        <SafeAreaView className='flex-1'>
            {isLoading || dashboardData==null?(
                <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                    <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
                </View>
            ):(
                <SafeAreaView className='bg-[#F8F8FF] flex-1'>
            <View className='h-10 w-[90%] bg-[#FFA3A3] mx-5 mt-5 mb-3 rounded-[10px] flex-row items-center justify-end'>
                    <Text className='mr-5 text-[#800000] text-[18px] font-bold'>Activity Dashboard</Text>
            </View>

            <View className="mt-2 mx-5 flex-row">
                <View className="h-[70px] w-[70px] border-2 rounded-full justify-center items-center border-[#0F123F]">
                    {/* <FontAwesome5 name="user" size={35} color="#FF6968" /> */}
                    <Image source={{uri:tokenContext.profileurl}} className='h-[60px] w-[60px] rounded-full'></Image>
                </View>
                <View className="mt-3 w-[75%] h-20 ml-3">
                    <Text className="text-[#FF6968] text-[20px]">Hello, {dashboardData.name}</Text>
                    <Text className="text-[#BABEC6] text-[13px] mt-1">Check your activities in this dashboard</Text>
                </View>
            </View>

            <View className="mt-3 ml-5 h-[20%]">
                <View className="flex-row h-[50%] justify-between w-[95%]">
                    <View className="flex-row h-[100%] w-[45%] bg-white rounded-[10px]">
                        <View className="w-[27%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#B2A0FF]" >
                            <MaterialCommunityIcons name="card-multiple-outline" size={30} color="#B2A0FF"/>
                        </View>
                        <View className="ml-2 justify-center items-center">
                            <Text className="text-[#BABEC6] text-[12px]">Overall CGPA</Text>
                            <Text className="text-[#0F123F] text-[15px] mt-1 font-extrabold">{dashboardData!=null?(dashboardData.aggCGPA):("-")}</Text>
                        </View>
                    </View>
                    <View className="flex-row h-[100%] w-[45%] bg-white rounded-[10px]">
                        <View className="w-[27%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#6FCF97]" >
                            <MaterialCommunityIcons name="checkbox-marked-outline" size={30} color="#6FCF97"/>
                        </View>
                        <View className="ml-2 justify-center items-center">
                            <Text className="text-[#BABEC6] text-[12px]">Working Days</Text>
                            <Text className="text-[#0F123F] text-[15px] mt-1 font-extrabold">{dashboardData!=null?(dashboardData.workingDays):("-")}/{dashboardData!=null?(dashboardData.totalDays):("-")}</Text>
                        </View>
                    </View>
                </View>
                <View className="flex-row h-[50%] justify-between w-[95%] mt-7">
                    <View className="flex-row h-[100%] w-[45%] bg-white rounded-[10px]">
                        <View className="w-[27%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#FFC176]" >
                            <FontAwesome name="pencil-square-o" size={25} color="#FFC176" />
                        </View>
                        <View className="ml-2 justify-center items-center">
                            <Text className="text-[#BABEC6] text-[12px]">Pending Assign.</Text>
                            <Text className="text-[#0F123F] text-[15px] mt-1 font-extrabold">{dashboardData!=null?(dashboardData.pendAssign):("-")}/{dashboardData!=null?(dashboardData.totalAssign):("-")}</Text>
                        </View>
                    </View>
                    <View className="flex-row h-[100%] w-[45%] bg-white rounded-[10px]">
                        <View className="w-[27%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#CD7A3E]" >
                            <MaterialCommunityIcons name="bank-transfer" size={30} color="#CD7A3E"/>
                        </View>
                        <View className="ml-2 justify-center items-center">
                            <Text className="text-[#BABEC6] text-[12px]">Due Fees</Text>
                            <Text className="text-[#0F123F] text-[15px] mt-1 font-extrabold">₹{dashboardData!=null?(dashboardData.dueFee):("-")}</Text>
                        </View>
                    </View>
                </View>
            </View >

            <TouchableOpacity className="mt-[60px] ml-5 h-[12%] w-[90%] bg-white  rounded-[10px] flex-row" onPress={()=>{navigation.navigate("Progress")}}>
                <View className="w-[15%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#0F123F]" >
                    <FontAwesome5 name="chart-bar" size={30} color="#FF6968"/>
                </View>
                <View className='justify-center items-center w-[70%]'>
                    <Text className='text-[#0F123F] text-[20px] font-extrabold'>Progress Report</Text>
                </View>
                <View className='justify-center items-center'>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="#FF6968" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity className="mt-7 ml-5 h-[12%] w-[90%] bg-white  rounded-[10px] flex-row" onPress={()=>{navigation.navigate("Assignment")}}>
                <View className="w-[15%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#0F123F]" >
                    <MaterialIcons name="assignment" size={30} color="#FF6968" />
                </View>
                <View className='justify-center items-center w-[70%]'>
                    <Text className='text-[#0F123F] text-[20px] font-extrabold'>Assignments</Text>
                </View>
                <View className='justify-center items-center'>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="#FF6968" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity className="mt-7 ml-5 h-[12%] w-[90%] bg-white  rounded-[10px] flex-row" onPress={()=>{navigation.navigate("Attendance")}}>
                <View className="w-[15%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#0F123F]" >
                    <FontAwesome5 name="chart-pie" size={30} color="#FF6968"/>
                </View>
                <View className='justify-center items-center w-[70%]'>
                    <Text className='text-[#0F123F] text-[20px] font-extrabold'>Attendance</Text>
                </View>
                <View className='justify-center items-center'>
                    <MaterialIcons name="arrow-forward-ios" size={24} color="#FF6968" />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
            )}
        </SafeAreaView>
    );
}
export default Dashboard