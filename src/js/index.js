import { SCROLL, CREATE_BUTTON } from './components/scrl_up_btn.js';
import * as closeMobileNav from './components/close_mobile_nav';
import { OPEN_MODAL } from './components/open_modal_form.js';
import * as barFunctions from './components/bar_gdpr.js';
import * as checkStorage from './components/local_storage_settings.js';
import * as reveal from './components/reveal_txt.js';
import * as fillContent from './components/fill_content.js';
import * as submitForm from './components/submit_form.js';

// this statement checks if user is currently in the main page and then call instance of Slider and scroll horizontal alert, which appear only on the main page:
(async () => {
	if (document.querySelector('#main_page')) {
		await import('./classes/Slider.js').then((module) => module.slider);
		await import('./components/scroll_horiz_alert.js');
	}
})();
