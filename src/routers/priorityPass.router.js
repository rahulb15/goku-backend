const express = require("express");
const router = express.Router();
const { PriorityPassSchema } = require("../models/priorityPass/priorityPassSchema");
const {userAuthorization}=require("../middlewares/authorization.middleware")
const {
insertPass,
getPassById,
getAllPasses
} = require("../models/priorityPass/priorityPassModel");

router.post("/addPass",async(req,res)=>{
try{
const {passNumber}=req.body
const result1 =	await PriorityPassSchema.find()
const result=await insertPass({passNumber,totalMintNumber:0,totalPass:passNumber})
res.json({ status: 'success', message: 'user updated', result });

}catch(error){
    // console.log(error)
    res.json({ status: 'error', message: error.message });
}
})
//hello
router.patch("/removePass",userAuthorization,async(req,res)=>{
    try{

        const userProf = await getPassById("100");
        userProf.passNumber=userProf.passNumber-1
        userProf.totalMintNumber=userProf.totalMintNumber+1

        // console.log("userp",updatedPassNumber)
        const result=await insertPass({passNumber:userProf.passNumber,totalMintNumber: userProf.totalMintNumber,totalPass:userProf.totalPass})
    
    res.json({ status: 'success', message: 'user updated', result,passNumber:userProf.passNumber,mintNumber:userProf.totalMintNumber,totalPass:userProf.totalPass});
    
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