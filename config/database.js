import mongoose from 'mongoose';

const dbConnect  = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, 
            {
                dbName: 'Task_Manager'
            })
        console.log(`MongoDB database is connected: ${conn.connection.host}`.underline.red);
    } catch (error) {
        
    }
}

export default dbConnect;