import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {View,Text, TouchableOpacity, FlatList, Button, Image} from 'react-native';
import { FontAwesome5,MaterialCommunityIcons,Feather } from '@expo/vector-icons';
import Modal from "react-native-modal";
import { SafeAreaView } from 'react-native-safe-area-context';
import PdfReader from '@bildau/rn-pdf-reader';
import WebView from 'react-native-webview';
import { Linking } from 'react-native';
import TokenContext from '../slices/TokenCOntext';
import DocmentPicker from 'react-native-document-picker';


const Assignment=({navigation})=>{

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
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Assignments</Text>
                    </View>
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bell" size={25} color="white" />
                    </TouchableOpacity>
                </View>
              </View>
            ),
        })
    },[]);

    const [isViewed,setIsViewed] = useState(false);
    const [pdfHeading,setPdfHeading] = useState("");
    const tokenContext = useContext(TokenContext);

    const [assignmentData,setAssignmentData]=useState(null);
    const [isLoading,setIsLoading] = useState(false);

    const [isStatus,setIsStatus] = useState(false)
    const [status,setStatus] = useState('pending')

    const AssignmentList=async(state)=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/assignmentlist/',{
                method:'POST',
                credentials:'include',
                headers:{
                    "Authorization":"Bearer "+tokenContext.Token,
                    'Accept': 'application/json',
                    "content-Type":"application/json"
                },
                body: JSON.stringify({
                    status:state,
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
                setAssignmentData(data)
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Home")
        }
    }

    
    useEffect(()=>{
        setIsLoading(true);
        AssignmentList("pending");
        setIsLoading(false)
    },[])

    
    const Assign= []

    if(assignmentData!=null && status=="pending"){
        assignmentData.data.map((item,index)=>{
            Assign.push({title:item.title, sName:item.subject, lDate:item.end_date,assigned:item.assigned,id:item.id});
        })
    }

    if(assignmentData!=null && status=="Submitted"){
        assignmentData.data.map((item,index)=>{
            Assign.push({title:item.title, sName:item.subject, subDate:item.submission_date,assigned:item.assigned,submitted:item.submitted});
        })
    }

    
    const state = [
        {name:'pending'},
        {name:'Submitted'}
    ]
    const selectDocument=async(id)=>{
        try{
            const res = await DocmentPicker.pick({
                type:DocmentPicker.types.pdf
            })
            console.log('res : ' + JSON.stringify(res));
            console.log('URI : ' + res.uri);
            console.log('Type : ' + res.type);
            console.log('File Name : ' + res.name);
            console.log('File Size : ' + res.size);
            uploadDocument(document,id);
        }catch (err) {
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
              //If user canceled the document selection
              alert('Canceled from multiple doc picker');
            } else {
              //For Unknown Error
              alert('Unknown Error: ' + JSON.stringify(err));
              throw err;
            }
    }}

    const uploadDocument=async(data,id)=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/uploadassignment/',{
                method:'POST',
                credentials:'include',
                body:{
                    "submitted":data,
                    "assignmentId":id,
                },
                headers:{
                    "Authorization":"Bearer "+tokenContext.Token,
                    'Content-Type': 'multipart/form-data',
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
                alert(data.msg)
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Home")
        }
    }

    return(
        <View className='flex-1'>
            {isLoading || assignmentData==null?(
                <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
            </View>
            ):(
                <SafeAreaView className='bg-[#F8F8FF] flex-1 items-center'>
                <View className='h-10 w-[95%] bg-[#FFA3A3] mx-3 mt-5 rounded-[10px] flex-row items-center justify-end'>
                        <TouchableOpacity className='m-2 right-[90px] h-6 w-[30%] bg-white rounded-[10px] flex-row items-center justify-between px-3' onPress={()=>{
                            setIsStatus(!isStatus);
                        }}>
                            <Text>{status}</Text>
                            {isStatus?(<FontAwesome5 name="chevron-up" size={12} color="black"/>):(<FontAwesome5 name="chevron-down" size={12} color="black"/>)}
                        </TouchableOpacity>
                        <Text className='mr-7 text-[#800000] text-[18px] font-bold'>Assignments</Text>
                </View>
    
                {isStatus?(
                    <View className='h-[10%] w-[30%] bg-white rounded-[10px] right-[115px]'>
                    <FlatList data={state} renderItem={({item,index})=>{
                        return(
                            <TouchableOpacity key={index} className='w-[80%] h-5 border-b-[1px]  border-[#c5c6d0] ml-2 mt-1 justify-center items-center' onPress={()=>{
                                setStatus(item.name);
                                setAssignmentData(null);
                                AssignmentList(item.name);
                                setIsStatus(false);
                            }}>
                                <Text key={index}>{item.name}</Text>
                            </TouchableOpacity>
                        )
                    }}/>
                </View>
                ):null}
    
                {(Assign.length==0)?(<Text className='text-[20px] mt-5'>No Pending Assignments</Text>):(
                        <FlatList className='w-[95%] ' data={Assign} renderItem={({item,index})=>{
                                return(
                                    <View className='mt-5 h-20 bg-white rounded-[10px]'>
                                        <View className='flex-row justify-between m-2'>
                                            <Text className='text-[#6FCF97] font-extrabold' key={index}>{item.title}</Text>
                                            {status=="pending"?(
                                                <Text className='text-[#FF6968] font-extrabold'>LastDate : {item.lDate}</Text>
                                            ):(<Text className='text-[#FF6968] font-extrabold'>SubmitDate : {item.subDate}</Text>)}
                                        </View>
            
                                        <View className='flex-row justify-between m-2 h-8'>
                                            <View className='w-[55%]'>
                                                <Text className='text-[#111441] text-[15px] font-extrabold'>{item.sName}</Text>
                                            </View>
                                            <TouchableOpacity className='h-[80%] w-[20%] bg-[#0288D1] rounded-[10px] justify-center items-center' onPress={()=>{setIsViewed(true);setPdfHeading(item.title);}}>
                                                <Text className='text-white text-[12px]'>View</Text>
                                                <Modal isVisible={isViewed} backdropOpacity={0.2} animationIn="slideInUp">
                                                    <View className='h-[80%] bg-white rounded-[10px]'>
                                                        <View className='h-10 bg-[#111441] flex-row rounded-t-[10px] justify-between px-5'>
                                                            <TouchableOpacity className='mt-2' onPress={()=>{Linking.openURL(item.assigned);setIsViewed(false)}}>
                                                                <Feather name="download" size={24} color="white" />
                                                            </TouchableOpacity>
                                                            <View className='w-[80%] justify-center items-center'>
                                                                <Text className='text-white text-[20px] font-extrabold'>{pdfHeading}</Text>
                                                            </View>
                                                            <TouchableOpacity className='mt-2' onPress={()=>{setIsViewed(false)}}>
                                                                <MaterialCommunityIcons name="close" size={24} color="white"/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <PdfReader withScroll withPinchZoom source={{
                                                            uri:item.assigned
                                                        }}/>            
                                                    </View>
                                                </Modal>
                                            </TouchableOpacity>
                                            {status=="pending"?(
                                                <TouchableOpacity className='h-[80%] w-[20%] bg-[#FFB258] rounded-[10px] justify-center items-center' onPress={()=>{selectDocument(item.id);}}>
                                                <Text className='text-white text-[12px]'>Upload</Text>
                                            </TouchableOpacity>
                                            ):(
                                                <TouchableOpacity className='h-[80%] w-[20%] bg-[#d10236] rounded-[10px] justify-center items-center' onPress={()=>{setIsViewed(true);setPdfHeading(item.title);}}>
                                                <Text className='text-white text-[12px]'>Submitted</Text>
                                                <Modal isVisible={isViewed} backdropOpacity={0.2} animationIn="slideInUp">
                                                    <View className='h-[80%] bg-white rounded-[10px]'>
                                                        <View className='h-10 bg-[#111441] flex-row rounded-t-[10px] justify-between px-5'>
                                                            <TouchableOpacity className='mt-2' onPress={()=>{Linking.openURL(item.submitted);setIsViewed(false)}}>
                                                                <Feather name="download" size={24} color="white" />
                                                            </TouchableOpacity>
                                                            <View className='w-[80%] justify-center items-center'>
                                                                <Text className='text-white text-[20px] font-extrabold'>{pdfHeading}</Text>
                                                            </View>
                                                            <TouchableOpacity className='mt-2' onPress={()=>{setIsViewed(false)}}>
                                                                <MaterialCommunityIcons name="close" size={24} color="white"/>
                                                            </TouchableOpacity>
                                                        </View>
                                                        <PdfReader withScroll withPinchZoom source={{
                                                            uri:item.submitted
                                                        }}/>            
                                                    </View>
                                                </Modal>
                                            </TouchableOpacity>
                                            )}
                                        </View>
                                    </View>
                                )
                        }}/>
                 )}
            </SafeAreaView>
            )}
        </View>
    );
}
export default Assignment