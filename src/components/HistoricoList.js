import React from "react"
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native"
import Icon from "react-native-vector-icons/Feather"

const Container = styled.View`
margin-bottom: 5px;
padding: 10px;
box-shadow: 2px 2px rgba(0,0,0,0.40)
background-color: rgba(0,0,0,0.02)
`;
const Tipo = styled.View`
flex-direction: row;
`;
const IconView = styled.View`
flex-direction: row;
background-color: ${props => props.dataColor === 'despesa' ? '#C62c63' : '#049301'};
padding: 3px  8px 3px 8px;
border-radius:7px;
`;

const TipoText = styled.Text`
color:#FFF;
font-size:16px
font-style:italic;
`;

const ValorTexto = styled.Text`
color:#222;
font-size:22px;
font-weight:bold;
`;

export default function HistoricoList({ data,deleteItem }) {

  function Tolocal(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
      <Container>
        <Tipo>
          <IconView dataColor={data.type}>
            <Icon name={data.type === 'receita' ? 'arrow-up' : 'arrow-down'} size={20} color="#FFF" />
            <TipoText>{data.type}</TipoText>
          </IconView>
        </Tipo>
        <ValorTexto>
          {Tolocal(data.valor)} - {data.date}
        </ValorTexto>
      </Container>
    </TouchableWithoutFeedback>
  )

}