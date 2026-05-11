import mongoose from 'mongoose';
 
const connectdb= async ()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log('connected to database')
        })
        await mongoose.connect(`${process.env.MONGODB_URI}/quickblog`)
    } catch (error) {
        console.log(error.message);
        
    }
}

export default connectdb;