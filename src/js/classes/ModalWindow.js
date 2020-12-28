export class ModalWindow {
	constructor(id, options) {
		const DEFAULT_OPTIONS = {
			content: 'form',
			closeBtn: true,
			actionBtn: true,
			action: 'submit',
			aux_btn: false,
			buttonNamePl: 'Wyślij',
			buttonNameEn: 'Submit',
			_path: '',
			description: [],
			formIsHidden: false
		};
		this.id = id;
		this.options = Object.assign({}, DEFAULT_OPTIONS, options);
		this.content = this.options.content;
		this.closeBtn = this.options.closeBtn;
		this.actionBtn = this.options.actionBtn;
		this.action = this.options.action;
		this.aux_btn = this.options.aux_btn;
		this.btnNamePl = this.options.buttonNamePl;
		this.btnNameEn = this.options.buttonNameEn;
		this.path = this.options._path;
		this.description = this.options.description;
		this.formIsHidden = this.options.formIsHidden;
		this.language = window.localStorage.getItem('language');

		this.generateHTMLTags();

		if (this.content == 'form' || this.content == 'gdpr') {
			this.loadData(this.generateContent);
		}
		if (this.content == 'description') {
			this.loadDescription();
			this.loadData(this.generateContent);
		}
		if (this.actionBtn) {
			this.action_btn();
		}
	}

	generateContent(response, language, formClassName, isHidden, aux_btn) {
		let grip = document.getElementsByTagName('body')[0];
		const MODAL_CONTENT = document.createElement('div');
		MODAL_CONTENT.classList.add('content-container');
		formClassName !== '' ? MODAL_CONTENT.classList.add(formClassName) : { return: 0 };
		MODAL_CONTENT.innerHTML = response[language];
		grip.lastChild.children[0].lastChild.appendChild(MODAL_CONTENT);
		let elem = document.getElementsByClassName('content-container form')[0];
		let auxiliary_btn = document.getElementsByClassName('auxiliary_btn')[0];
		isHidden ? (elem.style.height = '0%') : { return: 1 };
		aux_btn ? (auxiliary_btn.style.display = 'relative') : (auxiliary_btn.style.display = 'none');
	}
	generateHTMLTags() {
		let grip = document.getElementsByTagName('body');
		const MODAL_ARTICLE = document.createElement('article');
		MODAL_ARTICLE.id = 'modal_' + this.id;
		grip[0].appendChild(MODAL_ARTICLE);

		const MODAL_CONTAINER = document.createElement('div');
		MODAL_CONTAINER.classList.add('modal');
		MODAL_CONTAINER.classList.add(this.id);
		grip[0].lastChild.appendChild(MODAL_CONTAINER);

		const MODAL_BACKDROP = document.createElement('div');
		MODAL_BACKDROP.classList.add('modal_backdrop');
		MODAL_BACKDROP.classList.add(this.id);
		grip[0].lastChild.children[0].appendChild(MODAL_BACKDROP);

		const MODAL_BODY = document.createElement('div');
		MODAL_BODY.classList.add('modal_body');
		MODAL_BODY.classList.add(this.id);
		grip[0].lastChild.children[0].appendChild(MODAL_BODY);

		if (this.actionBtn) {
			const ACTION_BTN = document.createElement('button');
			ACTION_BTN.classList.add('action_btn');
			ACTION_BTN.classList.add(this.id);
			ACTION_BTN.appendChild(
				document.createTextNode(this.language == 'polish' ? this.btnNamePl : this.btnNameEn)
			);
			grip[0].lastChild.children[0].lastChild.appendChild(ACTION_BTN);
		}

		if (this.closeBtn) {
			const CLOSE_BTN = document.createElement('button');
			CLOSE_BTN.classList.add('modal_close');
			CLOSE_BTN.classList.add(this.id);
			grip[0].lastChild.children[0].lastChild.appendChild(CLOSE_BTN);
			CLOSE_BTN.onclick = () => MODAL_ARTICLE.remove();
		}
	}
	action_btn() {
		const ACTION_BTN = document.getElementsByClassName('action_btn');
		const AUX_BTN = document.getElementsByClassName('modal')[0].nodeList;
		console.log(AUX_BTN);

		const ACTION = () => {
			switch (this.action) {
				case 'submit':
					break;
				case 'accept':
					document.getElementById('modal_' + this.id).remove();
					document.getElementById('bar_gdpr').classList.remove('bar_gdpr--active');
					setTimeout(() => {
						document.getElementById('bar_gdpr').remove();
					}, 1000);
					window.localStorage.setItem('gdpr', 'confirmed');
					break;

				case 'contact':
					let elem = document.getElementsByClassName('content-container form')[0];
					elem.style.height == '110%' ? (elem.style.height = '0%') : (elem.style.height = '110%');
					break;

				default:
					void 0;
					break;
			}
		};
		ACTION_BTN[0].onclick = ACTION;
	}

	loadData(callback) {
		let xhr = new XMLHttpRequest();
		let isSubpage = document.getElementById('main_page') ? true : false;
		let _path = isSubpage ? '.' + this.path : '..' + this.path;
		let language = this.language;
		let formClassName = this.content == 'description' ? 'form' : '';
		let isHidden = this.formIsHidden;
		let aux_btn = this.aux_btn;
		xhr.open('GET', _path, true);
		xhr.onload = () => {
			if (xhr.status === 200) {
				let response = JSON.parse(xhr.responseText);
				return callback(response, language, formClassName, isHidden, aux_btn);
			}
		};
		xhr.send(null);
	}

	loadDescription() {
		let grip = document.getElementsByTagName('body');
		const MODAL_CONTENT = document.createElement('div');
		const MODAL_PRICE = document.createElement('div');
		MODAL_CONTENT.classList.add('content-container');
		MODAL_CONTENT.classList.add('description');
		MODAL_CONTENT.innerHTML = this.description[0];
		MODAL_PRICE.classList.add('price-container');
		MODAL_PRICE.innerHTML = this.description[1];

		grip[0].lastChild.children[0].lastChild.appendChild(MODAL_CONTENT);
		grip[0].lastChild.children[0].lastChild.appendChild(MODAL_PRICE);
	}
}
