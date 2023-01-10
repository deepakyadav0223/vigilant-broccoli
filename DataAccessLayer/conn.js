const mongoose = require("mongoose");
const dbUrl = process.env.DATABASE_URL;

mongoose.set("strictQuery", false);

mongoose.connect(dbUrl,{useNewUrlParser: true}).then(()=>{
    console.log('Connected With database');
}).catch((err)=>{
    console.log(err);
});