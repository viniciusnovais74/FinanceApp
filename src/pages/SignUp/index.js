import React from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../../contents/auth';
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from "../SignIn/styles"
export default function SignIn() {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { signUp, loadingAuth } = React.useContext(AuthContext)
  return (
    <Background>
      <Container
        behavior={Platform.OS === "ios" ? "padding" : ""}
        enabled
      >
        <Logo source={require("../../assets/Logo.png")} />
        <AreaInput>
          <Input
            placeholder="Nome"
            autoCorrect={false}
            autoCapitalize="none"
            value={nome}
            onChangeText={text => setNome(text)}

          />
        </AreaInput>

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

        <SubmitButton onPress={() => signUp(nome, email, password)}>
          {loadingAuth ? <ActivityIndicator size="large" color="#FFF" /> : <SubmitText>Cadastrar</SubmitText>}
        </SubmitButton>
        <Link>
          <LinkText>
          </LinkText>
        </Link>
      </Container>
    </Background>
  )
}