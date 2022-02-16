var titleval = document.querySelector('.titleInput');
var form = document.querySelector('form');

async function getData(val) {
	await fetch(`/blogs/list/${val}`).then((t) => {
		t.json().then((result) => {
			console.log(result);
			return result;
		});
	});
}
async function validate() {
	var data = titleval.value;
	if (data.length == 0) {
		return false;
	}

	getData(data).then((res) => {
		console.log(res);
		return res;
	});
}
async function submitform() {
	const data = titleval.value;
	if (data.length == 0) {
		console.log('length is 0');
		return;
	}
	await fetch(`/blogs/list/${data}`).then((res) => {
		res.json().then((result) => {
			if (result) {
				console.log('can submit');
				form.submit();
			} else {
				console.log('cannot submt');
			}
		});
	});
}
