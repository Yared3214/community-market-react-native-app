import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderSection from '../Components/HomeScreen/HeaderSection'
import Slider from '../Components/HomeScreen/Slider'
import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import Category from '../Components/HomeScreen/Category';
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function HomeScreen() {

  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latesItemList, setLatestItemList] = useState([]);

  useEffect(()=>{
    getSliders();
    getCategoryList();
    getLatestItemList();
  },[])



  /**
   * get slider list 
   */

  const getSliders = async() => {
    setSliderList([]);
    const querySnapshot = await getDocs(collection(db, 'Slider'));
    querySnapshot.forEach((doc)=>{
      setSliderList(sliderList=>[...sliderList,doc.data()]);
    })
  }

  /**
   * get category list
   */
  const getCategoryList = async() => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc)=>{
      setCategoryList(categoryList=>[...categoryList,doc.data()]);
    })
  }

  /**
   * get latest item list
   */
  const getLatestItemList = async() => {
    setLatestItemList([]);
    const querySnapshot = await getDocs(collection(db, 'UserPost'), orderBy('createdAt','desc'));
    querySnapshot.forEach((doc)=>{
      setLatestItemList(latesItemList=>[...latesItemList,doc.data()]);
    })
  }
  return (
    <ScrollView className="py-8 px-6 bg-white flex-1">
      <HeaderSection/>
      {/* Slider */}
      <Slider sliderList={sliderList}/>
      {/* Category  */}
      <Category categoryList={categoryList}/>
      {/* Latest Items */}
      <LatestItemList latesItemList={latesItemList}
      heading={'Latest Items'}/>
    </ScrollView>
  )
}