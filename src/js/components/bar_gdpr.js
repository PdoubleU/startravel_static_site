const SIDE_BAR_VAL = document.getElementById('bar_gdpr').getAttribute('value');

export const showGDPR = () => {
  if(SIDE_BAR_VAL === 'unconfirmed') {
    document.getElementById('bar_gdpr').classList.toggle('bar_gdpr--active');
  }
};

window.onload(setTimeout(showGDPR, 3000));