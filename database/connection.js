const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://admin:admin@cluster0.rzpqx.mongodb.net/?retryWrites=true&w=majority',
    {useUnifiedTopology: true, useNewUrlParser: true,});
    console.log(`You are connected to: ${conn.connection.host}`);
};


module.exports = connectDB;