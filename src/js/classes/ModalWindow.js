export class ModalWindow {
	constructor(id, options) {
		const DEFAULT_OPTIONS = {
			content: 'form',
			isCloseBtn: true,
			isActionBtn: true,
			action: 'submit',
			isAuxBtn: false,
			buttonNamePl: 'Wyślij',
			buttonNameEn: 'Submit',
			_path: '',
			description: [],
			formIsHidden: false,
			messageType: true
		};
		this.id = id;
		this.options = Object.assign({}, DEFAULT_OPTIONS, options);
		this.content = this.options.content;
		this.isCloseBtn = this.options.isCloseBtn;
		this.isActionBtn = this.options.isActionBtn;
		this.action = this.options.action;
		this.isAuxBtn = this.options.isAuxBtn;
		this.btnNamePl = this.options.buttonNamePl;
		this.btnNameEn = this.options.buttonNameEn;
		this.path = this.options._path;
		this.description = this.options.description;
		this.formIsHidden = this.options.formIsHidden;
		this.language = window.localStorage.getItem('language');
		this.bodySelector = document.querySelector('body');
		this.isSubpage = document.querySelector('#main_page');
		this.messageType = this.options.messageType;

		// generates frame of modal window and after that other methods puts correct content into
		this.generateHTMLTags();
		// this auxiliary functions takes as argument this.content value and accordingly executes set of methods to render appropriate content
		this.executeSetFormAndGdpr(this.content);
		this.executeSetDescription(this.content);
		this.executeSetSubmitConfirm(this.content);
	}

	// set of three auxiliary methods
	executeSetFormAndGdpr(condition) {
		if (condition == 'form' || condition == 'gdpr') {
			this.loadData(this.generateContent);
		}
	}
	executeSetDescription(condition) {
		if (condition == 'description') {
			this.loadDescription();
			this.loadData(this.generateContent);
		}
	}
	executeSetSubmitConfirm(condition) {
		if (condition == 'confirmation') {
			this.loadSubmitConfirmation();
		}
	}

	// below method is responsible for create all content inside modal window - effects depend on provided parameters
	generateContent(response, language, isHidden, isAuxBtn, bodySel) {
		let modalCont = document.querySelector('.modalContainer');
		modalCont.innerHTML = response[language];
		bodySel.lastChild.children[0].lastChild.appendChild(modalCont);

		let elem = document.querySelector('#form'),
			auxBtn = document.querySelector('.modalContainer--auxBtn');

		isHidden ? (elem.style.height = '0%') : { return: 1 };
		isAuxBtn ? (auxBtn.style.display = 'relative') : (auxBtn.style.display = 'none');

		auxBtn.onclick = (e) => {
			let elem = e.target;
			elem.parentNode.style.height == '110%'
				? (elem.parentNode.style.height = '0%')
				: (elem.parentNode.style.height = '110%');
		};
	}
	// below method creates frame of modal window and action button which is responsible for further actions with modal window
	generateHTMLTags() {
		const MODAL_SECTION = document.createElement('article');
		MODAL_SECTION.id = 'modal_' + this.id;
		this.bodySelector.appendChild(MODAL_SECTION);
		const MODAL_CONTAINER = document.createElement('div');
		MODAL_CONTAINER.classList.add('modal');
		MODAL_CONTAINER.classList.add(this.id);
		this.bodySelector.lastChild.appendChild(MODAL_CONTAINER);
		const MODAL_BACKDROP = document.createElement('div');
		MODAL_BACKDROP.classList.add('modal_backdrop');
		MODAL_BACKDROP.classList.add(this.id);
		this.bodySelector.lastChild.children[0].appendChild(MODAL_BACKDROP);
		const MODAL_BODY = document.createElement('div');
		MODAL_BODY.classList.add('modal_body');
		MODAL_BODY.classList.add(this.id);
		this.bodySelector.lastChild.children[0].appendChild(MODAL_BODY);
		const MODAL_CONTENT = document.createElement('div');
		MODAL_CONTENT.classList.add('modalContainer');
		if (this.content == 'description') {
			MODAL_CONTENT.id = 'form';
		} else if (this.content == 'confirmation') {
			MODAL_CONTENT.id = 'confirmation';
		} else {
			MODAL_CONTENT.id = '';
		}
		this.bodySelector.lastChild.children[0].lastChild.appendChild(MODAL_CONTENT);
		if (this.isActionBtn) {
			const ACTION_BTN = document.createElement('button');
			ACTION_BTN.classList.add('modal_body--actionBtn');
			ACTION_BTN.classList.add(this.id);
			ACTION_BTN.id = this.id == 'description' ? 'open-form' : '';
			ACTION_BTN.appendChild(
				document.createTextNode(this.language == 'polish' ? this.btnNamePl : this.btnNameEn)
			);
			this.bodySelector.lastChild.children[0].lastChild.appendChild(ACTION_BTN);
			ACTION_BTN.addEventListener('click', this.actionBtn.bind(this));
		}
		if (this.isCloseBtn) {
			const CLOSE_BTN = document.createElement('button');
			CLOSE_BTN.classList.add('modal_body--close');
			CLOSE_BTN.classList.add(this.id);
			this.bodySelector.lastChild.children[0].lastChild.appendChild(CLOSE_BTN);
			CLOSE_BTN.addEventListener('click', () => MODAL_SECTION.remove());
		}
	}

	// this method is called when tapping action button - switch statement filter choosen action for button
	actionBtn() {
		switch (this.action) {
			case 'accept':
				document.querySelector('#modal_' + this.id).remove();
				document.querySelector('#bar_gdpr').classList.remove('bar--active');
				setTimeout(() => {
					document.querySelector('#bar_gdpr').remove();
				}, 1000);
				window.localStorage.setItem('gdpr', 'confirmed');
				break;
			case 'contact':
				let elem = document.querySelector('#form');
				elem.style.height == '110%' ? (elem.style.height = '0%') : (elem.style.height = '110%');
				break;
			default:
				void 0;
				break;
		}
	}
	// this method fetches json file with particular response from choosen path and takes callback function which is responsible for creating modal window's content based on fetched data
	loadData(callback) {
		let xhr = new XMLHttpRequest(),
			_path = this.isSubpage == null ? '..' + this.path : '.' + this.path,
			language = this.language,
			isHidden = this.formIsHidden,
			isAuxBtn = this.isAuxBtn,
			bodySel = this.bodySelector;
		xhr.open('GET', _path, true);
		xhr.onload = () => {
			if (xhr.status === 200) {
				let response = JSON.parse(xhr.responseText);
				return callback(response, language, isHidden, isAuxBtn, bodySel);
			}
		};
		xhr.send(null);
	}
	// this one is executed only if option called contet is set to 'description' and put inside modal window's frame price details and info about product
	loadDescription() {
		const MODAL_CONTENT = document.createElement('div'),
			MODAL_PRICE = document.createElement('div');
		MODAL_CONTENT.classList.add('modalContainer');
		MODAL_CONTENT.id = 'description';
		MODAL_CONTENT.innerHTML = this.description[0];
		MODAL_PRICE.classList.add('modal_body--priceContainer');
		MODAL_PRICE.innerHTML = this.description[1];

		this.bodySelector.lastChild.children[0].lastChild.appendChild(MODAL_CONTENT);
		this.bodySelector.lastChild.children[0].lastChild.appendChild(MODAL_PRICE);
	}
	loadSubmitConfirmation() {
		let selected = document.querySelector('#confirmation');
		let name = this.description[0];
		let successMsg =
			this.language == 'polish'
				? `${name}, <br/> formularz został wysłany. <br/><br/>
                Skontaktujemy się z tobą  w ciągu 24 godzin. <br/><br/>
                Dziękujęmy!`
				: `${name}, <br/> form has been sent.<br/><br/>
                We will contact you within 24h. <br/><br/>
                Thank You!`;
		let failMsg =
			this.language == 'polish'
				? `${name}, <br/> coś poszło nie tak. <br/><br/>
                Spróbuj ponownie lub napisz bezpośrednio na nasz adres email: <br/>
                info@starcab.wroclaw.pl`
				: `${name}, <br/> something went wrong. <br/><br/>
                Please, try again later or email us directly: <br/>
                info@starcab.wroclaw.pl`;

		selected.innerHTML = this.messageType == true ? successMsg : failMsg;
	}
}
