import { View, Text, Platform } from 'react-native'
import React from 'react'
import { Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText } from "../SignIn/styles"
export default function SignIn() {
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </AreaInput>

        <SubmitButton>
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
        <Link>
          <LinkText>
          </LinkText>
        </Link>
      </Container>
    </Background>
  )
}