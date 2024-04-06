import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import { useUser } from '@clerk/clerk-expo'
import LatestItemList from '../Components/HomeScreen/LatestItemList'
import { useNavigation } from '@react-navigation/native'



export default function MyProducts() {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const db = getFirestore(app);
    const navigation = useNavigation();

    useEffect(()=> {
        user&&getUserPost();
    },[user])

    useEffect(()=>{
        navigation.addListener('focus',(e)=>{
            getUserPost();
        })
    },[navigation])


    const getUserPost = async() => {
        setProduct([])
        setLoading(true)
        const q = query(collection(db, 'UserPost'), where('userEmail','==',user.primaryEmailAddress.emailAddress));
        const snapShot = await getDocs(q)
        setLoading(false)
        snapShot.forEach(doc => {
            setProduct(product => [...product, doc.data()])
            setLoading(false)
        })
    }
  return (
    <View>
        {loading ?
        <ActivityIndicator size={'large'} color={'#3b82f6'}/>
        : product.length > 0 ? <LatestItemList latesItemList={product}/>
        : <Text className="p-5 text-[20px] text-center mt-24 text-gray-400">No Products</Text>
    }
        
    </View>
  )
}