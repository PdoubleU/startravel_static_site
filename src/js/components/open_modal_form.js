import { ModalWindow } from '../classes/ModalWindow.js';

const OPEN_MODAL = document.querySelectorAll('#open-form');

export default OPEN_MODAL.forEach((e) =>
	e.addEventListener('click', () => {
		new ModalWindow('form', {
			isActionBtn: false,
			_path: '/json/form_content.json'
		});
	})
);
