module.exports = function () {
	var div = document.createElement('div');
	var p1 = document.createElement('p');
	var p2 = document.createElement('p');
	var h1 = document.createElement('h1');
	var img1 = document.createElement('img');
	var img2 = document.createElement('img');

	h1.className = 'pure-button';
	h1.innerHTML = 'Hello world!';

	img1.src = require("./img/bigpicture.jpg");
	img1.width = 300;

	img2.src = require("./img/signature.png");
	img2.width = 200;

	div.appendChild(h1);
	div.appendChild(p1);
	div.appendChild(img1);
	div.appendChild(p2);
	div.appendChild(img2);

	div.className = 'diffie';

	return div;
};