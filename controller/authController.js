import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';
import { ErrorHandler } from '../utils/error.js';

export const register = async (req, res, next) => {
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username || !email || !password) {
        return next(ErrorHandler(400, "All fields are required"));
    }
    if (username.length < 3 || username.length > 30) {
        return next(ErrorHandler(400, "Username must be between 3 and 30 characters"));
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return next(ErrorHandler(400, "Invalid email format"));
    }
    if (password.length < 6) {
        return next(ErrorHandler(400, "Password must be at least 6 characters long"));
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return next(ErrorHandler(400, 'Email is already registered'));
            } else if (existingUser.username === username) {
                return next(ErrorHandler(400, 'Username is already taken'));
            }
        }

        // Hash the password
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create a new user instance
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Save the new user
        await newUser.save();

        // Optionally, create a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with the new user and token
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        next(error);
    }
};



    export const signIn = async (req, res, next) => {
        const { email, password } = req.body

        if (!email || !password || email === "" || password === "") {
            return next(ErrorHandler(400, "Email or password is required"))
        }

        try {
            const validUser = await User.findOne({ email }).select("+password")

            if (!validUser) {
                return next(ErrorHandler(404, "Invalid Email and Password"))
            }

            const validPassword = bcryptjs.compareSync(password, validUser.password)

            if (!validPassword) {
                return next(ErrorHandler(404, "Invalid Email and Password"))
            }

            const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

            const { password: pass, ...rest } = validUser._doc
            
            res.status(200).json({
                data: {token,
                    user: validUser
                }
            })

        } catch (error) {
            next(error)
        }
    }