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
        // console.log(form)
        try{
            const {data}= await userClient.post('/login', form);
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
        <>
            <div id="loginContainer">
            <div id="loginHeadingContainer">
                <div id="taskerProSubtitle">Tasker Pro</div>
                <h1 id="loginFormHeading">Login</h1> 
            </div>
            <div id="formContainer">  
            <form id="loginForm" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input 
                    value={form.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="text"
                    required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input 
                    value={form.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    required 
                    />
                </div>
            <button id="loginButton">Login</button>
        </form>
            </div>
        </div>
        </>
    )
}

export default Login