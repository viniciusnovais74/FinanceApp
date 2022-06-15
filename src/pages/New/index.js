import { View, Text, SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import firebase from "../../services/firebase"
import { format } from "date-fns"
import { Background, Input, SubmitButton, SubmitText } from './styles'
import Picker from '../../components/Picker/index.android'
import { AuthContext } from '../../contents/auth'

export default function New() {
  const { user: usuario } = useContext(AuthContext)
  const [value, setValue] = React.useState()
  const [type, setType] = React.useState('receita')
  const navigation = useNavigation()
  function submitFirebase() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(value)) || type === null) {
      alert('Preencha todos os campos!')
      return;
    }
    Alert.alert(
      'Confirmando dados',
      `Tipo ${type} - Valor: ${parseFloat(value).toLocaleString('pt-bt',{style:'currency',currency:'BRL'})}`,
      [{ text: 'Cancelar', style: 'cancel' }, { text: 'Continuar', onPress: () => addDatabase() }]
    )
  }

  async function addDatabase() {
    let uid = usuario.uid || await firebase.auth().currentUser.uid
    let key = await firebase.database().ref('historico').child(uid).push().key;

    await firebase.database().ref('historico').child(uid).child(key).set({
      type: type,
      value: value,
      date: format(new Date(), 'dd/MM/yyyy')
    });

    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then(snap => {
      let sald = parseFloat(snap.val().saldo)

      type === 'despesa' ? sald -= parseFloat(value) : sald += parseFloat(value)
      user.child('saldo').set(sald)
    })
    Keyboard.dismiss();
    setValue('');
    navigation.navigate('Home')
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Input
            placeholder="Valor desejado"
            keyboardType="numeric"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={value}
            onChangeText={text => setValue(text)}
          />
          <Picker value={type} onChange={setType} />
          <SubmitButton onPress={() => submitFirebase()}>
            <SubmitText>Register</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  )
}