import mongoose from 'mongoose';

const status = ['To Do', 'In Progress', 'Done']
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
   description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: status,
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
})

const Task = mongoose.model('Task', taskSchema)
export default Task