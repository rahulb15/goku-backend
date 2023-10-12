const express = require("express");
const router = express.Router();
const { crateAccessJWT } = require('../helpers/jwt.helper');
const { PriorityPassSchema, DbCooperSchema } = require("../models/dbCooper/dbCooper.schema");
const {userAuthorization}=require("../middlewares/authorization.middleware")
const {
insertPass,
getPassById,
getAllPasses
} = require("../models/dbCooper/dbcooper.model");

router.post("/addPass",async(req,res)=>{
try{
const {passNumber}=req.body
const result1 =	await DbCooperSchema.find()
console.log("resulthai",result1)
const result=await insertPass({passNumber,totalMintNumber:0,totalPass:passNumber})
console.log("pass",result)
res.json({ status: 'success', message: 'Db Cooper pass has been added', result });

}catch(error){
    // console.log(error)
    res.json({ status: 'error', message: error.message });
}
})

router.patch("/removePass",userAuthorization, async(req,res)=>{
    try{

        const userProf = await getPassById("100");
        userProf.passNumber=userProf.passNumber-1
        userProf.totalMintNumber=userProf.totalMintNumber+1

        // console.log("userp",updatedPassNumber)
        const result=await insertPass({passNumber:userProf.passNumber,totalMintNumber: userProf.totalMintNumber,totalPass:userProf.totalPass})
    
    res.json({ status: 'success', message: 'Pass has been deducted', result,passNumber:userProf.passNumber,mintNumber:userProf.totalMintNumber});
    
    }catch(error){
        // console.log(error)
        res.json({ status: 'error', message: error.message });
    }
    })

    router.get('/', async (req, res) => {
        try {
            const result = await getAllPasses();
    
            return res.json({
                status: 'success',
                result,
            });
        } catch (error) {
            res.json({ status: 'error', message: error.message });
        }
    });
    

module.exports = router;