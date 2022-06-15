import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Header() {
  return (
    <View style={{ width: "100%", height: 50 }}>
      <Icon name="menu" size={30} color="#FFF" />
    </View>
  )
}