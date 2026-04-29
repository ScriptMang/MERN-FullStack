import {useState} from "react"
import {userClient} from '../clients/api.js'
import {useUser} from '../context/UserContext.jsx'
import {useNavigate} from 'react-router-dom'

function Register(){
    const {setUser} = useUser()
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username:'',
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
        // console.log(form)
        try{
            const {data}= await userClient.post('/register', form);
            // console.log(data);
            localStorage.setItem("token", data.token)
            setUser(data.user)
            navigate("/dashboard")
        }catch(err){
            console.dir(err)
            alert(err.response.data.message)
        }
    }

    return(
        <div id="registerForm">
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username: </label>
            <input
                value={form.username}
                onChange={handleChange} 
                id="username" 
                name="username" 
                type="text"  
                required 
            />
       
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
            <button>Register</button>
        </form>
        </div>
    )
}

export default Register