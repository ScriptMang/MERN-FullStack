import {useState, useEffect} from 'react'
import {projectClient} from '../clients/api.js'
import Project from "../components/Project"


function Dashboard(){
      const [projects, setProjects] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    
    useEffect(()=>{
        async function getData(){
            try{
            // get our projects from db
            const {data} = await projectClient.get('/')

            // save that in component's state
            setProjects(data)
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
            const { data } = await projectClient.post('/', { name, description })
        
            // add the new post to our state
            setProjects([data, ...projects])

            // reset the form 
            setName('')
            setDescription('')

        } catch(err) {
            console.log(err)
        }
    }

    return(
       <div>

            <h1>Project's Page</h1>

            <form onSubmit={handleSubmit}>
                <h2>Add a new project here:</h2>
                <label htmlFor="name">Title:</label>
                <input 
                    type="text" 
                    id="name"
                    required={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

            
            {projects.map(project => 
                <Project 
                    project={project} 
                    key={project._id} 
                />
            )}
        </div>
    )
}

export default Dashboard