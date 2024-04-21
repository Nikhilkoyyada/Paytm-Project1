// backend/db.js
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://kngnikhil8:P6rMNcsDaGaqqDYW@nikhil.4j7y72d.mongodb.net/?retryWrites=true&w=majority&appName=Nikhil").then(()=>{
    console.log("connected to mongo")
}).catch((err)=>{
    console.log(err)
})

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
     
    },
    firstName: {
        type: String,
        required: true,
        
    },
    lastName: {
        type: String,
        required: true,
       
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account
};