import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import {View,Text, TouchableOpacity, Image} from 'react-native';
import { EvilIcons, FontAwesome, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Row, Rows, Table } from 'react-native-table-component';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import TokenContext from '../slices/TokenCOntext';

const Profile=({navigation})=>{
    useLayoutEffect(()=>{
        navigation.setOptions({
            header: () =>
            (
              <View className="h-[50px] bg-[#0F123F]">
                <View className="flex-row items-center">
                    <TouchableOpacity className='px-5 mt-3'>
                        <FontAwesome5 name="bars" size={25} color="white" onPress={()=>{navigation.openDrawer()}}/>
                    </TouchableOpacity>
                    <View className='w-[70%] items-center justify-center' >
                        <Text className="mt-2 text-white text-[22px] font-extrabold">Profile</Text>
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
    const [profileData,setProfileData] = useState(null);

    const ProfileDetail=async()=>{
        try{
            await fetch('https://django-server-production-7222.up.railway.app/profileData/',{
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
                setProfileData(data)
            }).catch((data)=>{console.log(data)});
        }catch (error) {
            console.log(error);
            setIsLoading(false);
            navigation.navigate("Home")
        }
    }

    useEffect(()=>{
        setIsLoading(true)
        ProfileDetail()
        setIsLoading(false)
    },[])

    const name = tokenContext.name.split(" ")[0];
    const rollno = tokenContext.email.split("@")[0].toUpperCase()
    if(profileData!=null){
        this.state = {
            ProfileData: [
              ['Father Name',profileData.father_name],
              ['Father Contact No.','+91 '+profileData.contact],
              ['Date of Birth',profileData.dob],
              ['Gender',profileData.gender],
              ['Personal Email',profileData.personal_email],
              ['Address',profileData.address],
            ],
            AcademicData:[
              ['10th Grade',profileData.x],
              ['12th Grade',profileData.xii],
              ['1st semester',profileData.sem1],
              ['2nd semester',profileData.sem2],
              ['3rd semester',profileData.sem3],
              ['4th semester',profileData.sem4],
              ['5th semester',profileData.sem5],
              ['6th semester',profileData.sem6],
              ['7th semester',profileData.sem7],
              ['8th semester',profileData.sem8],
              ['',''],
            ],
            CollegeData:[
              ['College Name',profileData.college_name],
              ['Course Enrolled',profileData.course_enrolled],
              ['Branch','Computer Science & Engineering'],
              ['Year','-'],
              ['Semester','sem-'+tokenContext.semid],
              ['Enrollment No.','-'],
            ]
          }
    }else{
        this.state = {
            ProfileData: [
              ['Father Name',"-"],
              ['Father Contact No.','+91 '+"-"],
              ['Date of Birth',"-"],
              ['Gender',"-"],
              ['Personal Email',"-"],
              ['Address',"-"],
            ],
            AcademicData:[
              ['10th Grade',"-"],
              ['12th Grade',"-"],
              ['1st semester',"-"],
              ['2nd semester',"-"],
              ['3rd semester',"-"],
              ['4th semester',"-"],
              ['5th semester',"-"],
              ['6th semester',"-"],
              ['7th semester',"-"],
              ['8th semester',"-"],
              ['',''],
            ],
            CollegeData:[
              ['College Name',"-"],
              ['Course Enrolled',"-"],
              ['Branch','Computer Science & Engineering'],
              ['Year','-'],
              ['Semester','sem-'+tokenContext.semid],
              ['Enrollment No.','-'],
            ]
          }
    }
  
      const documents=[
          {title:'10th Marksheet',link:''},
          {title:'12th Marksheet',link:''},
          {title:'Resume',link:''},
          {title:'Resume',link:''},
          {title:'Resume',link:''},
          {title:'Resume',link:''},
      ]
  
  
      const [isProfile, setIsProfile] = useState(false);
      const [isCollege, setIsCollege] = useState(false);
      const [isAcademic, setIsAcademic] = useState(false);
      const [isDocument, setIsDocument] = useState(false);

    
    return(
        <View className='flex-1'>
            {isLoading || profileData==null?(
                <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
                <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
            </View>
            ):(
                <SafeAreaView className='bg-[#F8F8FF] flex-1'>
                <View className='h-10 w-[90%] bg-[#FFA3A3] mx-5 mt-5 mb-3 rounded-[10px] flex-row items-center justify-start'>
                        <Text className='ml-7 text-[#800000] text-[18px] font-bold'>{name}'s Profile</Text>
                </View>
    
                <View className='bg-white h-40 w-[90%] m-5 rounded-[10px] flex-row'>
                    <View className='h-[100%] w-[40%] items-center'>
                        <View className='h-[50%] w-[62%] mt-4 bg-black rounded-full justify-center items-center'>
                            <Image source={{uri:tokenContext.profileurl}}  className='h-[90px] w-[90px] rounded-full'></Image>
                        </View>
                        <Text className='mt-5 text-[16px] font-extrabold text-[#0F123F]'>{rollno}</Text>
                    </View>
                    <View className='h-[80%] mt-3 border-[1px] border-[#C1C1C1]'></View>
                    <View className='h-[100%] w-[60%]'>
                        <Text className='pl-5 pt-5 text-[20px] font-extrabold'>{tokenContext.name}</Text>
                        <Text className='pl-5 pt-1 text-[12px] text-[#C1C1C1]'>{tokenContext.email}</Text>
                        <Text className='pl-5 pt-5 text-[12px] text-[#0F123F] font-bold'>B. Tech. (2019-2023)</Text>
                        <Text className='pl-5 pt-1text-[10px] text-[#0F123F] '>Computer Science</Text>
                        <Text className='pl-5 pt-1 text-[12px] text-[#0F123F] font-bold'>{profileData!=null?(profileData.contact):("-")}</Text>
                    </View>
                </View>
    
                <ScrollView>
                    <TouchableOpacity className="mx-5 mt-5 h-20 w-[90%] bg-white  rounded-[10px] flex-row" onPress={()=>{
                        setIsProfile(!isProfile);
                        setIsAcademic(false);
                        setIsCollege(false);
                        setIsDocument(false);
                    }}>
                        <View className="w-[14%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#0F123F]" >
                            <FontAwesome5 name="house-user" size={24} color="#FF6968"/>
                        </View>
                        <View className='justify-center items-center w-[70%]'>
                            <Text className='text-[#0F123F] text-[20px] font-extrabold'>Personal Details</Text>
                        </View>
                        <View className='justify-center items-center'>
                            {isProfile?(<FontAwesome5 name="chevron-up" size={24} color="#FF6968"/>):(<FontAwesome5 name="chevron-down" size={24} color="#FF6968"/>)}
                        </View>
                    </TouchableOpacity>
                    {isProfile?(
                        <View className='mx-5 mt-5 py-5 pl-5 h-60 w-[90%] rounded-[10px] bg-white'>
                            <Table>
                                <Rows data={state.ProfileData} textStyle={{margin:5, fontSize:13, fontWeight:800, color:"#0F123F"}}/>
                            </Table>
                        </View>
                    ):null}
    
                    <TouchableOpacity className="mx-5 mt-5 h-20 w-[90%] bg-white  rounded-[10px] flex-row" onPress={()=>{
                        setIsProfile(false);
                        setIsAcademic(!isAcademic);
                        setIsCollege(false);
                        setIsDocument(false);
                    }}>
                        <View className="w-[14%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#0F123F]" >
                            <FontAwesome5 name="user-graduate" size={24} color="#FF6968"/>
                        </View>
                        <View className='justify-center items-center w-[70%]'>
                            <Text className='text-[#0F123F] text-[20px] font-extrabold'>Academic Details</Text>
                        </View>
                        <View className='justify-center items-center'>
                            {isAcademic?(<FontAwesome5 name="chevron-up" size={24} color="#FF6968"/>):(<FontAwesome5 name="chevron-down" size={24} color="#FF6968"/>)}
                        </View>
                    </TouchableOpacity>
                    {isAcademic?(
                        <ScrollView className='mx-5 mt-5 py-5 px-5 h-60 w-[90%] rounded-[10px] bg-white'>
                            <Table>
                                <Rows data={state.AcademicData} textStyle={{margin:5, fontSize:13, fontWeight:800, color:"#0F123F"}}/>
                            </Table>
                        </ScrollView>
                    ):null}
    
                    <TouchableOpacity className="mx-5 mt-5 h-20 w-[90%] bg-white  rounded-[10px] flex-row" onPress={()=>{
                        setIsProfile(false);
                        setIsAcademic(false);
                        setIsCollege(!isCollege);
                        setIsDocument(false);
                    }}>
                        <View className="w-[14%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#0F123F]" >
                            <FontAwesome name="university" size={24} color="#FF6968"/>
                        </View>
                        <View className='justify-center items-center w-[70%]'>
                            <Text className='text-[#0F123F] text-[20px] font-extrabold'>College Details</Text>
                        </View>
                        <View className='justify-center items-center'>
                            {isCollege?(<FontAwesome5 name="chevron-up" size={24} color="#FF6968"/>):(<FontAwesome5 name="chevron-down" size={24} color="#FF6968"/>)}
                        </View>
                    </TouchableOpacity>
                    {isCollege?(
                        <ScrollView className='mx-5 mt-5 py-5 pl-5 h-60 w-[90%] rounded-[10px] bg-white'>
                            <Table>
                                <Rows data={state.CollegeData} textStyle={{margin:5, fontSize:13, fontWeight:800, color:"#0F123F"}}/>
                            </Table>
                        </ScrollView>
                    ):null}
    
                    <TouchableOpacity className="mx-5 mt-5 h-20 w-[90%] bg-white  rounded-[10px] flex-row" onPress={()=>{
                        setIsProfile(false);
                        setIsAcademic(false);
                        setIsCollege(false);
                        setIsDocument(!isDocument);
                    }}>
                        <View className="w-[14%] h-[60%] mt-4 ml-3 justify-center items-center border-2 rounded-full border-[#0F123F]" >
                            <MaterialCommunityIcons name="file-document-edit" size={24} color="#FF6968" />
                        </View>
                        <View className='justify-center items-center w-[70%]'>
                            <Text className='text-[#0F123F] text-[20px] font-extrabold'>Documents</Text>
                        </View>
                        <View className='justify-center items-center'>
                            {isDocument?(<FontAwesome5 name="chevron-up" size={24} color="#FF6968"/>):(<FontAwesome5 name="chevron-down" size={24} color="#FF6968"/>)}
                        </View>
                    </TouchableOpacity>
                    {isDocument?(
                        <ScrollView className='mx-5 mt-5 h-80 w-[90%] rounded-[10px] bg-white'>
                            {documents.map((item,index)=>(
                                <TouchableOpacity className='h-10 m-2 border-[1px] rounded-[10px] border-[#C1C1C1] flex-row'>
                                    <View className='w-[30%] h-10 justify-center items-center'>
                                        <FontAwesome5 name="file-pdf" size={30} color="#800000" />
                                    </View>
                                    <View className='w-[60%] h-10 justify-center'>
                                        <Text key={index} className='text-[15px] text-[#0F123F] font-extrabold'>{item.title}</Text>
                                    </View>
                                    {/* <View className='w-[10%] h-10 justify-center'>
                                        <MaterialCommunityIcons name="close-circle-multiple" size={24} color="black" />
                                    </View> */}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    ):null}
                </ScrollView>
            </SafeAreaView>
            )}
        </View>
    );
}
export default Profile