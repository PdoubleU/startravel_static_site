import { ModalWindow } from '../classes/ModalWindow.js';

const OPEN_GDPR_BTN = document.querySelector('#gdpr_read'),
	ACCEPT_GDPR_BTN = document.querySelector('#gdpr_accept');

export function showGDPRbar() {
	document.querySelector('#bar_gdpr').classList.toggle('bar--active');
}

export function hideGDPRbar() {
	document.querySelector('#bar_gdpr').classList.toggle('bar--active');
	window.localStorage.setItem('gdpr', 'confirmed');
	setTimeout(() => {
		document.querySelector('#bar_gdpr').remove();
	}, 1000);
}

export function openGDPR() {
	new ModalWindow('gdpr_info', {
		content: 'gdpr',
		isCloseBtn: false,
		action: 'accept',
		buttonNamePl: 'Akceptuję wszystko',
		buttonNameEn: 'Accept all',
		_path: '/json/gdpr_content.json'
	});
}

window.addEventListener('load', () => {
	if (window.localStorage.getItem('gdpr') === 'unconfirmed') {
		setTimeout(showGDPRbar(), 3000);
	} else {
		document.querySelector('#bar_gdpr').remove();
	}
});
OPEN_GDPR_BTN.addEventListener('click', () => openGDPR());
ACCEPT_GDPR_BTN.addEventListener('click', () => hideGDPRbar());
