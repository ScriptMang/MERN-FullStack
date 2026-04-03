import {useState, useEffect} from 'react'
import {projectClient} from '../clients/api.js'
import Project from "../components/Post"


function Dashboard(){
      const [projects, setProjects] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    
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
            // make a POST request to create the post (based off the state: title and body)
            const { data } = await projectClient.post('/', { title, body })
        
            // add the new post to our state
            setProjects([data, ...projects])

            // reset the form 
            setTitle('')
            setBody('')

        } catch(err) {
            console.log(err)
        }
    }

    return(
       <div>

            <h1>Feed Page</h1>

            <form onSubmit={handleSubmit}>
                <h2>Leave a post here:</h2>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title"
                    required={true}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label htmlFor="body">Body:</label>
                <textarea 
                    type="text" 
                    id="body"
                    required={true}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
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