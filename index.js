const startupDebugger=require('debug')('app:startup');   //returns a function
const dbDebugger=require('debug')('app:db');     //for database debugging
const config = require('config');
const morgan = require('morgan'); //Third party middleware
const helmet = require('helmet'); //Third party middleware
const Joi = require('joi');
//j is capital coz return type is CLASS
const courses = require('./routes/courses');  //Load the module
const home= require('./routes/home')
const express = require('express');
//express for creating server
const app = express();

//
//To set view engine for the application
app.set('view engine','pug');   //Internally will load this module
app.set('views','./views');    //To overwrite pass to the templates.default is in views

//for debugging
startupDebugger('connected....');

app.use(express.json());
//for providing some prop. to express
app.use(express.urlencoded( { extended:true } ));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/courses', courses);      //To use courses router.route is given here where to use courses.
app.use('/', home);

// Configuration
console.log('Application name: '+config.get('name'));
console.log('Mail server: '+config.get('mail.host'));
console.log('Mail password: '+config.get('mail.password'));

//To change env.
//export NODE_ENV=production
if(app.get('env')==='development')//to use only in development environment
{app.use(morgan('tiny'));//log an http request
}


const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening to port ${port}...`)) ;


//in WINDOWS IN PLACE OF EXPORT USE SET :)










