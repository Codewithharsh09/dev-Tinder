Ep-03 | Creating our Express Server:-
- Create a repository
- Initialize the repository
- node_modules, Package.json, package-lock.json
- Install express
- Create a Server
- Listen to port 7777
- Write request handlers for /test , /hello
- Install nodemon and update scripts inside package.json
- What are dependencies and Devdependencies 
- difference between dependencies and devdependencies
- what is the use of "-g" while npm install 
- difference betw

Ep-04 | Routing and request Handlers:-

- initialize git
- .gitignore
- Create a remote repo on github
- push all code to remote origin
- play with routes and route extensions ex. /hello , /hello/2 , /xyz
- order of the routes matter a lot
- Install postman app and make a workspace/collection > test API call
- Write logic to handle GET,POST,PATCH,DELETE API Calls and test then on Postman
- Explore routing and use of ?,+,(),* in the routes
- Use of regex in routes /a/, /.*fly$/
- Routing the query params in the routes
- routing the dynamic routes

Ep-05 | Middlewares & Error Handlers:-

- Multiple Route handlers - Play with Code
- next()
- next function and errors along with res.send
- app.use("/route",[rH, rH2], rH3, rH4, rH5);
- what is a Middleware
- How express Js basically handles request behind the scenes
- Difference between app.use() and app.all();
- how to define routes ?
- write a dummy auth middleware for admin
- write a dummy suth middleware for all user routes , except /user/login 
- Erro handling using app.use("/",(err,req,res,next)=>{});

Ep-06 | Database,Schema & Models| Moongoose :-
(DOCS URL for Schema- https://mongoosejs.com/docs/guide.html)
(DOCS URL for model- https://mongoosejs.com/docs/models.html)

- Create a free cluster on mongodb official website(Mongodb Atlas)
- install mongooose library
- connect your application to the database<connection url>/dav tinder
- call the connectdb function and connect to database before starting application on 7777
- create a userSchema & user Model(https://mongoosejs.com/docs/schematypes.html)
- create /signup API to add data to database
- push some documents using API calls from postman
- Error handling using try , catch

Ep-07 | Diving into the APIs

- JS object vs JSON(Difference)
- Add the express.json() middleware to your app
- Make your signup API dynamic to receive data from end user 
- user.findOne with duplicate email ids, which object returned
- API - get user by email
- API - Feed API - GET/feed - get all the users from the database
- API - get user by ID
- Create a delete user API
- API - update a user
- Explore the mongoose Documentation for model methods(https://mongoosejs.com/docs/api/model.html#Model.find())

Ep-08| Data Sanitization & Schema Validations:- 
(Docs URL for Schema Types - https://mongoosejs.com/docs/schematypes.html)

- Explore schemaType options from the documentation(https://mongoosejs.com/docs/schematypes.html)
- add required,unique,lowercase,min,max,minLength,maxLength,trim
- Add default
- Create a custom validate function for gender
- Improve the DB schema-PUT all appropriate validations on each field in Schema
- Add timestamps to the userSchema
- Add API level validation on Patch request & Signup post api
- Data Sanitizing - Add API validation for each field
- install validator(npm i validator)
(Validator library - https://www.npmjs.com/package/validator)
- Explore validator library functions and Use validator funcs for password, email, URL 
- never trust req.body