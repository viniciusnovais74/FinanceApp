import { ActivityIndicator, Keyboard, Platform, TouchableWithoutFeedback } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from "./styles"
import { AuthContext } from '../../contents/auth';
export default function SignIn() {

  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signIn, loadingAuth } = useContext(AuthContext)

  function handleSubmit() {
    signIn(email, password)
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
              secureTextEntry={true}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </AreaInput>

          <SubmitButton onPress={() => handleSubmit()}>
            {loadingAuth ? <ActivityIndicator size="large" color="#FFF" /> : <SubmitText>Acessar</SubmitText>}

          </SubmitButton>
          <Link>
            <LinkText onPress={() => navigation.navigate("SignUp")}>
              Criar uma conta!
            </LinkText>
          </Link>
        </Container>
      </Background>
    </TouchableWithoutFeedback>
  )
}