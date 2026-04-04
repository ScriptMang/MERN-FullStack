# Tasker Pro

## about
Tasker-Pro is a fullstack MERN application
that allows users to register or login to
create projects and tasks. A user can have multiple projects which can hold multiple tasks.  Projects and tasks can be deleted via the delete button.

## Note for submitting tasks
In the project details page the task status must be one of these 3 expected values "In Progress", "To Do", or "Done", otherwise the task won't be submitted.


## Recommended software to install before being run locally
 * Access to a terminal like the one in visual studio code
 * Access to a connected mongoDB database
 * Install Node.js pkg for your terminal
 * Code Editor: vistual studio code
 * Visual Studio Code thunder-client or Postman extension

## DotEnv files are required
### Backend
Environment variables in need of values:  MONGO_URI, SaltRounds, JWT_SECRET
### Frontend
Environment var: VITE_BASE_URL (a localhost url is fine)

## How to run locally
 Make sure to clone this repo or download it.
 Next, open the folder in your vs-code. Then, open 2 terminal windows inside the project directories frontend and backend. In both terminal windows run run "npm i nodemon". It'll install all the packages for each project. Finally run `npm run dev` inside both terminals. In both terminal windows the programs are continuously running in the background. Click the localhost link provided from the terminal output for the frontend project so you can access the project via your default browser. Or if you just want to test the api endpoints of backend project
 you can use thunderclient or postman extension in vscode. To stop either terminal just use ctrl+c; it'll stop the program.

 
## API Endpoints
Note: baseurl for these routes is http://localhost:(port#)
port# being an actual number. 

## How to use ThunderClient or Postman
To use postman or thunderclient you pass the api endpoint in the top bar. To switch http methods
click the dropdown to the left of the api endpoint bar. To the
right you click 'send' to send the http request. When sending a POST
requesting data is sent in the form of a json object notation. 
The json object is sent in the request body. In the case of thunder client
that would be in Body then JSON tab. The object is denoted using this format 
{"key": "value"}.


### UserRoutes
* POST `/api/users/register`
This where the user registers their account.
To register you need to provide a username,
email and password. Once sent the user
is given their json web token which prove authentication was succesful. 

expected json: `{"username":"value", "email":"value", "password":"value"}`

* POST `/api/users/login`
If user already the exists in the database then
they need to authenticate by providing thier
email and password. If their credentials match the database they get their json web token.

expected json: `{"email":"value", "password":"value"}`

### Authentication is required for Project and Task Routes
Note the projects-routes and tasks-routes can't be accessed without 
first authenticating and receiving the json web token.
The json webtoken string must stored in the authroization tab and
inside  bearer section. The double quotes for the token are not needed.


### ProjectRoutes

* POST `/api/projects`
When given a json object with name and description property in
the request it creates a new project in the database. The response 
is the new project returned as json with an objectId.

Expected JSON: `{"name":"value", "description":"value"}` 

* GET `/api/projects/:projectId`
Returns a project given its project-id. 
The project id is the _id value given to the entry in MongoDB.

* PUT `/api/projects/:projectId`
Changes any or all properties for a project with the target id
if given the new values inside in the json object.
Expected JSON: `{"name": "newValue", "description":"newValue"}`

* DELETE `/api/projects/:projectId`
Deletes the specified target project. If successful
the response 'Project deleted!' will be returned. 

### TaskRoutes
* POST `/api/projects/:projectid/tasks`
Given a title, description, and status property for the json object
it create a new task for the target project. The response returned is the new task
as a json object with an objectId.
Expected JSON: `{"title":"value", "description":"value"}`

* GET `/api/projects/:projectid/tasks`
returns an array of json objects that represent all the tasks for a user's project. 

* PUT `/api/projects/:projectid/tasks/:taskId`
updates any of the  existing property of a task
given a new value.
Expected JSON: `{"title":"value", "description":"value"}`

* DELETE `/api/projects/:projectid/tasks/:taskId`
When provided the objectIds for the target project and task it deletes the task.
The expected response is 'Task deleted!'.