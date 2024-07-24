const mongoose = require('mongoose')

// Connect to MongoDB
mongoose
	.connect('mongodb://127.0.0.1:27017/baseball', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((err) => {
		console.error('Failed to connect to MongoDB', err)
	})

// Schema and Model
const playerSchema = new mongoose.Schema({
	name: String,
	hits: Number,
	throws: String,
	rank: Number,
	id: Number,
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player