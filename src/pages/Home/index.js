import { View, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contents/auth'
import { Background, Container, List, Nome, Saldo, Title, Area } from './styles'
import Header from '../../components/Header'
import HistoricoList from '../../components/HistoricoList'
import firebase from "../../services/firebase"
import { format, isPast } from 'date-fns'
import Icon from 'react-native-vector-icons/MaterialIcons'
import DatePicker from '../../components/DatePicker'
export default function Home() {

  const [loading, setLoading] = React.useState(true)
  const { user, setUser, signOut } = useContext(AuthContext)

  const [show, setShow] = useState(false)
  const [newDate, setNewDate] = useState(new Date())
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    firebase.database().ref('users').child(user.uid).on('value', (snapshot) => {
      setUser({ ...user, saldo: snapshot.val().saldo });
      setLoading(false);
    })
    firebase.database().ref('historico').child(user.uid).orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy')).limitToLast(10).on('value', (snap) => {
      setHistorico([]);
      snap.forEach(child => {
        let list = {
          key: child.key,
          type: child.val().type,
          valor: parseFloat(child.val().value),
          date: child.val().date
        };
        setHistorico(old => [...old, list].reverse());
      });
    });
  }, [newDate])

  async function handleDeleteSS(data) {
    await firebase.database().ref('historico').child(user.uid).child(data.key).remove().then(() => {
      let sald = user.saldo;
      data.type === 'despesa' ? sald += parseFloat(data.valor) : sald -= parseFloat(data.valor)
      firebase.database().ref('users').child(user.uid).child('saldo').set(sald);
    })
  }

  function handleDelete(data) {

    if (isPast(new Date(data.date))) {
      alert("Você não pode excluir um registro antigo")
      return;
    }

    Alert.alert(
      'Cuidado Atenção',
      `Você deseja excluir ${data.type} - Valor: ${data.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`,
      [{ text: 'Cancelar', style: 'cancel' }, { text: 'Continuar', onPress: () => handleDeleteSS(data) }]
    )
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios')
    setNewDate(date)
  }

  return (

    <Background>
      <View style={{ height: 50, width: "100%" }} />
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>{loading ? <ActivityIndicator size="large" /> :
          user.saldo && user.saldo.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        }</Saldo>
      </Container>
      <Area>
        <TouchableOpacity onPress={()=>setShow(true)}>
          <Icon name="event" color="#FFF" size={30} />
        </TouchableOpacity>
        <Title>Ultimas movimentações</Title>
      </Area>
      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}
      />
      {
        show && (
          <DatePicker
            onClose={setShow}
            date={newDate}
            onChange={onChange}
          />)
      }
    </Background>

  )
}