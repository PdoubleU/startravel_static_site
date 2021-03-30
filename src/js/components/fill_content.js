import { FillContent } from '../classes/FillContent.js';

const CONT_DE = 'content-de';
const CONT_PL = 'content-pl';
const CONT_CZ = 'content-cz';
//if statement below checks if user is on the main page or subpage:
if (!document.querySelector('.mainSubpage')) {
	void 0;
} else {
	let element = document.querySelector('.contMiddle--sub');
	switch (element.id) {
		case CONT_DE:
			new FillContent(`#${element.id}`, {
				country: 'germany',
				_path: '../json/offer-pl.json',
				noOfAvailableOffers: 6
			});
			break;

		case CONT_PL:
			new FillContent(`#${element.id}`, {
				country: 'poland',
				_path: '../json/offer-pl.json',
				noOfAvailableOffers: 8
			});
			break;

		case CONT_CZ:
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
