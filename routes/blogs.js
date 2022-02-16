const express = require('express');
const router = express.Router();
router.use(express.static('public'));
router.use(__dirname + '/public/css', express.static('public/css'));
router.use(__dirname + '/public/js', express.static('public/js'));

const database = require('../models/firebase');

router.get('/', async (req, res) => {
	res.json('blogs page');
});

router
	.get('/new', (req, res) => {
		res.render('blogs/createNew');
	})
	.post('/new', async (req, res) => {
		database
			.add({
				Title: req.body.Title,
				Description: req.body.Description,
			})
			.then((res) => {
				console.log('id ', res.id);
			});
		res.redirect('/');
	});
router.get('/list/:title', async (req, res) => {
	var result = (await (await getData(req.params.title)).docs.length) == 0;

	res.status(200).json(result);
});

async function getData(title) {
	return await database.where('Title', '==', title).get();
}
router.get('/:title', async (req, res) => {
	// var rawData = (await database.where('Title', '==', req.params.title).get())
	// 	.docs;
	var rawData = await (await getData(req.params.title)).docs;

	console.log(rawData[0]._ref._path.segments[1]);
	res.json(rawData);
});
module.exports = router;
