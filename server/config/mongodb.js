import mongoose from "mongoose";

async function authenticate() {
    try {
        await mongoose.connect('mongodb://localhost:27017/foodData24');
        console.log('MongoDB is connected');

        const db = mongoose.connection.db;

        // Fetching food items
        const fetched_data = await db.collection("food_item").find({}).toArray();

        // Fetching food categories
        const fetched_category = await db.collection("food_category").find({}).toArray();

        // Assign fetched data to global objects
        global.food_item = fetched_data;
        global.food_category = fetched_category;

       

    } catch (error) {
        console.error("Data fetch error:", error);
    }
}

export default authenticate;
