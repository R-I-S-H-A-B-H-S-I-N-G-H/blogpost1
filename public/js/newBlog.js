
var titleval = document.querySelector('.titleInput');
var form = document.querySelector('form');
var errorTitle = document.querySelector('#errortitle');
var submitbutton = document.querySelector('.createNewblog');
titleval.addEventListener('input', async (e) => {
	// console.log(e.target.value);
	var res = await validate();
	console.log(e.target.value, res);
});

async function getData(val) {
	await fetch(`/blogs/list/${val}`).then((t) => {
		t.json().then((result) => {
			console.log(result);
			return result;
		});
	});
}

async function submitform() {
	var validatedres = await validate();
	if (validatedres) {
		console.log('can submit');
		form.submit();
	} else {
		console.log('cannot submit');
	}
}
async function validate() {
	const data = titleval.value;
	if (data.length == 0) {
		console.log('length is 0');
		errorTitle.textContent = 'title cant be empty';
		errorTitle.style.color = 'red';
		return false;
	}
	const result_raw = await fetch(`/blogs/list/${data}`);
	var res = await result_raw.json();
	if (!res) {
		errorTitle.textContent = 'already exists';
		errorTitle.style.color = 'red';
		return false;
	}
	errorTitle.textContent = '';
	return true;
}