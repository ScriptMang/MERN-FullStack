import {useState} from "react"
import {userClient} from '../clients/api.js'
import {useUser} from '../context/UserContext.jsx'
import {useNavigate} from 'react-router-dom'

function Login(){
    const {setUser} = useUser()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(form)
        try{
            const {data}= await userClient.post('/login', form);
            console.log(data);
            localStorage.setItem("token", data.token)
            setUser(data.user)
            navigate("/feed")
        }catch(err){
            console.dir(err)
            alert(err.response.data.message)
        }
    }

    return(
        <>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
       
            <label htmlFor="email">Email:</label>
            <input 
                value={form.email}
                onChange={handleChange}
                id="email"
                name="email"
                type="text"
                required 
            />

            <label htmlFor="password">Password: </label>
            <input 
                value={form.password}
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                required 
            />
            <button>Login</button>
        </form>
        </>
    )
}

export default Login