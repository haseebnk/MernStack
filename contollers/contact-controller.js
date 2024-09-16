const Contact = require('../modals/contact-model')

const contactForm = async (req, res, next) => {
    try {
        const response = req.body;
        await Contact.create(response)
        return res.status(200).json({ message: "message send successfully" })
    } catch (error) {
        // next(error)
        return res.status(500).json({ message: "message not delivered" })

    }
}

module.exports = contactForm;