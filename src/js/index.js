import { SCROLL, CREATE_BUTTON } from './components/scrl_up_btn.js';
import * as closeMobileNav from './components/close_mobile_nav';
import { OPEN_MODAL } from './components/open_modal_form.js';
import * as barFunctions from './components/bar_gdpr.js';
import * as checkStorage from './components/local_storage_settings.js';
import * as reveal from './components/reveal_txt.js';
import * as fillContent from './components/fill_content.js';
import { Slider } from './classes/Slider.js';
import * as submitForm from './components/submit_form.js';

// this statement checks if user is currently in the main page and then call instance of Slider and scroll horizontal alert, which appear only on the main page:
(async () => {
	if (document.querySelector('#main_page') !== null) {
		new Slider('#slider');
		await import('./components/scroll_horiz_alert.js');
	}
})();

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}
