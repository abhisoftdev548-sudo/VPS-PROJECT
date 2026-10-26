import mongoose from 'mongoose';
import { ENV } from './env_config.js';

const connectDB = async () => {
    try{
        await mongoose.connect(ENV.MONGODB_URI);
        console.log('MongoDB connected successfully');
    }catch(error){
        console.log(error);
    }
}

export default connectDB;