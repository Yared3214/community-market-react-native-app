import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({item}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('product-detail',{
      item: item
    })}
    className="flex-1 m-2 p-2 border-[1px] border-slate-200">
          <Image source={{uri:item?.image}}
          className="w-full h-[140px] rounded-lg"/>
          <View>
            <Text className="text-[12px] bg-blue-200 text-blue-500 rounded-lg px-2 text-center w-[80px] mt-1">{item?.category}</Text>
            <Text className="text-[15px] font-bold mt-2">{item?.title}</Text>
            <Text className="text-[15px] fontt-bold text-blue-500">Br {item?.price}</Text>
            </View>
          </TouchableOpacity>
  )
}