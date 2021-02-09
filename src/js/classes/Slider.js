export class Slider {
	constructor(elemSelector, opts) {
		const DEFAULT_OPTS = {
			pauseTime: 8000,
			generatePrevNext: true,
			noOfAvailableOffers: 5 //should be same as offers generated on subpages!!
		};
		this.options = Object.assign({}, DEFAULT_OPTS, opts);
		this.sliderSelector = elemSelector;
		this.currentSlide = 0;
		this.time = null;
		this.slider = null;
		this.slidesLng = this.options.noOfAvailableOffers;
		this.slides = null;
		this.language = window.localStorage.getItem('language');

		this.prev = null;
		this.next = null;

		this.loadData(this.generateListOfSlides);
		this.generateSlider();
		this.changeSlide(this.currentSlide);
	}

	loadData(callback) {
		let xhr = new XMLHttpRequest(),
			_path = this.language == 'polish' ? './json/offer-pl.json' : './json/offer-en.json',
			sliderSel = this.sliderSelector,
			listLenght = this.slidesLng;
		// temporary last parameter set to false (synchronous request) - otherwise the changeSlide() is messing around this class
		// will be rafactor later:
		xhr.open('GET', _path, false);
		xhr.onload = () => {
			if (xhr.status === 200) {
				let response = JSON.parse(xhr.responseText);
				return callback(response, sliderSel, listLenght);
			}
		};
		xhr.send(null);
	}

	generateListOfSlides(objJSON, sliderSel, listLenght) {
		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		let country = [ 'poland', 'germany', 'czechia' ],
			grip = document.querySelector(sliderSel);
		for (let i = 0; i < listLenght; i++) {
			let randomCountry = country[getRandomInt(0, 2)],
				title = objJSON[randomCountry][i].title,
				img_path =
					window.innerWidth > 820
						? objJSON[randomCountry][i].frame_img
						: objJSON[randomCountry][i].frame_img_mobile;
			const SLIDE_ARTCL = document.createElement('article');
			SLIDE_ARTCL.classList.add('sliderBox_cnt_slide');
			SLIDE_ARTCL.style.backgroundImage = `url(${img_path.replace('..', '.')})`;
			const SLIDE_CONT = document.createElement('a'),
				SPAN = document.createElement('span'),
				TXT_BKG = document.createElement('span');
			TXT_BKG.classList.add('txt');
			SLIDE_CONT.href = 'subpages/' + randomCountry + '.html';
			SLIDE_CONT.classList.add('sliderBox_cnt_slide--link');
			let name = document.createTextNode(title);
			TXT_BKG.appendChild(name);
			SPAN.appendChild(TXT_BKG);
			SLIDE_CONT.appendChild(SPAN);
			SLIDE_ARTCL.appendChild(SLIDE_CONT);
			grip.appendChild(SLIDE_ARTCL);
		}
	}

	generateSlider() {
		this.slider = document.querySelector(this.sliderSelector);
		this.slider.classList.add('sliderBox');
		const SLIDES_CNT = document.createElement('div');
		SLIDES_CNT.classList.add('sliderBox_cnt');
		this.slides = this.slider.children;
		while (this.slides.length) {
			SLIDES_CNT.appendChild(this.slides[0]);
		}
		this.slides = SLIDES_CNT.querySelectorAll('.sliderBox_cnt_slide');
		this.slider.appendChild(SLIDES_CNT);

		if (this.options.generatePrevNext) this.createPrevNext();
	}

	slidePrev() {
		this.currentSlide--;
		if (this.currentSlide < 0) {
			this.currentSlide = this.slides.length - 1;
		}
		this.changeSlide(this.currentSlide);
	}
	slideNext() {
		this.currentSlide++;
		if (this.currentSlide > this.slides.length - 1) {
			this.currentSlide = 0;
		}
		this.changeSlide(this.currentSlide);
	}

	changeSlide(i) {
		this.slides.forEach((slide) => {
			slide.classList.remove('active');
			slide.children[0].classList.remove('active');
			slide.setAttribute('aria-hidden', true);
		});

		this.slides[i].classList.add('active');
		this.slides[i].children[0].classList.add('active');
		this.slides[i].setAttribute('aria-hidden', false);

		this.currentSlide = i;

		if (this.options.pauseTime !== 0) {
			clearInterval(this.time);
			this.time = setTimeout(() => this.slideNext(), this.options.pauseTime);
		}
	}

	createPrevNext() {
		this.innerTop = document.createElement('div');
		this.innerBottom = document.createElement('div');
		this.innerTop.classList.add('arrowBox--top');
		this.innerBottom.classList.add('arrowBox--bottom');
		this.cpyTopOne = this.innerTop.cloneNode(true);
		this.cpyBottomOne = this.innerBottom.cloneNode(true);
		this.cpyTopTwo = this.innerTop.cloneNode(true);
		this.cpyBottomTwo = this.innerBottom.cloneNode(true);

		this.prev = document.createElement('button');
		this.prev.type = 'button';
		this.prev.classList.add('sliderBox_nav_button--prev', 'arrowBox');
		this.prev.appendChild(this.cpyTopTwo);
		this.prev.appendChild(this.cpyBottomTwo);
		this.prev.addEventListener('click', this.slidePrev.bind(this));

		this.next = document.createElement('button');
		this.next.type = 'button';
		this.next.classList.add('sliderBox_nav_button--next', 'arrowBox');
		this.next.appendChild(this.cpyTopOne);
		this.next.appendChild(this.cpyBottomOne);
		this.next.addEventListener('click', this.slideNext.bind(this));

		const NAV = document.createElement('div');
		NAV.classList.add('sliderBox_nav');
		NAV.setAttribute('aria-label', 'Slider buttons left and right');
		NAV.appendChild(this.prev);
		NAV.appendChild(this.next);
		this.slider.appendChild(NAV);
	}
}
