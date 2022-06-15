import React from "react"
import { Picker as RNPickerSelect } from "@react-native-picker/picker"
import { PickerView } from "./styles"
export default function Picker({ value, onChange }) {

  return (
    <PickerView>
      <RNPickerSelect
        style={{
          width: '100%'
        }}
        selectedValue={value}
        onValueChange={(vars) => onChange(vars)}
      >
        <RNPickerSelect.Item label="Receita" value='receita' />
        <RNPickerSelect.Item label="Despesa" value='despesa' />

      </RNPickerSelect>
    </PickerView >
  )
}