import { ModalWindow } from '../classes/ModalWindow.js';

const SIDE_BAR_VAL = document.getElementById('bar_gdpr').getAttribute('value');
const OPEN_GDPR_BTN = document.getElementById('gdpr_read');

export const SHOW_GDPR_BAR = () => {
  if(SIDE_BAR_VAL === 'unconfirmed') {
    document.getElementById('bar_gdpr').classList.toggle('bar_gdpr--active');
  }
};

export const OPEN_GDPR = () => {
  let GDPR_Info = new ModalWindow('gdpr_info',
                                  {
                                    button: false
                                  });
  GDPR_Info.button = false;
  console.log(GDPR_Info.button);
}

window.onload(setTimeout(SHOW_GDPR_BAR, 3000));
OPEN_GDPR_BTN.onclick = OPEN_GDPR;