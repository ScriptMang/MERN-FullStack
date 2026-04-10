import express from 'express'
import 'dotenv/config'
import './config/connection.js'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js' 


const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)

app.listen(port, ()=> console.log(`Listening on port: http://localhost:${port}`));