const Joi=  require('joi');
//j is capital coz return type is CLASS
const express = require('express');
//express for creating server
const app = express();

app.use(express.json());
//for providing some prop. to express

const courses=[
  {id: 1,name:'course1'},
  {id:1,name:'course2'},
  {id:1,name:'course3'},

];

app.get('/',(req,res)=>{
  res.send('hello world !!!');
});


app.get('/api/courses',(req,res)=>{//this to route
  res.send(courses);
});
 //using http POST request for creating new course
 //
app.post('/api/courses',(req,res)=>{
  const schema={
    name: Joi.string().min(3).required()//checking for length
  };
//VALIDATE RETURN OBJECT 
//AND IT CHECKS FOR CORRECTNESS
  const result=Joi.validate(req.body,schema);//in body of request validation is being done
  //console.log(result)
  if(result.error){
    //400 bad request
    res.status(400).send( result.error.details[0].message);
  }
  const course={
  id: courses.length+1,
  name: req.body.name
//???WHAT IF CLIENTS FAILS TO SEND THE PROPERTY
//OR SENDS AN INVALID PROPERTY                        //impo.POINT
//THAT IS HANDLED BY "INPUT VALIDATION "
  };
  courses.push(course);
  res.send(course);//passing object in response
});








app.get('/api/courses/:id',(req,res)=>{
  const course=courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('course id not found');
  res.send(course);
}); 
//find used to search for the course with the given critorian

//req.paramsid return string

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`listening to port ${port}...`)) ;


//in WINDOWS IN PLACE OF EXPORT USE SET :)










