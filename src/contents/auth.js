import AsyncStorage from "@react-native-community/async-storage";
import React, { createContext, useEffect, useState } from "react"
import firebase from "../services/firebase"
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)
  useEffect(() => {
    async function loadStorage() {
      const storageUser = await AsyncStorage.getItem("Auth_user");
      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
      setLoading(false);
    }
    loadStorage();
  }, [])

  async function signIn(email, password) {
    setLoadingAuth(true)
    await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(async (value) => {
        let uid = value.user.uid
        await firebase.database().ref('users').child(value.user.uid).once('value').then((snapshot) => {
          let data = {
            uid: uid,
            nome: snapshot.val().nome,
            email: value.user.email,
          }
          setUser(data)
          storageUser(data)
          setLoadingAuth(false)
        })
      }).catch((error) => {
        alert(error.code)
        setLoadingAuth(false);
      })
  }


  async function signUp(nome, email, passsword) {
    setLoadingAuth(true)
    await firebase.auth().createUserWithEmailAndPassword(email, passsword).then((response) => {
      let uid = response.user.uid;
      firebase.database().ref('users').child(uid).set({
        saldo: 0,
        nome: nome
      }).then(() => {
        let data = {
          uid: uid,
          nome: nome,
          email: response.user.email
        }
        setUser(data)
        storageUser(data)
      });
    }).catch((error) => {
      alert(error.code)
      setLoadingAuth(false)
    });
  }

  async function storageUser(data) {
    await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
  }

  async function signOut() {
    await firebase.auth().signOut();
    await AsyncStorage.clear().then(() => { setUser(null) })
  }

  return (
    <AuthContext.Provider value={{ signed: user, user, signUp, signIn, loading, loadingAuth, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;