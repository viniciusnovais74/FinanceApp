import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from "../pages/Home"


export default function AppRoutes() {
  return (
    <AppRoutes.Navigator>
      <AppRoutes.Screen name="Home" component={Home} />
    </AppRoutes.Navigator>
  )
}