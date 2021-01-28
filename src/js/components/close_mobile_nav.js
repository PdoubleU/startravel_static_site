let checkbox = document.querySelector('#menu-open');
let trigger = document.querySelectorAll('.topNav_items_btn--mobile');

export default [ ...trigger ].forEach((element) => {
	element.addEventListener('click', () => (checkbox.checked = false));
});
