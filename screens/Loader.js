import { useNavigation } from "@react-navigation/native"
import { useLayoutEffect } from "react"
import { Image } from "react-native";
import { View } from "react-native";

const Loader=()=>{
    const navigation = useNavigation();
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
    })
    
    return(
        <View className='bg-[#F8F8FF] flex-1 relative justify-center items-center'>
            <Image source={require('../assets/images/loader.gif')} className='h-[30%] w-[100%]' />
        </View>
    )
}

export default Loader