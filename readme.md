# Mean Blog

Blog using Nodejs, Expressjs, Angularjs and Mongodb. MEAN Javascript Fullstack application

## Features

- Create/Edit/Delete Article
- Passport Authentication for Administration
- Bcrypt Password Hash
- Angular ui router
- textAngular Text-Editor
- Sass

## Demo

http://dimitrimikadze.com/

## Server Side Dependencies

````
"bcrypt": "^0.8.4",
"body-parser": "^1.13.2",
"connect-flash": "^0.1.1",
"cookie-parser": "^1.3.5",
"ejs": "^2.3.3",
"express": "^4.13.1",
"express-session": "^1.11.3",
"mongoose": "^4.1.0",
"morgan": "^1.6.1",
"passport": "^0.2.2",
"passport-local": "^1.0.0"
````

## Client Side Dependencies

````
"textAngular": "~1.4.2",
"bootstrap": "~3.3.5",
"angular": "1.4.3",
"angular-ui-router": "~0.2.15"
````

## Getting Started

Clone Repo

````
git clone https://github.com/DimitriMikadze/Mean-Blog.git
````

Npm install dependencies

````
cd server & npm install
````

Create config.js file in config folder

````
module.exports = {
    'secret': 'SomeSecretString',
    'database': 'mongodb://localhost/yourdatabasename'
};
````
Start Mongodb

````
mongod
````

Start Server

````
cd server & node app.js
````

## Create Admin User

uncomment testUser route in app.js

````
app.use("/", require("./routes"));
app.use("/admin", require("./routes/admin"));
// app.use("/test", require("./routes/testUser"));
````
Navigate to 

````
/test/create-user/your-name/your-password
````

this will create admin user with your name and hashed password

## User Admin

Navigate to 

````
/login
````

Insert your newly created name and password

## Change Styles

Css is written with Sass, you can update scss files with running

````
cd client/public & sass --watch scss:css
````

or if you don't want to use Sass just update

````
client/public/css/app.css
````

## Grunt Packages

grunt-contrib-concat
grunt-contrib-watch

## Start Grunt

````
cd client
grunt
````

output will look like this

````
Running "concat:dist" (concat) task
File app/scripts.js created.

Running "watch" task
Waiting...
````

## Contributing

contributions are more than welcome!

## License

See license.txt
