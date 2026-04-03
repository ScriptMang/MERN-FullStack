import {useState, useEffect} from 'react'
import {taskClient} from '../clients/api.js'
import Task from '../components/Task' 

function ProjectDetails(){
      const [tasks, setTasks] = useState([])
      const [title, setTitle] = useState('')
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
                // make a POST request to create the post (based off the state: title and desTitletion)
                const { data } = await taskClient.post('/', { title, description, status })
            
                // add the new post to our state
                setTasks([data, ...tasks])
    
                // reset the form 
                setTitle('')
                setDescription('')
                setStatus('')
    
            } catch(err) {
                console.log(err)
            }
        }


 return(
       <div>

            <h1>Project Details Page</h1>

            <form onSubmit={handleSubmit}>
                <h2>Add a new task here:</h2>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title"
                    required={true}
                    value={title}Title
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                 <label htmlFor="status">Status:</label>
                <input 
                    type="text" 
                    id="status"
                    required={true}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <br />
                <label htmlFor="description">Body:</label>
                <textarea 
                    type="text" 
                    id="description"
                    required={true}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                <button>Submit</button>
            </form>

            
            {tasks.map(task => { 
                const handleTaskDelete = async (e) => {
                    try{
                        await taskClient.delete(`/${task._id}`)
                        const clickedTask = task
                        setTasks(tasks => tasks.filter(currTask => currTask._id !== clickedTask._id))
                    } catch (e){
                        console.log(e)                    
                    }
                }
                return( 
                <div key={task._id}>
                    <Task task={task} />
                    <button onClick={handleTaskDelete}>delete</button>
               </div>
               )
            }
            )}
        </div>
        )



}
export default ProjectDetails