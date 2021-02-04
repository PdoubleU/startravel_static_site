import { SCROLL, CREATE_BUTTON } from './components/scrl_up_btn.js';
import * as closeMobileNav from './components/close_mobile_nav';
import { OPEN_MODAL } from './components/open_modal_form.js';
import * as barFunctions from './components/bar_gdpr.js';
import * as checkStorage from './components/local_storage_settings.js';
import * as reveal from './components/reveal_txt.js';
import * as fillContent from './components/fill_content.js';
import { Slider } from './classes/Slider.js';

// this statement checks if user is currently in the main page and then call instance of Slider, which appears only on the main page:
if (document.querySelector('#main_page') !== null) {
	let MAIN_SLIDER = new Slider('#slider');
}

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

window.addEventListener('wheel', () => console.log(document.scrollY));
