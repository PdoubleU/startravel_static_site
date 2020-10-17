import { ModalWindow } from '../classes/ModalWindow.js';

const OPEN_GDPR_BTN = document.getElementById('gdpr_read');
const ACCEPT_GDPR_BTN = document.getElementById('gdpr_accept');

export const SHOW_GDPR_BAR = () => {
  (window.localStorage.getItem('gdpr') === 'unconfirmed')
  ?
  document.getElementById('bar_gdpr').classList.toggle('bar_gdpr--active')
  :
  document.getElementById('bar_gdpr').style.display = 'none';
};

export const HIDE_GDPR_BAR = () => {
  console.log('error');
  document.getElementById('bar_gdpr').classList.remove('bar_gdpr--active');
  window.localStorage.setItem('gdpr', 'confirmed');
  setTimeout(() => {
    document.getElementById('bar_gdpr').remove();
  }, 1000);
}

export const OPEN_GDPR = () => {
  new ModalWindow('gdpr_info',
                      {
                        content: 'gdpr',
                        button: false,
                        action: 'accept',
                        buttonNamePl: 'Akceptuję wszystko',
                        buttonNameEn: 'Accept all',
                        _path: './json/gdpr_content.json'
                      });
}

window.addEventListener("load", () => {setTimeout(SHOW_GDPR_BAR, 3000)});
OPEN_GDPR_BTN.onclick = OPEN_GDPR;
ACCEPT_GDPR_BTN.onclick = HIDE_GDPR_BAR;