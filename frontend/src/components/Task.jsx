function Task({ task }) {
    return (
        <div>
            <h3>Project: {task.title}</h3>
            <p>description: {task.description}</p>
        </div>
    )
}

export default Task