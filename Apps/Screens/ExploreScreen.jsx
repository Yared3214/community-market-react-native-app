import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    getAllProducts()
  },[])
  
  /**
   * Used to get all Products
   */
  const getAllProducts = async() => {
    setProduct([])
    setLoading(true)
    const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
    const snapShot = await getDocs(q);

    snapShot.forEach((doc) => {
      setProduct(product=>[...product, doc.data()])
      setLoading(false)
    })
  }
  return (
    <ScrollView className="p-5 py-8">
      <Text className="text-[30px] font-bold">Explore More</Text>
      {loading ? 
      <ActivityIndicator size={'large'} color={'#3b82f6'}/>
    : <LatestItemList latesItemList={product}/>}
    </ScrollView>
  )
}