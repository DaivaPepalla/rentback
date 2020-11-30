require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const rtsIndex = require('./routes/indexRouter');
//middleware
app.use(bodyParser.json());
app.use(cors());
app.use('/api',rtsIndex);

//error handler
app.use((err,req,res,next) =>{
     if(err.name === 'Validation Error'){
          var valErrors=[];
          Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
          res.status(422).send(valErrors)
     }
});

//start server
app.listen(process.env.PORT, () =>{
     console.log(`sever at port ${process.env.PORT} is running.....`);
})

