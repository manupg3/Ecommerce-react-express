import { supabase } from "../config/config"

export const signUp = async (data) => {
  let result
  try {
    result = await supabase.auth.signUp(data)
    return result
  } 
  catch (error) {
      console.log("ERROR SIGNUP",error)
  }
  return result


}

export const updateProfile = async (data) =>{
try {
  await supabase.from('profiles').upsert(data,{returning:'minimal'})
} catch (error) {
  console.log("ERROR UPDATE PROFILE",error)
}
}

export const logIn = async (data) =>{
  let result
  try {
    result = await supabase.auth.signIn(data)
    sessionStorage.setItem("IsLogedIn", true)
    return result
  } catch (error) {
    console.log("ERROR LOGIN",error)
  }
  return result
  }
  export const getUserProfile =  async() =>{
    try{ 
     const user = supabase.auth.user()
     if(user){ 
     
      console.log("USER ID ES ", user.id)
        const{id,app_metadata,user_netadata}=user

        const{data,error,status}=await supabase
          .from('profiles')
          .select('id,username,updated_at')
          .eq('id',id)
          .single()
          return{username:data.username}
         
      }
        
        }
         catch(error) {
            console.log("ERROR",error)
         }
      
          }

export const logout = async() =>{
  sessionStorage.setItem("UserSessionName", "")
  sessionStorage.setItem("IsLogedIn", false)
   
  await supabase.auth.signOut()

}