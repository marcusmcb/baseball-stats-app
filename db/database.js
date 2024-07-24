const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

// connect to MongoDB
mongoose
	.connect(process.env.MONGO_DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((err) => {
		console.error('Failed to connect to MongoDB', err)
	})

// player schema for MongoDB collection
const playerSchema = new mongoose.Schema({
	name: String,
	hits: Number,
	throws: String,
	rank: Number,
	id: Number,
})

// define player model for use in server.js
const Player = mongoose.model('Player', playerSchema)

module.exports = Player