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
  const course={//creating a course object
  id: courses.length+1,//no. of elements in courses array
  name: req.body.name//reading from the body of request
  //which has name as attribute
  //but this feature is note enabled in EXPRESS

  //we have assumes=d that there is a prop. name in
//the body of the request
//???WHAT IF CLIENTS FAILS TO SEND THE PROPERTY
//OR SENDS AN INVALID PROPERTY
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










