import formModel from "../models/formModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Get all documents
export const getController = async (req, res) => {
    res.send('Here is GET response');
};

// Create a new document
export const postController = async (req, res) => {
    try {
        const { name, email, password, address } = req.body;
        const check = await formModel.findOne({ email });
        if (check) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered!"
            });
        }

        // Validation
        if (!name || !email || !password || !address) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Password hashing
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);

        const form = new formModel({
            name: name,
            email: email,
            password: hashPassword,  // Use hashed password here
            address: address,
        });

        await form.save();
        res.status(201).json({
            success: true,
            message: 'Registration Successful.',
            form
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration Failed.',
            error
        });
    }
};



// Login user
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Both email and password are required!"
            });
        }

        // Check if user exists
        const form = await formModel.findOne({ email });
        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Email is not registered! Please register first..."
            });
        }

        // Compare password with the hashed password
        
        //         console.log('Login Password:', password);  // Plain text password entered by the user
        // console.log('Stored Hashed Password:', form.password);  // Hashed password from the database

        const match = await bcrypt.compare(password, form.password);
        // console.log('Password Match:', match); 
        if (!match) {
            return res.status(401).json({
                success: false,
                message: " Password Incorrect!"
            });
        }

        // Token generation (JWT can be added here)
        const token = jwt.sign({ _id: form._id }, process.env.JWT_MATCH, { expiresIn: '1d' });
        res.status(200).json({
            success: true,
            message: "Login Successful!",
            form: {
                name: form.name,
                email: form.email,
                address: form.address,
            },
            token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Login failed...",
            error
        });
    }
};



// Update a document by ID
export const updateController = async (req, res) => {
    res.send('Here is UPDATE response');
};

// Delete a document by ID
export const deleteController = async (req, res) => {
    res.send('Here is DELETE response');
};

export default formModel;
