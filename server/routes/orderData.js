import express from "express";
import orderModel from "../models/orderModel.js";
const router = express.Router();

router.post("/orderData", async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date });

    let emailId = await orderModel.findOne({ 'email': req.body.email });
    if (emailId === null) {
        try {
            await orderModel.create({
                email: req.body.email,
                order_data: [data]
            });
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    } else {
        try {
            await orderModel.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server error", error: error.message });
        }
    }
});

export default router;
