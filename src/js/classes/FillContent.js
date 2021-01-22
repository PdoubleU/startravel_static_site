import { ModalWindow } from './ModalWindow.js';

export class FillContent {
	constructor(classNameSelector, options) {
		const DEFAULT_OPTIONS = {
			country: 'poland',
			_path: '../json/offer-pl.json',
			elementsToGenerate: 5
		};
		this.options = Object.assign({}, DEFAULT_OPTIONS, options);
		this.selector = classNameSelector;
		this.country = this.options.country;
		this.path = this.options._path;
		this.data = null;
		this.noOfElementsToGenerate = this.options.elementsToGenerate;

		this.loadData(this.generateHTMLTags, this.loadModalWindow);
	}
	generateHTMLTags(counter, objJSON, selector, country, loadModal) {
		for (let i = 0; i < counter; i++) {
			let title = objJSON[country][i].title;
			let content = objJSON[country][i].content;
			let price = objJSON[country][i].price;
			let frameCont = objJSON[country][i].frame_description;
			let frameImg = objJSON[country][i].frame_img;
			let grip = document.querySelector(selector);

			const CONTENT_CONTAINER = document.createElement('article');
			const SPAN = document.createElement('span');
			CONTENT_CONTAINER.classList = 'element';
			CONTENT_CONTAINER.id = title.toLowerCase();
			CONTENT_CONTAINER.appendChild(SPAN);
			grip.appendChild(CONTENT_CONTAINER);

			const CONTENT_TITLE = document.createElement('h4');
			CONTENT_TITLE.classList.add('title');
			CONTENT_TITLE.innerHTML = title;
			grip.children[i].children[0].appendChild(CONTENT_TITLE);

			const INNER_FRAME = document.createElement('div');
			const INNER_IMG = document.createElement('img');
			const INNER_CONT = document.createElement('p');
			INNER_FRAME.classList.add('frame');
			INNER_IMG.classList.add('frame_image');
			INNER_CONT.classList.add('frame_content');
			INNER_IMG.src = frameImg;
			INNER_CONT.innerHTML = frameCont;
			INNER_FRAME.appendChild(INNER_IMG);
			INNER_FRAME.appendChild(INNER_CONT);
			grip.children[i].children[0].appendChild(INNER_FRAME);

			const CONTENT_TEXT = document.createElement('button');
			CONTENT_TEXT.classList.add('description_show');
			window.localStorage.getItem('language') == 'polish'
				? (CONTENT_TEXT.innerHTML = 'Sprawdź szczegóły')
				: (CONTENT_TEXT.innerHTML = 'Read more');
			grip.children[i].children[0].appendChild(CONTENT_TEXT);

			let DESCRIPTION_BTN = document.querySelectorAll('.description_show');
			DESCRIPTION_BTN[i].onclick = () => loadModal(content, price);
		}
	}

	loadModalWindow(content, price) {
		new ModalWindow('description', {
			content: 'description',
			actionBtn: true,
			description: [ content, price ],
			buttonNamePl: 'Zarezerwuj!',
			buttonNameEn: 'Book!',
			action: 'contact',
			aux_btn: true,
			_path: '/json/form_content.json',
			formIsHidden: true
		});
	}

	loadData(callback, loadModal) {
		let xhr = new XMLHttpRequest();
		let _path = this.path;
		let selector = this.selector;
		let country = this.country;
		let noOfElements = this.noOfElementsToGenerate;
		xhr.open('GET', _path, true);
		xhr.onload = () => {
			if (xhr.status === 200) {
				let response = JSON.parse(xhr.responseText);
				callback(noOfElements, response, selector, country, loadModal);
			}
		};
		xhr.send(null);
	}
}
