import mongoose from 'mongoose';

const dbConnect  = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, 
            {
                dbName: 'Task_Manager'
            })
    } catch (error) {
        
    }
}

export default dbConnect;