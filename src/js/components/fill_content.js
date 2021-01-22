import { FillContent } from '../classes/FillContent.js';
//if statement below checks if user is on the main page or subpage:
if (document.getElementById('sub_page') == undefined) {
	void 0;
} else {
	let element = document.querySelector('.container-middle');
	switch (element.id) {
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
