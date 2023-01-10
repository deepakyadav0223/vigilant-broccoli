const userSchema = require("../DataAccessLayer/models/userSchema");
const userService = require("../Services/userService");

const getAllUsers = async(req,res)=>{
        console.log(JSON.stringify(req.headers));
        const allUsers = await userService.getAllUsers();
        res.status(200).send({status:"OK" , data:allUsers});
};

const getOneUser = async(req,res)=>{
    const {params:{id}} = req;
    const oneUser = await userService.getOneUser(id);
    res.status(200).send({status:"OK", data : oneUser});
};

const createNewUser = async (req,res)=>{
        const {body} = req ;
        if(!body.email || 
            !body.password || 
            !body.name){
            res.status(400).send({
                status:"FAILED",
                data:"Request Must Have email,password and name."
            });
            return;
        }

        try{
            const createUser = await userService.createNewUser(body);
            res.status(201).send({status:"OK" , data : createUser});
        }
        catch(error){
            res.status(error ? error.status : 500).send({
                status:"FAILED",
                data:{error: error?.message || error}
            });
        }
        
};

const getAccessToken = async (req,res) =>{
    const refereshToken = req.body.token || req.header('Authorization');
    if(!refereshToken){
        res.status(401).send({message: "Invalid Referesh Token",
        status : "FAILED"});
        return;
    }

    try{
        const newToken = await userService.getAccessToken(refereshToken);
        res.status(201).send({status:"OK", data: newToken});
    }
    catch(error){
        res.status(error ? error.status : 500).send({
            status:"FAILED",
            data:{error: error?.message || error}
        });
    }


}


const verifyOneUser = async(req,res) =>{

    const {body} = req ;
    if(!body.email || 
        !body.password ){
        res.status(400).send({
            status:"FAILED",
            data:"Request Must Have email and password."
        });
        return;
    }
    try{

        const userDetails = await userService.verifyOneUser(body);
        res.status(201).send({status:"OK" , data : userDetails});

    }
    catch(error){
        // console.log(error);
        res.status(error ? error.status : 500).send({
            status:"FAILED",
            data:{error: error?.message || error}
        });

    }



}

module.exports = {
                    getAllUsers,
                    getOneUser,
                    createNewUser,
                    getAccessToken,
                    verifyOneUser
                };