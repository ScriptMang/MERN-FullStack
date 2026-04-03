import {createContext, useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {token, userClient} from "../clients/api";

const UserContext = createContext(null);
// if there's a token, assume its a user that needs to be verified 
const initialUser = token() ? {username: null} : null

function UserProvider({children}) {
    const [user, setUser] = useState(initialUser)
 
    const navigate = useNavigate()

    // useEffect that verifies the token and retrieves user data
    useEffect(() => {
        async function getUser(){
            try {
                // check if there's a token (if no token, then we can skip steps)
                if (!token()) return

                // use the token to verify the user (is token valid? is it expired?)
                const { data } = await userClient.get('/')
            
                // if verified that token is legit, take the user data and save it to state
                setUser(data)
            } catch(err) {
                // if verification fails, logout the user 
                console.log(err)
                logout()
            }
        }
        getUser()

    }, [])

    const logout = () =>{
        // clear the user state
        setUser(null)
        // clear the local storage
        localStorage.removeItem("token")
        // redirect the user to the login page
        navigate('/login')

    }

    const value= {
        user,
        setUser,
        logout
    }

    return (
        <>
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
        </>
    )
}

export function useUser(){
    return useContext(UserContext);
}

export default UserProvider