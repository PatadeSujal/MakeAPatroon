   import mongoose from 'mongoose';

const connectToDb = async () =>{
    try {
        // await mongoose.connect("mongodb://localhost:27017/patroonUserDB");
        await mongoose.connect("mongodb://localhost:27017/patroonUserDB");
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
export default connectToDb;