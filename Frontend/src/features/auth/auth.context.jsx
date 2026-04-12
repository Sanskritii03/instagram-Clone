// import { createContext, useEffect, useState } from "react";
// // import { login, register, getMe } from "./services/auth.api";

// export const AuthContext = createContext();

// export function AuthProvider = ({ children }) => {

//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);


//   return (
//     <AuthContext.Provider
//       value={{ user, loading, handleLogin, handleRegister }}
//     >
//       {children}

//     </AuthContext.Provider>
//   );
// }


import { createContext , useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

  const [user , setUser] = useState(null)
  const [loading , setLoading] = useState(false)

return (
  <AuthContext.Provider value={{
    user , loading , setLoading , setUser
  }}>
    {children}
  </AuthContext.Provider>
)

}