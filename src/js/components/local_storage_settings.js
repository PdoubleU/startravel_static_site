export function checkStorage() {
	if (window.localStorage.getItem('gdpr') && window.localStorage.getItem('language')) {
		return 0;
	} else {
		window.localStorage.setItem('gdpr', 'unconfirmed');
		window.localStorage.setItem('language', 'polish');
	}
}

window.addEventListener('load', () => checkStorage());
