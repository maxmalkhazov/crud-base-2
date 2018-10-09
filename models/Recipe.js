const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema

const RecipeSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	ingredients: {
		type: String,
		required: true
	},
	instructions: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('recipes', RecipeSchema);