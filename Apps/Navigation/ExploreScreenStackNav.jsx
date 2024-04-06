import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ExploreScreen from '../Screens/ExploreScreen';
import ProductDetailScreen from '../Screens/ProductDetailScreen';

const Stack = createStackNavigator();

export default function ExploreScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="explore-tab" component={ExploreScreen} 
      options={{
        headerShown: false
      }}/>
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