import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../Screens/ProfileScreen';
import MyProducts from '../Screens/MyProducts';
import ProductDetailScreen from '../Screens/ProductDetailScreen';


const Stack = createStackNavigator();
export default function ProfileScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="my-profile" component={ProfileScreen} 
      options={{
        headerShown: false
      }}/>
      <Stack.Screen name="my-product" component={MyProducts}
      options={{
        headerStyle:{
            backgroundColor: '#3b82f6'
        },
        headerTintColor: '#fff',
        headerTitle: 'My Products'
      }}
      />
      <Stack.Screen name='product-detail' component={ProductDetailScreen}
      options={{
        headerTitle: 'Detail',
        headerStyle: {
          backgroundColor: '#3b82f6',
        },
        headerTintColor: '#fff'
      }}/>
      </Stack.Navigator>
  )
}