const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to mongoose
mongoose.connect('mongodb://localhost/recipes-dev', {
	useNewUrlParser: true
}).then(() => {
	console.log('MongoDB Connected!');
}).catch((err) => {
	console.log(err);
});

// Load Recipe Model
require('./models/Recipe');
const Recipe = mongoose.model('recipes');

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Index Route
app.get('/', (req, res) => {
	const title = 'Welcome!';
	res.render('index', {
		title
	});
});

// About Route
app.get('/about', (req, res) => {
	res.render('about');
});

// Add Recipe Form
app.get('/recipes/add', (req, res) => {
	res.render('recipes/add');
});

// Process Form
app.post('/recipes', (req, res) => {
	let errors = [];
	if (!req.body.title) {
		errors.push({text: 'Please add a title'});
	}

	if (!req.body.ingredients) {
		errors.push({text: 'Please add ingredients'})
	}

	if (!req.body.instructions) {
		errors.push({text: 'Please add instructions'})
	}

	if (errors.length > 0) {
		res.render('recipes/add', {
			errors,
			title: req.body.title,
			ingredients: req.body.ingredients,
			instructions: req.body.instructions
		});
	} else {
		const newUser = {
			title: req.body.title,
			ingredients: req.body.ingredients,
			instructions: req.body.instructions
		}
		new Recipe(newUser).save().then(recipe => {
			res.redirect('/recipes')
		});
	}
});

const port = 5000;

app.listen(port, () => {
	console.log(`App is running on port ${port}.`);
});

