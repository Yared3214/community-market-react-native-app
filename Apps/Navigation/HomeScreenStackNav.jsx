
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ItemList from '../Screens/ItemList';
import ProductDetailScreen from '../Screens/ProductDetailScreen';

export default function HomeScreenStackNav() {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="home" component={HomeScreen} 
      options={{
        headerShown: false
      }}/>
      <Stack.Screen name="item-list" component={ItemList}
      options={({route}) => ({title: route.params.category ,
      headerStyle:{
        backgroundColor: '#3b82f6',
        
      },
      headerTintColor: '#fff'})}/>
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