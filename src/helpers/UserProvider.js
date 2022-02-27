import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const UserContext = createContext()

const UserProvider = ({children}) => {
  
  const [user,setUser] = useState();
  const [loggedIn,setLoggedIn] = useState(localStorage.getItem("X-AccessToken"))

  let navigate = useNavigate();

  useEffect(() => {
    console.log(user)
  }, [user])

  useEffect(() => {
    console.log(loggedIn)
    if(loggedIn){
      updateUserInfo()
    }else{
      navigate('/guest/login')
    }

  }, [loggedIn])
  

  const updateUserInfo = () => {
    axios.get('/authentications/me/').then(res=>{
      setUser(res.data)
    }).catch(err => {
      if(err.response.status===403){
        setLoggedIn(false)
        localStorage.removeItem("X-AccessToken")
      }
    })
  }

  return (
    <UserContext.Provider value={{user,updateUserInfo,setLoggedIn}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;