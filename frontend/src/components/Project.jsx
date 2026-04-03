function Project({ project }) {
    return (
        <div>
            <h3>Project: {project.name}</h3>
            <p>description: {project.description}</p>
        </div>
    )
}

export default Project