import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ItemList() {
    const [itemList, setItemList] = useState([])
    const [loading, setLoading] = useState(false);
    const {params} = useRoute();
    const db = getFirestore(app);

    useEffect(()=>{
        params && getItemListByCategory()
    },[params])

    const getItemListByCategory = async() => {
        setItemList([])
        setLoading(true)
        const q = query(collection(db, 'UserPost'),where('category','==', params.category));
        const snapshot = await getDocs(q);
        setLoading(false)
        snapshot.forEach(doc => {
            setItemList(itemList=>[...itemList, doc.data()])
            setLoading(false)
        });
    }
  return (
    <View>
        {loading ?
        <ActivityIndicator size={'large'} color={'#3b82f6'}/>
        : itemList ?.length>0 ?
            <LatestItemList latesItemList={itemList}
            heading={'Latest Post'}/>
        : <Text className="p-5 text-[20px] text-center mt-24 text-gray-400">No Post Found</Text>
          
    }
        
    </View>
  )
}