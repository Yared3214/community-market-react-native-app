import { View, Text, ViewBase, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from "@clerk/clerk-expo";

export default function ProfileScreen() {
  const { user } = useUser();
  const navigation = useNavigation();
  const { isLoaded,signOut } = useAuth();
  return (
    <View className="p-5 bg-white flex-1">
      <View className="items-center pt-[50px]">
        <Image source={{uri:user.imageUrl}}
        alt='image'
        className="w-[100px] h-[100px] rounded-full"/>
        <Text className="text-[23px] font-bold mt-2">{user.fullName}</Text>
        <Text className="text-gray-500 text-[18px] mt-1">{user.primaryEmailAddress.emailAddress}</Text>
      </View>
      <View className="m-5 flex flex-row justify-between">
      <TouchableOpacity className="w-[90px] bg-blue-50 items-center p-3 rounded-lg
      border border-blue-400"
      onPress={()=> navigation.navigate('my-product')}>
        <Image source={require('./../../assets/images/task.png')}
        className="w-[40px] h-[40px]"
        />
        <Text className="text-blue-500 mt-2 text-[12px]">My Products</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=> navigation.navigate('explore')}
      className="w-[90px] bg-blue-50 items-center p-3 rounded-lg
      border border-blue-400">
        <Image source={require('./../../assets/images/exploration.png')}
        className="w-[40px] h-[40px]"
        />
        <Text className="text-blue-500 mt-2 text-[12px]">Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity className="w-[90px] bg-blue-50 items-center p-3 rounded-lg
      border border-blue-400">
        <Image source={require('./../../assets/images/link.png')}
        className="w-[40px] h-[40px]"
        />
        <Text className="text-blue-500 mt-2 text-[12px]">My Website</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity 
      onPress={()=> signOut()}
      className="p-2 m-5  items-center mt-[-10px] bg-blue-50 border border-blue-300
      rounded-lg">
        <Image source={require('./../../assets/images/logout.png')}
        className="w-[50px] h-[50px]"/>
        <Text className="text-blue-500 mt-1">Logout</Text>
      </TouchableOpacity>
    </View>
  )
}