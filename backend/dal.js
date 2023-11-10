const { mongoose, Schema, Collection } = require("mongoose");
var mongodb = require("mongodb");
var ObjectID = require('mongodb').ObjectID;

const connectionString = "mongodb+srv://dev:Testing123@capstone.xoqg4jk.mongodb.net/BarnManager";
const horseCollection = "Horses"
const userCollection = "Users"

mongoose.connect(connectionString, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", () => {
	console.log("mongoose connected");
});

const horse = new Schema ({
    Name: String,
    Age: Number,
    Breed: String,
    Owner: String,
    FeedType: [String],
    Supplements: [String],
    HasShoes: Boolean,
    FarrierAppointment: String,
    ForSale: Boolean
}, {collection: horseCollection})

const horseModel = mongoose.model("horse", horse)

const user = new Schema ({
    Email: String,
    Key: String,
    Name: String,
    role: String
}, {collection: userCollection })

const userModel = mongoose.model("user", user)

exports.dal = {
    createHorse: (name, age, breed, owner, feed, supplements, shoes, farrier, forSale) =>{
        let newHorse = {
            Name: name,
            Age: age,
            Breed: breed,
            Owner: owner,
            FeedType: feed,
            Supplements: supplements,
            HasShoes: shoes,
            FarrierAppointment: farrier,
            ForSale: forSale
        }
        horseModel.collection.insertOne(newHorse)
        console.log(name+ " added")
    },
    del: (id) =>{
        if (horseModel.find({_id: new mongodb.ObjectId(id)}).exec() != null) {
            horseModel.collection.deleteOne({_id: new mongodb.ObjectId(id)})
            console.log(id.toString()+ ' deleted')
        }else{
            return ""
        }
    },
    update: (id, name, age, breed, owner, feed, supplements, shoes, farrier, forSale) =>{
        let values = {}
        if(name){
            values['Name'] = name
        }
        if(age){
            values['Age'] = age
        }
        if(breed){
            values['Breed'] = breed
        }
        if(owner){
            values['Owner'] = owner
        }
        if(feed){
            values['FeedType'] = feed
        }
        if(supplements){
            values['Supplements'] = supplements
        }
        if(shoes){
            values['HasShoes'] = shoes
        }
        if(farrier){
            values['FarrierAppointment'] = farrier
        }
        if(forSale){
            values['ForSale'] = forSale
        }
        horseModel.collection.updateOne({_id: new mongodb.ObjectId(id)}, {$set: values})
    },
    read: async () => {
        return await horseModel.find({}).exec()
    },
    findHorse: async (id) => {
        return await horseModel.find({_id: new mongodb.ObjectId(id)}).exec()
    },
    checkLogin:async (email)  =>{
        return userModel.findOne({Email: email}).exec()
    },
    addUser: (email, key, name, role) => {
        if(email, key) {
            let newUser = {
            Email: email,
            Key: key,
            Name: name,
            Role: role
        }
            userModel.collection.insertOne(newUser)
            console.log("user added")
        }else{
            return "Email can't be null"
        }       
        
    },
    listUsers: async () =>{
        return await userModel.find({}).exec()
    }
}