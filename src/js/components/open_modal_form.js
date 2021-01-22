import { ModalWindow } from '../classes/ModalWindow.js';

const OPEN_MODAL = document.querySelector('.open-form');

export default (OPEN_MODAL.onclick = () => {
	new ModalWindow('form', {
		isActionBtn: false,
		_path: '/json/form_content.json'
	});
});
