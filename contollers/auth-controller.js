
const User = require('../modals/user-model')
const bcrypt = require('bcryptjs')
const home = async (req, res) => {
    try {
        res.status(200).send("Welcome best haseeb 1111");
    } catch (error) {
        console.log(error);

    }
};

const register = async (req, res, next) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "email already exists" });
        }

        const userCreated = await User.create({ username, email, phone, password });

        res.status(201).json({
            msg: "Registration Succesfull",
            token: await userCreated.genrateToken(),
            userId: userCreated._id.toString()
        });
    } catch (error) {
        console.error("Error during registration:", error);
        next(error)
        // res.status(500).json({ message: "An error occurred during registration.", error: error.message });
    }
};

// login logic


const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const userExist = await User.findOne({ email });
        console.log('userExist: ', userExist);

        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }
        // const user = await bcrypt.compare(password, userExist.password);

        const user = await userExist.comparePassword(password);

        if (user) {
            res.status(200).json({
                msg: "Login Succesfull",
                token: await userExist.genrateToken(),
                userId: userExist._id.toString()
            });
        } else {
            res.status(401).json({ message: "Invalid email or passowrd" })
        }

    }
    catch (error) {
        console.error("Error during Login:", error);
        // res.status(500).json({ message: "An error occurred during Login.", error: error.message });
        next(error)
    }
}




module.exports = { home, register, login };
