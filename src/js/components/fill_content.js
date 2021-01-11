import { FillContent } from '../classes/FillContent.js';

let isDefined = document.getElementById('sub_page');

if (isDefined == undefined) {
	void 0;
} else {
	let element = document.getElementsByClassName('container-middle');
	switch (element[0].id) {
		case 'content-de':
			new FillContent('content-de', {
				country: 'germany',
				_path: '../json/offer-pl.json',
				elementsToGenerate: 5
			});
			break;

		case 'content-pl':
			new FillContent('content-pl', {
				country: 'poland',
				_path: '../json/offer-pl.json',
				elementsToGenerate: 5
			});
			break;

		case 'content-cz':
			new FillContent('content-cz', {
				country: 'czechia',
				_path: '../json/offer-pl.json',
				elementsToGenerate: 5
			});
			break;
		default:
			break;
	}
}
