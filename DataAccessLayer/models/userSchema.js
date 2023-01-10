const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        index:true

    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength: [6, 'Too few Charcaters']
    },
    refershTokens:[{
        token:{
            type:String,
        }
    }],
    accessTokens:[{
        token:{
            type:String,
        }
    }],
    
},
{
        timestamps: true
});

//for refereshToken
userSchema.methods.generateRefershToken = async function(){
    try {
      const secured_string = process.env.RE_TOKEN_GEN_KEY;
      const options = {
        expiresIn: '60d',
        issuer: 'safe-api-test'
       };

      const token  = jwt.sign({_id:this._id.toString()},secured_string,options);
      // console.log(token);
      this.refershTokens = this.refershTokens.concat({token:token});
      await this.save();
      return token;
      
    } catch (error) {
     console.log(error);
      throw error;
      
    }
  
  }

// for access token
userSchema.methods.generateAccessToken = async function(){
    try {
      const secured_string = process.env.AC_TOKEN_GEN_KEY;
      const options = {
        expiresIn: '1h',
        issuer: 'safe-api-test'
       };

      const token  = jwt.sign({_id:this._id.toString()},secured_string,options);
      // console.log(token);
      this.accessTokens = this.accessTokens.concat({token:token});
      await this.save();
      return token;
      
    } catch (error) {
     console.log(error);
      throw error;
      
    }
  
  }


module.exports = mongoose.model('User',userSchema);