import { createContext, useEffect, useState } from "react"
import { supabase } from "../config/config"
import {useNavigate} from "react-router-dom"


export const AuthContext = createContext({
    user: null
})

export const AuthProvider = ({children}) => {
const [user, setUser] = useState(null)
const navigate = useNavigate()

useEffect(() => {
    const {data: authListener} = supabase.auth.onAuthStateChange(async ()=> checkUser())
    const checkUser = async ()=>{
        const user = supabase.auth.user()
        if(user){
            setUser(user)
            console.log("DATA USER", user)
            navigate("/", { state: {
                email: user.email,
                logedIn:true
              }})
        }
        else{
           navigate("/account",{replace:true})
        }
    }
return ()=>{
  authListener.unsubscribe()
}

},[])

return (

    <AuthContext.Provider value={{user}}>
         {children}
    </AuthContext.Provider>
  
    )
}