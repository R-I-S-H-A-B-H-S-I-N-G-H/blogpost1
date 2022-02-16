const express = require('express');
const blogs = require('./routes/blogs');
const app = express();
const database = require('./models/firebase');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(__dirname + '/public/css', express.static('public/css'));
const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`listing at port ${port}`);
});

async function getBlogsData() {
	try {
		var rawData = await (await database.get()).docs;
		var data = [];
		rawData.map((ele) => {
			var temData = {
				Title: ele._fieldsProto.Title.stringValue,
				Description: ele._fieldsProto.Description.stringValue,
				created: new Date(ele._createTime._seconds),
			};
			data.push(temData);
		});
		console.log(rawData[0]);
		return [data, undefined];
	} catch (err) {
		return [undefined, err];
	}
}

app.get('/', async (req, res) => {
	const data = await getBlogsData();
	if (data[0] === undefined) {
		res.redirect('/');
	}
	res.render('home', { data: data[0] });
});
app.use('/blogs', blogs);
