import { FillContent } from '../classes/FillContent.js';
//if statement below checks if user is on the main page or subpage:
if (document.querySelector('.mainSubpage') == undefined) {
	void 0;
} else {
	let element = document.querySelector('.contMiddle--sub');
	switch (element.id) {
		case 'content-de':
			new FillContent(`#${element.id}`, {
				country: 'germany',
				_path: '../json/offer-pl.json',
				noOfAvailableOffers: 6
			});
			break;

		case 'content-pl':
			new FillContent(`#${element.id}`, {
				country: 'poland',
				_path: '../json/offer-pl.json',
				noOfAvailableOffers: 8
			});
			break;

		case 'content-cz':
			new FillContent(`#${element.id}`, {
				country: 'czechia',
				_path: '../json/offer-pl.json',
				noOfAvailableOffers: 6
			});
			break;
		default:
			break;
	}
}
