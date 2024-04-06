
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Image, ToastAndroid, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { app } from '../../firebaseConfig';
import { getFirestore, getDocs, collection, addDoc} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';

export default function AddPostScreen() {
  const db = getFirestore(app);
  const storage = getStorage();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(()=>{
    getCategoryList();
  },[])

  const getCategoryList = async() => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, 'Category'));
    querySnapshot.forEach((doc)=>{
      setCategoryList(categoryList=>[...categoryList,doc.data()]);
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod = async(value) => {
    setLoading(true);
    // Convert Uri ro Blob file
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, 'comminityPost/'+Date.now()+'.jpg');

    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        value.image = downloadUrl;
        value.userName = user.fullName
        value.userEmail = user.primaryEmailAddress.emailAddress
        value.createdAt = Date.now();
        value.userImage = user.imageUrl

        const docRef = await addDoc(collection(db,"UserPost"),value);
        if(docRef.id){
          setLoading(false);
          Alert.alert('Success!!!','Post Added Successfully!!!')
        }
      })
    });
  }

  return (
    <KeyboardAvoidingView>
    <ScrollView className="p-10">
      <Text className="text-[27px] font-bold">Add New Post</Text>
      <Text className="text-[16px] text-gray-500 mb-7">Create New Post and Start Selling</Text>
      <Formik
      initialValues={{title:'', desc:'', category:'', address:'', price:'', image:'', userName:'', userEmail:'', userImage:'', createdAt:''}}
      onSubmit={values => {onSubmitMethod(values);
        console.log(values);
      }}
      validate={(values)=>{
        const errors={}
        if(!values.title){
          ToastAndroid.show("Title is required", ToastAndroid.BOTTOM);
          errors.name="Title is required"
        }
        return errors
      }}
      >
        {({handleChange, handleBlur, handleSubmit, setFieldValue ,values, errors})=>(
          <>
          <TouchableOpacity onPress={pickImage}>
            {image ? 
            <Image source={{uri:image}} style={{width:100, height:100, borderRadius:10}}/>
          : <Image source={require('./../../assets/images/img_pl.jpg')}
          style={{width:100, height:100, borderRadius:10}}
          />}
          </TouchableOpacity>
          <TextInput 
          style={styles.input}
          placeholder='Title'
          value={values.title}
          onChangeText={handleChange('title')}/>
          <TextInput 
          style={styles.input}
          placeholder='Description'
          value={values.desc}
          numberOfLines={5}
          onChangeText={handleChange('desc')}/>
          <TextInput 
          style={styles.input}
          placeholder='Price'
          value={values.price}
          keyboardType='number-pad'
          onChangeText={handleChange('price')}/>
          <TextInput 
          style={styles.input}
          placeholder='Address'
          value={values.address}
          onChangeText={handleChange('address')}/>
          <View style={{borderWidth:1, borderRadius:10, marginTop:15}}>
          <Picker
          selectedValue={values?.category}
          onValueChange={itemValue=>setFieldValue('category', itemValue)}>
            {categoryList&&categoryList.map((item, index)=>(
              <Picker.Item key={index}
              style={styles.input}
              label={item?.name} 
              value={item?.name}/>
            ))}    
          </Picker>
          </View>
          <TouchableOpacity onPress={handleSubmit} 
          className="p-4 bg-blue-500 rounded-full mt-10"
          style={{
            backgroundColor:loading?'#ccc':'#007BFF'
          }}
          disabled={loading}>
            {loading?
            <ActivityIndicator color='#fff'/>
          : <Text className="text-white text-center text-[16px]">Submit</Text>}
            
          </TouchableOpacity >
          
          </>
        )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  )
        }

const styles = StyleSheet.create({
  input:{
    borderWidth:1,
    borderRadius:10,
    padding:10,
    marginBottom:5,
    marginTop:10,
    paddingHorizontal:17,
    fontSize:17,
    textAlignVertical:'top'
  },
  desc:{
    
  }
})