const mongoose = require('mongoose')

module.exports = connectDB = async(retries = 5, delay = 5000) => {
    while(retries > 0){
        try {
            await mongoose.connect(process.env.DB_CONNECTION_STRING)
            console.log(`Databse Connected!`)
            return;
        } catch (error) {
            console.error(`Database connection failure: Retries left: ${retries - 1}`);
            console.error(error.message)
            retries -= 1
            if(retries === 0){
                throw new Error('Failed to connect to the database after multiple attempts')
            }
    
            await new Promise((resolve) => setTimeout(resolve, delay))
        }
    }
}