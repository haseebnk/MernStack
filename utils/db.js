const mongoose = require('mongoose')



// const URI = "mongodb+srv://jackcasidy00:Kaaambaaa123...@cluster0.x070k3g.mongodb.net/?appName=Cluster0"
const URI = "mongodb+srv://jackcasidy00:Kaaambaaa123...@cluster0.x070k3g.mongodb.net/mernstack?retryWrites=true&w=majority";


const connectDb = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connection Successfull to DB");

    } catch (error) {
        console.log("database connection failed");
        process.exit(0)
    }
}


module.exports = connectDb