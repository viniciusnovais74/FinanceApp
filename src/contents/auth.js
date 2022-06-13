import React, { useState } from "react"

export const AuthContext = React.createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "Vinicius"
  })
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;