import { View, Text } from 'react-native'
import React, {useContext} from 'react'
import { AuthContext } from '../../contents/auth'
import { Container, Nome, NewLink, NewText, Logout, LogoutText } from "./styles"
import { useNavigation } from '@react-navigation/native'
import Header from "../../components/Header.js"
export default function Profile() {
  const { user, signOut } = useContext(AuthContext)
  const navigation = useNavigation()
  return (
    <Container>
      <Header/>
      <Nome>
        {user&& user.nome}
      </Nome>
      <NewLink onPress={()=> navigation.navigate('New')}>
        <NewText>Registrar Gastos</NewText>
      </NewLink>

      <Logout onPress={()=> signOut()}>
        <LogoutText>Sair da Conta</LogoutText>
      </Logout>
    </Container>
  )
}