import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { collection, deleteDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native'

export default function ProductDetailScreen({navigation}) {
    const {params} = useRoute();
    const { user } = useUser();
    const db = getFirestore(app);
    const nav = useNavigation();

    useEffect(()=>{
      shareButton();
    },[navigation])
    
    const sendEMailMessage = () => {
        const subject = 'Regarding '+params.item.title
        const body = 'Hi '+params.item.userName+'\n'+'I am interested in this product'
        Linking.openURL('mailto:'+params.item.userEmail+'?subject='+subject+'&body='+body)
    }

    const shareButton = ()=> {
      navigation.setOptions({
        headerRight: () => (
          <Ionicons name="share-social-sharp" size={24} color="white" 
          style={{marginRight: 15}}
          onPress={()=> shareProduct()}/>
        ),
      });
    }

    const shareProduct = () => {
      const content = {
        message: params?.item?.title+'\n'+params?.item?.desc
      }
      Share.share(content).then(resp=>{
        console.log(resp)
      })
    }

    const deletePost = () => {
      Alert.alert('Do you want Delete?', "Are you sure you want to delete this post ?",[
        {
          text: 'Yes',
          onPress:()=>deleteFromFirestore()
        },
        {
          text: 'Cancel',
          onPress:() => console.log('Cancel Pressed'),
          style: 'cancel'
        }
      ])
    }
    
    const deleteFromFirestore = async() => {
      const q = query(collection(db, 'UserPost'), where('title','==',params.item.title));
      const snapShot = await getDocs(q);

      snapShot.forEach(doc => {
        deleteDoc(doc.ref).then(resp=>{
          console.log("Deleted the Doc")
          nav.goBack()

        })
      })
      
    }
  return (
    <ScrollView>
      <Image source={{uri: params?.item?.image}}
      className="w-full h-[300px]"/>
      <View className="p-5">
        <Text className="text-[20px] font-bold">{params?.item?.title}</Text>
        <Text className="text-[12px] bg-blue-200
        text-blue-500 rounded-lg px-2 text-center
        w-[80px] mt-1 mb-3">{params?.item?.category}</Text>
        <Text className="font-bold text-[18px]">Description</Text>
        <Text>{params?.item?.desc}</Text>
      </View>
      <View className="p-2 flex flex-row gap-2 bg-blue-200">
        <Image className="rounded-full w-12 h-12 items-center justify-center"
         source={{uri: params?.item?.userImage}}/>
         <View>
            <Text className="font-bold text-[17px]">{params?.item?.userName}</Text>
            <Text className="text-gray-400">{params?.item?.userEmail}</Text>
         </View>
      </View> 
      {user.primaryEmailAddress.emailAddress==params.item.userEmail ?
      <TouchableOpacity
      onPress={()=> deletePost()}
      className="bg-red-500 p-3 m-3 rounded-full">
        <Text className="text-white text-center">Delete Post</Text>
      </TouchableOpacity>
      : 
      <TouchableOpacity
      onPress={()=> sendEMailMessage()}
      className="bg-blue-500 p-3 m-3 rounded-full">
        <Text className="text-white text-center">send Messsage</Text>
      </TouchableOpacity>
      }
      
    </ScrollView>
  )
}