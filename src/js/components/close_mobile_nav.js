let checkbox = document.querySelector('#menu-open');
let trigger = document.querySelectorAll('.top-nav__button--mobile');

export default [ ...trigger ].forEach((element) => {
	element.addEventListener('click', () => (checkbox.checked = false));
});
