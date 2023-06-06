import { useNavigation } from '@react-navigation/native';
import { useContext, useLayoutEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import TokenContext from '../slices/TokenCOntext';
import { Picker } from '@react-native-picker/picker';


const Login=()=>{
    const navigation = useNavigation();
    const tokenContext = useContext(TokenContext);


    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false,
        })
    },[]);

    const [isLogin,setIsLogin]= useState(true);
    const [isAdmin,setIsAdmin]= useState(false);
    const [isForget,setIsForget] = useState(false);
    const [gid,setGid] = useState(null);
    const [password,setPassword] = useState(null);
    const [isLoading,setIsLoading] = useState(false);

    
    const LoginHandler=async()=>{
        try{
            console.log("gid: "+gid+", Password: "+ password);
            await fetch('https://django-server-production-7222.up.railway.app/login',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Accept': 'application/json',
                    "content-Type":"application/json"
                },
                body: JSON.stringify({
                    gid: gid,
                    password: password,
                  }),
            }).then((res)=>{
                if(res.ok){
                    const json = res.json();
                    return json
                }else{
                    throw new Error("Authentication Failed Please Login!");
                }
            }).then((data)=>{
                console.log(data)
                tokenContext.Token = data.token;
                setIsLoading(false);
                navigation.navigate("SideDrawer")
            }).catch((error)=>{alert(error)});                
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Login")
        }finally {
            setIsLoading(false);
        }
    }

    const signInHandler=async()=>{
        try{
            console.log("name: "+name+", email: "+ email+",semester:"+selectedSem+",section:"+selectedSec);
            await fetch('https://django-server-production-7222.up.railway.app/register',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Accept': 'application/json',
                    "content-Type":"application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    semid: selectedSem,
                    section:selectedSec,
                  }),
            }).then((res)=>{
                if(res.ok){
                    const json = res.json();
                    return json
                }else{
                    throw new Error("Authentication Failed Please Login!");
                }
            }).then((data)=>{
                console.log(data)
                setIsLoading(false);
                navigation.navigate("Login");
                alert("Registration Successfully Please Check Your Mail for GID & Password");
            }).catch((error)=>{alert(error)});                
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Login")
        }finally {
            setIsLoading(false);
        }
    }

    const resetHandler=async()=>{
        console.log(reset);
        try{
            await fetch('https://django-server-production-7222.up.railway.app/forget',{
                method:'POST',
                credentials:'include',
                headers:{
                    'Accept': 'application/json',
                    "content-Type":"application/json"
                },
                body: JSON.stringify({
                    email:reset,
                  }),
            }).then((res)=>{
                if(res.ok){
                    const json = res.json();
                    return json
                }else{
                    const json = res.json();
                    console.log(json)
                    throw new Error(json.msg);
                }
            }).then((data)=>{
                console.log(data)
                setIsLoading(false);
                navigation.navigate("Login");
                alert("Registration Successfully Please Check Your Mail for GID & Password");
            }).catch((error)=>{alert(error)});                
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Login")
        }finally {
            setIsLoading(false);
        }
    }
    const [selectedSem, setSelectedSem] = useState('Semester');
    const semester = [
        {sem:'SEM-1'},
        {sem:'SEM-2'},
        {sem:'SEM-3'},
        {sem:'SEM-4'},
        {sem:'SEM-5'},
        {sem:'SEM-6'},
        {sem:'SEM-7'},
        {sem:'SEM-8'},
    ]
    const [selectedSec,setSelectedSec] = useState('A');
    const section = ['A','B','C','D','E'];

    const [name,setName]=useState(null);
    const [email,setEmail] = useState(null);
    const [reset,setReset] = useState(null);
    
    return(
        <View className='flex-1'>
            {isLoading? (
                <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                    <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
                </View>
            ):(
                <ScrollView className='bg-[#0F123F] flex-1'>
                    <View className="flex-row justify-center mt-10">
                        {isLogin?(<Image source={require('../assets/images/signup.png')} className='w-[300px] h-[200px]'></Image>):(
                            <Image source={require('../assets/images/login.png')} className='w-[200px] h-[200px]'></Image>
                        )}
                    </View>
            {isLogin?(
                <View className='flex-1 bg-[#F8F8FF] px-8 pt-8 mt-20 rounded-t-[50px]'>
                <View className='justify-center items-center pb-3 w-[100%] border-b-[1px] border-[#BABEC6]'>
                    <Text className='text-[22px] font-bold'>GAC-LOGIN</Text>
                </View>
                <View className='form space-y-2 mt-5 pb-6'>
                    <Text className='text-gray-700 text-[16px] ml-4'>GID</Text>
                    <TextInput onChangeText={setGid} className='p-4 bg-[#F8F8FF] text-gray-700 text-[16px] rounded-2xl mb-3 border-2 border-[#FFA3A3]'
                    placeholder='Enter Your GID'>
                    </TextInput>
                    <Text className='text-gray-700 text-[16px] ml-4'>Password</Text>
                    <TextInput onChangeText={setPassword}  className='p-4 bg-[#F8F8FF] text-gray-700 text-[16px] rounded-2xl mb-3 border-2 border-[#FFA3A3]'
                    secureTextEntry
                    placeholder='Enter Your Password'>
                    </TextInput>
                    <TouchableOpacity className='flex items-end' onPress={()=>{setIsForget(true); setIsLogin(false); setIsAdmin(false)}}>
                        <Text className='text-gray-700 pb-5'>Forget Password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='py-3 bg-[#0F123F] rounded-xl'  onPress={()=>{setIsLoading(true); LoginHandler()}}>
                        <Text className='text-xl text-white font-bold text-center'>Login</Text>
                    </TouchableOpacity>
                    <View className='justify-center items-center'>
                        <Text>Or</Text>
                    </View>
                    <TouchableOpacity className='flex justify-center items-center' onPress={()=>{setIsAdmin(true);setIsForget(false)
                    setIsLogin(false)}}>
                        <Text className='text-gray-700'>SignIn</Text>
                    </TouchableOpacity>
                </View>
            </View>
            ):null}

            {isAdmin?(
                <View className='flex-1 bg-[#F8F8FF] px-8 pt-8 mt-10 rounded-t-[50px]'>
                <View className='justify-center items-center pb-3 w-[100%] border-b-[1px] border-[#BABEC6]'>
                    <Text className='text-[22px] font-bold'>GAC-SignIn</Text>
                </View>
                <ScrollView className='form mt-1 pb-2'>
                    <View className='flex-row items-center h-20'>
                        <Text className='text-gray-700 w-[30%] text-[18px] ml-4'>Name</Text>
                        <TextInput onChangeText={setName} className='p-1 w-[60%] bg-[#F8F8FF] text-gray-700 text-[16px] mb-2 border-b-2 border-b-[#FFA3A3]'
                        placeholder='Enter Your Name'>
                        </TextInput>
                    </View>
                    <View className='flex-row items-center h-20'>
                        <Text className='text-gray-700 w-[30%] text-[18px] ml-4'>Email</Text>
                        <TextInput onChangeText={setEmail} className='p-1 w-[60%] bg-[#F8F8FF] text-gray-700 text-[16px] mb-2 border-b-2 border-b-[#FFA3A3]'
                        placeholder='Enter Your Email'>
                        </TextInput>
                    </View>
                    <View className='flex-row items-center h-20'>
                        <Text className='text-gray-700 w-[30%] text-[18px] ml-4'>Semester</Text>
                        <View className='w-[60%] border-b-2 border-b-[#FFA3A3] mb-3'>
                            <Picker
                                selectedValue={selectedSem}
                                style={{color:'gray'}}
                                onValueChange={(itemValue, itemIndex) => setSelectedSem(itemValue)}
                            >
                                {semester.map((item,index)=>(
                                    <Picker.Item key={index} label={item.sem} value={index+1} />
                                ))}
                                
                            </Picker>
                        </View>
                    </View>
                    <View className='flex-row items-center h-20'>
                        <Text className='text-gray-700 w-[30%] text-[18px] ml-4'>Section</Text>
                        <View className='w-[60%] border-b-2 border-b-[#FFA3A3] mb-3'>
                            <Picker
                                selectedValue={selectedSec}
                                style={{color:'gray'}}
                                onValueChange={(itemValue, itemIndex) => setSelectedSec(itemValue)}
                            >
                                {section.map((item,index)=>(
                                    <Picker.Item key={index} label={item} value={item} />
                                ))}
                                
                            </Picker>
                        </View>
                    </View>

                    <TouchableOpacity className='py-3 my-3 bg-[#0F123F] rounded-xl'  onPress={()=>{setIsLoading(true); signInHandler()}}>
                        <Text className='text-xl text-white font-bold text-center'>SignIn</Text>
                    </TouchableOpacity>
                    <View className='justify-center items-center'>
                        <Text>Or</Text>
                    </View>
                    <TouchableOpacity className='flex my-2 justify-center items-center' onPress={()=>{setIsAdmin(false); setIsForget(false);
                    setIsLogin(true)}}>
                        <Text className='text-gray-700'>Login</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            ):null}

            {isForget?(
                <View className='flex-1 bg-[#F8F8FF] px-8 pt-8 pb-[45%] mt-[20%] rounded-t-[50px]'>
                <View className='justify-center items-center pb-3 w-[100%] border-b-[1px] border-[#BABEC6]'>
                    <Text className='text-[22px] font-bold'>Reset Password</Text>
                </View>
                <ScrollView className='form space-y-2 mt-5'>
                    <Text className='text-gray-700 text-[16px] ml-4'>Email</Text>
                    <TextInput onChangeText={setReset} className='p-4 bg-[#F8F8FF] text-gray-700 text-[16px] rounded-2xl mb-3 border-2 border-[#FFA3A3]'
                    placeholder='Enter Your Email'>
                    </TextInput>
               
                    <TouchableOpacity className='py-3 bg-[#0F123F] rounded-xl'  onPress={()=>{setIsLoading(true); resetHandler()}}>
                        <Text className='text-xl text-white font-bold text-center'>Reset</Text>
                    </TouchableOpacity>
                    <View className='justify-center items-center'>
                        <Text>Or</Text>
                    </View>
                    <TouchableOpacity className='flex justify-center items-center' onPress={()=>{setIsAdmin(false); setIsForget(false);
                    setIsLogin(true)}}>
                        <Text className='text-gray-700'>Login</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
            ):null}
        </ScrollView>
            )}
        </View>
    );
}
export default Login