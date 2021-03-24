import * as auxProcedures from './auxiliary_procedures_submit.js';

export default (function getAllButtons() {
	let object = document.getElementById('sub_page');

	object.addEventListener('click', (e) => {
		if (e.target.id == 'post-data-btn') {
			e.preventDefault();

			let formNodes = document.getElementById('form_section').childNodes;
			let inputs = new Array();

			for (let value of formNodes.values()) {
				if ((value.nodeName === 'INPUT' || value.nodeName === 'TEXTAREA') && value.type !== 'submit') {
					inputs.push([ value.id, value.value.stripHTML() ]);
				}
			}
			console.log(inputs);
		}
	});
})();
