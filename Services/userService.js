const userModel = require("../DataAccessLayer/models/userSchema");
const jwt = require("jsonwebtoken");

const getAllUsers = async()=>{
      const data =  await userModel.find({});
        return data;
};

const getOneUser = async (id)=>{
        const data  = await userModel.find({_id: id});
        return data;
};

const createNewUser = async(body)=>{
        const filledData = await userModel(body);

        try {
               
                const savedData = await filledData.save();
                return filledData;

                
        } catch (error) {
                throw {
                        status : 403,
                        message : error.errors['password'].message
                }
                
                     
        }
        

        
};

const getAccessToken = async(refereshToken)=>{

        const secured_string = process.env.RE_TOKEN_GEN_KEY;
        
        const verify =  jwt.verify(refereshToken,secured_string);

        if(verify == null || verify == [] || verify == {}){
           throw {
                status:401,
                message: "Invalid Refresh Token"
           }
        }
        try{
                const userid =  await userModel.findOne({_id:verify._id});

                const newRefreshToken = await userid.generateRefershToken();
        
                const newAccessToken = await userid.generateAccessToken();

                return [{refreshToken: newRefreshToken }  , {accessToken : newAccessToken }];
        }
        catch(error){
                throw {
                        status:500,
                        message: "Internal Server Error"
                   }
        }



}

const verifyOneUser = async(body)=>{
        
        try{
                const userData = await userModel.findOne({email:body.email ,password:body.password});
                if(!userData){
                        throw {
                                status:401,
                                message: "Invalid Credentials"
                           }   
                }
                const newRefreshToken = await userData.generateRefershToken();
                const newAccessToken = await userData.generateAccessToken();

                return [{refreshToken : newRefreshToken} , {accessToken: newAccessToken} , {name : userData.name}];

        }
        catch(error){
                console.log(error);
                throw {
                        status:500,
                        message: "Internal Server Error"
                   }
        }


}

module.exports = {
                    getAllUsers,
                    getOneUser,
                    createNewUser,
                    getAccessToken,
                    verifyOneUser
                };