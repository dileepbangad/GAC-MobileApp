import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {View,Text, TouchableOpacity, Image, SafeAreaView, FlatList, Modal, Linking} from 'react-native';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import TokenContext from '../slices/TokenCOntext';
import PdfReader from '@bildau/rn-pdf-reader';

const FeeTransaction=({navigation})=>{
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

    const tokenContext = useContext(TokenContext);
    const [isLoading,setIsLoading] = useState(false);
    const [isViewed,setIsViewed] = useState(false);
    const [pdfHeading,setPdfHeading] = useState("");
    const [txnData,setTxnData] = useState(null);
    const feeTransactions=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/feeTransaction/',{
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
                setTxnData(data)
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("setting")
        }
    }

    useEffect(()=>{
        setIsLoading(true);
        feeTransactions();
        setIsLoading(false);
    },[])

    const transaction= []

    if(txnData!=null){
        txnData.data.map((item,index)=>{
            transaction.push({id:item.txnId, amount:item.txnAmt,reciept:item.txnReciept});
        })
    }

    return (
        <View className='flex-1'>
        {isLoading || txnData==null?(
            <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
            <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
        </View>
        ):(
            <SafeAreaView className='bg-[#F8F8FF] flex-1 items-center'>
            <View className='h-10 w-[95%] bg-[#FFA3A3] mx-5 px-5 mt-5 rounded-[10px] flex-row items-center justify-between'>
                <TouchableOpacity onPress={()=>{navigation.navigate("Feedesk")}}>
                    <MaterialIcons name="arrow-back-ios" size={22} color="#800000" />
                </TouchableOpacity>
                <Text className='text-[#800000] text-[18px] font-bold'>Fee Transactions</Text>
            </View>

            <View className='w-[95%] mt-5 items-center px-3 h-10 gap-x-1 bg-white rounded-[10px] flex-row justify-between'>
                <Text className='text-[#FF8E07] font-extrabold w-[20%]'>Txn ID</Text>
                <Text className='text-[#FF8E07] font-extrabold w-[30%]'>Txn Date</Text>
                <Text className='text-[#FF8E07] font-extrabold w-[20%]'>Amount</Text>
                <Text className='text-[#FF8E07] font-extrabold w-[20%]'>Receipt</Text>
            </View>

            {(transaction.length==0)?(<Text className='text-[20px] mt-5'>No Data Found</Text>):(
                    <FlatList className='w-[95%] ' data={transaction} renderItem={({item,index})=>{
                            return(
                                <View key={index} className='mt-3 items-center gap-x-1 px-3 h-10 bg-white rounded-[10px] flex-row justify-between'>
                                    <Text className='font-extrabold w-[20%]'>{item.id}</Text>
                                    <Text className='font-extrabold w-[30%]'>2023-05-03</Text>
                                    <Text className='font-extrabold w-[20%]'>{item.amount}</Text>
                                    <TouchableOpacity className='font-extrabold w-[20%] items-center' onPress={()=>{Linking.openURL(item.reciept)}}>
                                        <Feather name="download" size={24} color="blue"/>
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

export default FeeTransaction;