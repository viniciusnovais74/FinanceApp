import React, { useState } from 'react'
import { Platform, Text, TouchableOpacity } from 'react-native'
import DateTimePicker from "@react-native-community/datetimepicker"
import { Container, Header } from "./styles"

export default function DatePicker({date, onClose, onChange}) {
  const [datenow, setDatenow] = useState(new Date(date))
  return (
    <Container>
      {Platform.OS === 'ios' && (
        <Header>
          <TouchableOpacity onPress={onClose(false)}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </Header>
      )}
      <DateTimePicker
        value={datenow}
        mode="date"
        display='default'
        onChange={(event, d) => {
            const currentDate = d || datenow;
            setDatenow(currentDate)
            onChange(currentDate)
        }}
        style={{ backgroundColor: '#FFF' }}

      />
    </Container>
  )
}