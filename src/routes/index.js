import React, { useContext } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { AuthContext } from '../contents/auth'

import AppRoutes from './App'
import AuthRoutes from './Auth'

export default function Routes() {
  const { signed, loading } = useContext(AuthContext)

  if(loading){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#131313"/>
      </View>
    )
  }

  return (
    signed ? <AppRoutes /> : < AuthRoutes />
  )
}
