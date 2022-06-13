import { View, Text, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from "./styles"
import { AuthContext } from '../../contents/auth';
export default function SignIn() {

  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { user } = React.useContext(AuthContext)

  function handleSubmit() {
    console.log(user.name)
  }

  return (
    <Background>
      <Container
        behavior={Platform.OS === "ios" ? "padding" : ""}
        enabled
      >
        <Logo source={require("../../assets/Logo.png")} />

        <AreaInput>
          <Input
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={text => setEmail(text)}

          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </AreaInput>

        <SubmitButton onPress={()=>handleSubmit()}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>
        <Link>
          <LinkText onPress={() => navigation.navigate("SignUp")}>
            Criar uma conta!
          </LinkText>
        </Link>
      </Container>
    </Background>
  )
}