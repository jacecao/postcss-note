import _ from 'lodash';
import './index.css';
import print from './print.js';

function component () {
	// var ele = document.createDocumentFrangement();
	var ele = document.createElement('div');
	var btn = document.createElement('button');

	ele.innerHTML = _.join(['hello', 'webpack'], '');
	ele.classList.add('test');

	btn.innerHTML = 'click me show console';
	btn.onclick = print;

	ele.appendChild(btn);

	return ele;
}

// console.log(data.version);

document.body.appendChild(component());