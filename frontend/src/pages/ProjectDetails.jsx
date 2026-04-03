import {useState, useEffect} from 'react'
import {taskClient} from '../clients/api.js'

function ProjectDetails(){
      const [tasks, setTasks] = useState([])
      const [name, setName] = useState('')
      const [description, setDescription] = useState('')
      const [status, setStatus] = useState('')
        
        useEffect(()=>{
            async function getData(){
                try{
                // get our tasks from db
                const {data} = await taskClient.get('/')
    
                // save that in component's state
                setTasks(data)
                }catch(err){
                    console.log(err.response.data)
                }
            }
            getData()
        }, [])
        
        const handleSubmit = async (e) => {
            e.preventDefault()
    
            try {
                // make a POST request to create the post (based off the state: name and description)
                const { data } = await taskClient.post('/', { name, description })
            
                // add the new post to our state
                setTasks([data, ...tasks])
    
                // reset the form 
                setName('')
                setDescription('')
    
            } catch(err) {
                console.log(err)
            }
        }
}
export default ProjectDetails