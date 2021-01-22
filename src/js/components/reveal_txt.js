let elem = document.querySelectorAll('.text');

export const REVEAL_TXT = () => {
	for (let i = 0; i < elem.length; i++) {
		let timeout = Math.floor(Math.random() * 10);
		elem[i].children[0].classList.add('reveal', '_' + timeout);
	}
};

window.onload = REVEAL_TXT;
