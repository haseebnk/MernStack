
const User = require('../modals/user-model')
const bcrypt = require('bcryptjs')

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome best haseeb 1111");
    } catch (error) {
        console.log(error);

    }
};

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "email already exists" });
        }

        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password, saltRound);

        const userCreated = await User.create({ username, email, phone, password: hashedPassword });


        res.status(200).json({ msg: userCreated });
    } catch (error) {
        console.error("Error during registration:", error); 
        res.status(500).json({ message: "An error occurred during registration.", error: error.message });
    }
};




module.exports = { home, register };
