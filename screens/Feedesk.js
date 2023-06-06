import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {View,Text, TouchableOpacity, Image, Linking} from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import TokenContext from '../slices/TokenCOntext';

const Feedesk=({navigation})=>{
    const tokenContext = useContext(TokenContext);
    const [isLoading,setIsLoading] = useState(false);
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
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Fee Desk</Text>
                    </View>
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
              </View>
            ),
        })
    },[]);

    const [feeData,setFeeData] = useState(null);

    const getFeeDetail=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/feeDetail/',{
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
                setFeeData(data);
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("setting")
        }
    }

    const [stripe,setStripe] = useState(null);

    const getConfig=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/stripeconfig/',{
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
                setStripe(data.publicKey);
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("setting")
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        getFeeDetail();
        getConfig();
        generateFeeReciept();
        setIsLoading(false);
    },[])

    const PayNow=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/stripecheckout/',{
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
                alert("Payement Sucessfull")
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("setting")
        }
    }

    const [feeReciept,setFeeReciept] = useState(null);
    const generateFeeReciept=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/generatefeereciept/',{
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
                setFeeReciept(data.data)
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("setting")
        }
    }

    return (
        <View className='flex-1'>
            {isLoading || feeData==null?(
                <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
            </View>
            ):(
                <View className='bg-[#F8F8FF] flex-1 items-center'>
                <View className='h-10 w-[90%] bg-[#FFA3A3] mx-5 mt-5 rounded-[10px] flex-row items-center justify-end'>
                        <Text className='mr-7 text-[#800000] text-[18px] font-bold'>Pay For Success</Text>
                </View>
    
                <View className='bg-white h-40 w-[90%] m-5 rounded-[10px] flex-row'>
                    <View className='h-[100%] w-[15%] items-center'>
                        <View className='my-5 justify-center items-center space-y-2'>
                            <View className='pt-2'><FontAwesome5 name="user-graduate" size={22} color="#0F123F" /></View>
                            <View className='h-[100%] justify-center items-center space-y-5'>
                                <FontAwesome5 name="rupee-sign" size={18} color="#6FCF97" />
                                <MaterialCommunityIcons name="bank-transfer" size={30} color="#800000"/>
                            </View>
                        </View>
                    </View>
                    <View className='h-[80%] mt-3 border-[1px] border-[#C1C1C1]'></View>
                    <View className='h-[100%] w-[80%]'>
                        <View className='mb-2'>
                            <Text className='pl-5 pt-1 text-[20px] text-[#0F123F] font-extrabold'>{tokenContext.name}</Text>
                            <Text className='pl-5 pt-1 text-[12px] font-extrabold text-[#C1C1C1]'>{tokenContext.email}</Text>
                        </View>
                        <View className='h-[20%] w-[90%] mx-5 my-2 rounded-xl border-[#6FCF97] border-2 py-1 px-3 flex-row justify-between'>
                            <Text className='text-[#6FCF97] font-extrabold'>Total Fee</Text>
                            <Text className='font-extrabold'>₹{feeData!=null?(feeData.totalFee):("-")}</Text>
                        </View>
                        <View className='h-[20%] w-[90%] mx-5 my-2 rounded-xl border-[#800000] border-2 py-1 px-3 flex-row justify-between'>
                            <Text className='text-[#800000] font-extrabold'>Due Fee</Text>
                            <Text className='font-extrabold'>₹{feeData!=null?(feeData.TotalDueFee):("-")}</Text>
                        </View>
                    </View>
                </View>
    
                <TouchableOpacity className="mx-5 my-2 h-[7%] w-[90%] bg-[#B2A0FF] rounded-2xl flex-row" onPress={()=>{Linking.openURL(feeData.FeeDetail)}}>
                    <View className="w-[15%] h-[100%] ml-3 justify-center items-center" >
                        <Ionicons name="file-tray-full" size={30} color="white" />
                    </View>
                    <View className='justify-center items-center w-[70%]'>
                        <Text className='text-white text-[20px] font-extrabold'>Fee Details</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="mx-5 my-2 h-[7%] w-[90%] bg-[#FFC176] rounded-2xl flex-row" onPress={()=>{navigation.navigate("FeeTransaction")}}>
                    <View className="w-[15%] h-[100%] ml-3 justify-center items-center" >
                        <MaterialCommunityIcons name="cog-transfer" size={30} color="white" />
                    </View>
                    <View className='justify-center items-center w-[70%]'>
                        <Text className='text-white text-[20px] font-extrabold'>Fee Transactions</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity className="mx-5 my-2 h-[7%] w-[90%] bg-[#CD7A3E] rounded-2xl flex-row" onPress={()=>{Linking.openURL(feeReciept)}}>
                    <View className="w-[15%] h-[100%] ml-3 justify-center items-center" >
                        <Ionicons name="receipt" size={30} color="white" />
                    </View>
                    <View className='justify-center items-center w-[70%]'>
                        <Text className='text-white text-[20px] font-extrabold'>Generate Fee Receipt</Text>
                    </View>
                </TouchableOpacity>
    
                <View className='h-[30%] w-[90%] mt-5 rounded-2xl border-[1px] justify-center items-center'>
                    <View className='justify-center items-center my-2'>
                        <Text className='text-[#0F123F] text-[16px] font-extrabold'>Current Due</Text>
                    </View>
                    <View className='h-[50%] w-[90%] bg-white rounded-2xl px-10 py-3'>
                        <View className='flex-row justify-between'>
                            <Text>Tution Fee </Text>
                            <Text>₹{feeData!=null?(feeData.DueTutionFee):("-")}</Text>
                        </View>
                        <View className='flex-row justify-between'>
                            <Text>Development Fee </Text>
                            <Text>₹{feeData!=null?(feeData.DueDevelopmentFee):("-")}</Text>
                        </View>
                        <View className='flex-row justify-between'>
                            <Text>Other Fee </Text>
                            <Text>₹{feeData!=null?(feeData.DueOtherFee):("-")}</Text>
                        </View>
                        <View className='mt-2 h-[1px] w-[100%] border-[1px] border-[#0F123F]'/>
                        <View className='flex-row justify-between'>
                            <Text>Total Fee </Text>
                            <Text>₹{feeData!=null?(feeData.TotalDueFee):("-")}</Text>
                        </View>
                    </View>
                    <TouchableOpacity className='mt-2 h-[20%] w-[90%] bg-[#0F123F] rounded-2xl justify-center items-center' onPress={()=>{PayNow()}}>
                        <Text className='text-white text-[18px] font-extrabold'>Pay Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
            )}
        </View>
    );
}

export default Feedesk;