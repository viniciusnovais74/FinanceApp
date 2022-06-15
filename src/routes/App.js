import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from "../pages/Home"
import New from '../pages/New'
import Profile from '../pages/Profile'
import Icon from 'react-native-vector-icons/Feather'

const AppTab = createBottomTabNavigator()
export default function AppRoutes() {
  return (
    <AppTab.Navigator tabBarOptions={{ tabStyle: '#131313', style: { backgroundColor: '#131313' } }} >
      <AppTab.Screen name="Home" component={Home} options={{
        tabBarLabel: "Inicio",
        tabBarIcon: ({ color, size }) => (<Icon name="home" size={size} color={color} />)

      }} />
      <AppTab.Screen name="New" component={New} options={{
        tabBarLabel: "Registrar",
        tabBarIcon: ({ color, size }) => (<Icon name="plus" size={size} color={color} />)
      }} />
      <AppTab.Screen name="Profile" component={Profile} options={{  tabBarLabel: "Perfil",
        tabBarIcon: ({ color, size }) => (<Icon name="user" size={size} color={color} />)
}}/>
    </AppTab.Navigator>
  )
}