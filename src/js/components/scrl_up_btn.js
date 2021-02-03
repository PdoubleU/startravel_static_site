const GRIP = document.querySelector('main');
let isButtonActive = false;

export function scroll() {
	let scrollBtn = document.querySelector('.scroll_btn');
	if (isButtonActive == false) {
		return 0;
	}
	if (window.scrollY > 500) {
		scrollBtn.classList.add('scroll_btn--active');
	} else {
		scrollBtn.classList.remove('scroll_btn--active');
	}
	scrollBtn.onclick = () => {
		window.scrollTo({
			top: 0,
			left: 100,
			behavior: 'smooth'
		});
	};
}
export function createButton() {
	if (isButtonActive === true) {
		return;
	}
	if (window.innerWidth <= 780) {
		isButtonActive = true;
		let scrlBtn = document.createElement('button');
		let arrowTop = document.createElement('span');
		let arrowBot = document.createElement('span');
		let arrowClass = document.createElement('span');
		let arrowBox = document.createElement('span');
		arrowTop.className = 'arrowBox--top';
		arrowBot.className = 'arrowBox--bottom';
		arrowBox.className = 'arrowBox';
		scrlBtn.className = 'scroll_btn';
		scrlBtn.setAttribute('aria-label', 'Przewiń do góry');
		scrlBtn.setAttribute('tabindex', '0');
		scrlBtn.setAttribute('title', 'Przewiń do góry');
		arrowBox.appendChild(arrowTop);
		arrowBox.appendChild(arrowBot);
		scrlBtn.appendChild(arrowBox);
		GRIP.appendChild(scrlBtn);
	}
}

[ 'resize', 'load' ].forEach((event) => window.addEventListener(event, () => createButton()));
window.addEventListener('scroll', () => scroll());
