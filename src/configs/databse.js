const mongoose = require('mongoose');
const {mongodb}= require('./keys');

mongoose.connect(mongodb.URI,{


    useNewUriParser:true,
    useCreateIndex:true
})

.then(db=>console.log('connected succes'))
.catch(err=>console.log (err))