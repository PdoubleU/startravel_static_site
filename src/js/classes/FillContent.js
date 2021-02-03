import { ModalWindow } from './ModalWindow.js';

export class FillContent {
	constructor(classNameSelector, options) {
		const DEFAULT_OPTIONS = {
			country: 'poland',
			_path: '../json/offer-pl.json',
			noOfAvailableOffers: 5 //should be same as no of offers generated in silder!!
		};
		this.options = Object.assign({}, DEFAULT_OPTIONS, options);
		this.selector = classNameSelector;
		this.country = this.options.country;
		this.path = this.options._path;
		this.data = null;
		this.noOfElementsToGenerate = this.options.noOfAvailableOffers;

		this.loadData(this.generateHTMLTags, this.loadModalWindow);
	}
	generateHTMLTags(counter, objJSON, selector, country, loadModal) {
		for (let i = 0; i < counter; i++) {
			let title = objJSON[country][i].title,
				content = objJSON[country][i].content,
				price = objJSON[country][i].price,
				frameCont = objJSON[country][i].frame_description,
				frameImg = objJSON[country][i].frame_img,
				grip = document.querySelector(selector);

			const CONTENT_CONTAINER = document.createElement('article'),
				SPAN = document.createElement('span');
			SPAN.classList = 'generatedElem_span';
			CONTENT_CONTAINER.classList = 'generatedElem';
			CONTENT_CONTAINER.id = title.toLowerCase();
			CONTENT_CONTAINER.appendChild(SPAN);
			grip.appendChild(CONTENT_CONTAINER);

			const CONTENT_TITLE = document.createElement('h4');
			CONTENT_TITLE.classList.add('generatedElem_span--title');
			CONTENT_TITLE.innerHTML = title;
			grip.children[i].children[0].appendChild(CONTENT_TITLE);

			const INNER_FRAME = document.createElement('div'),
				INNER_IMG = document.createElement('img'),
				INNER_CONT = document.createElement('p');
			INNER_FRAME.classList.add('generatedInnerFrame');
			INNER_IMG.classList.add('generatedInnerFrame_img');
			INNER_CONT.classList.add('generatedInnerFrame_content');
			INNER_IMG.src = frameImg;
			INNER_CONT.innerHTML = frameCont;
			INNER_FRAME.appendChild(INNER_IMG);
			INNER_FRAME.appendChild(INNER_CONT);
			grip.children[i].children[0].appendChild(INNER_FRAME);

			const CONTENT_TEXT = document.createElement('button');
			CONTENT_TEXT.classList.add('generatedElem_span--button');
			window.localStorage.getItem('language') == 'polish'
				? (CONTENT_TEXT.innerHTML = 'Sprawdź szczegóły')
				: (CONTENT_TEXT.innerHTML = 'Read more');
			grip.children[i].children[0].appendChild(CONTENT_TEXT);

			let DESCRIPTION_BTN = document.querySelectorAll('.generatedElem_span--button');
			DESCRIPTION_BTN[i].onclick = () => loadModal(content, price);
		}
	}

	loadModalWindow(content, price) {
		new ModalWindow('description', {
			content: 'description',
			isActionBtn: true,
			description: [ content, price ],
			buttonNamePl: 'Zarezerwuj!',
			buttonNameEn: 'Book!',
			action: 'contact',
			isAuxBtn: true,
			_path: '/json/form_content.json',
			formIsHidden: true
		});
	}

	loadData(callback, loadModal) {
		let xhr = new XMLHttpRequest(),
			_path = this.path,
			selector = this.selector,
			country = this.country,
			noOfElements = this.noOfElementsToGenerate;
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
