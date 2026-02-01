import express from "express";
const router = express.Router();
router.post("/foodData",(req,res)=>{
    try {
        res.send([global.food_item,global.food_category])
    } catch (error) {
        console.error(error.message);
        res.send('server error')
    }
})

export default router;