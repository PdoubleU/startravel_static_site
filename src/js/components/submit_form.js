import * as auxProcedures from './auxiliary_procedures_submit.js';
import { ModalWindow } from '../classes/ModalWindow.js';

export default (function getAllButtons() {
	let object = document.getElementsByTagName('body');

	object.item(0).addEventListener('click', (e) => {
		if (e.target.id == 'post-data-btn') {
			e.preventDefault();
			let formNodes = document.getElementById('form_section').childNodes;
			let path = './php/action_page.php';
			let name = null;
			let data = new FormData();
			for (let value of formNodes.values()) {
				if (
					(value.nodeName === 'INPUT' || value.nodeName === 'TEXTAREA') &&
					value.type !== 'submit' &&
					value.id !== 'confirm_email'
				) {
					data.append(value.id, value.value.stripHTML());
					if (value.id === 'fname') {
						name = value.value.stripHTML();
					}
				}
			}
			fetch(path, {
				method: 'post',
				body: data
			})
				.then((response) => {
					if (!response.ok) {
						formNodes.forEach((element) => {
							element.disabled = true;
						});
						new ModalWindow('submit_confirmation', {
							content: 'confirmation',
							isCloseBtn: true,
							isActionBtn: false,
							action: null,
							isAuxBtn: false,
							buttonNamePl: null,
							buttonNameEn: null,
							_path: '',
							description: [ name ],
							formIsHidden: false,
							messageType: true
						});
					} else {
						new ModalWindow('submit_confirmation', {
							content: 'confirmation',
							isCloseBtn: true,
							isActionBtn: false,
							action: null,
							isAuxBtn: false,
							buttonNamePl: null,
							buttonNameEn: null,
							_path: '',
							description: [ name ],
							formIsHidden: false,
							messageType: false
						});
					}
				})
				.catch((err) => console.log(err));
		}
	});
})();
