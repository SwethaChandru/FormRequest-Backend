var mongoose=require('mongoose');
var express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
 
var app=express();
app.use(cors({}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true })); 

mongoose.connect('mongodb://localhost:27017/Request', { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log(err);
      console.log('Error while Connecting!')
    } else {
      console.log('Connected to Mongo DB')
    }
  });

const uroute=require('./routes/userRoute');
app.use('/user',uroute);

const deptroute=require('./routes/deptRoute');
app.use('/dept',deptroute);

const formroute=require('./routes/formRoute');
app.use('/form',formroute);

const notiroute=require('./routes/notificationRoute');
app.use('/noti',notiroute);


const PORT=3000;

app.listen(PORT,()=>{
    console.log('server has been started at port:' +PORT);
})