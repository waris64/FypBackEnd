    import bcryptjs from "bcryptjs"
    import jwt from "jsonwebtoken"
    import User from "../model/userModel.js"
    import { ErrorHandler } from "../utils/error.js"

    export const register = async (req, res, next) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password || username === "" || email === "" || password === "") {
            return next(ErrorHandler(400, "All fields are required"));
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        try {
            await newUser.save();
            res.json("Sign Up successfully");
        } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
                return next(ErrorHandler(400, "Email is Already registered"));
            } else if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
                return next(ErrorHandler(400, "Username is Already taken"));
            }
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