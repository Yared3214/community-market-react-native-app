import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PostItem from './PostItem'

export default function LatestItemList({latesItemList, heading}) {
  return (
    <View className="mt-3 mb-7">
      <Text className="font-bold text-[20px]">{heading}</Text>
      <FlatList
      data={latesItemList}
      numColumns={2}
      renderItem={({item, index})=>(
       <PostItem item={item} key={index}/>
      )}/>
    </View>
  )
}