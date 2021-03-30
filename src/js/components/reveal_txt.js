const ELEM = document.querySelectorAll('.text');

export function addClassReveal() {
	for (let i = 0; i < ELEM.length; i++) {
		let timeout = Math.floor(Math.random() * 10);
		ELEM[i].children[0].classList.add('reveal', '_' + timeout);
	}
}

window.addEventListener('load', () => addClassReveal());
