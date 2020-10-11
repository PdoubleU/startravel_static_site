import { ModalWindow } from '../classes/ModalWindow.js';

const GDPR_IS_CONFIRMED = window.sessionStorage.getItem('gdpr');
const OPEN_GDPR_BTN = document.getElementById('gdpr_read');
const ACCEPT_GDPR_BTN = document.getElementById('gdpr_accept');

export const SHOW_GDPR_BAR = () => {
  if(GDPR_IS_CONFIRMED === 'unconfirmed') {
    document.getElementById('bar_gdpr').classList.toggle('bar_gdpr--active');
  }
};

export const HIDE_GDPR_BAR = () => {
  document.getElementById('bar_gdpr').classList.remove('bar_gdpr--active');
  window.sessionStorage.setItem('gdpr', 'confirmed');
}

export const OPEN_GDPR = () => {
  let GDPR_Info = new ModalWindow('gdpr_info',
                                  {
                                    button: false,
                                    action: 'accept',
                                    buttonNamePl: 'Akceptuję wszystko',
                                    buttonNameEn: 'Accept all',
                                  });
  GDPR_Info.button = false;
}

window.onload(setTimeout(SHOW_GDPR_BAR, 3000));
OPEN_GDPR_BTN.onclick = OPEN_GDPR;
ACCEPT_GDPR_BTN.onclick = HIDE_GDPR_BAR;