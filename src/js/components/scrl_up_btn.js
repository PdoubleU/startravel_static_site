const GRIP = document.getElementsByClassName('main');
let isButton = false;

export const SCROLL = () => {
        let scroll_btn = document.getElementsByClassName('scroll_btn');
        if (isButton == false) {return 0;}
        if (window.scrollY > 500) {
            scroll_btn[0].classList.add('scroll_btn--active');
        }
        else {
            scroll_btn[0].classList.remove('scroll_btn--active');
        }
        scroll_btn[0].onclick = function scrollTop() {
                                    window.scrollTo({
                                        top: 0,
                                        left: 100,
                                        behavior: 'smooth'
                                        });
                                }

}
export const CREATE_BUTTON = () => {
    if (isButton === true) {return 0;}
    let width = window.innerWidth;
    if (width <= 780 ) {
        isButton =  true;
        let SCRL_BTN = document.createElement('button');
        SCRL_BTN.className = 'scroll_btn';
        SCRL_BTN.setAttribute('aria-label', 'Przewiń do góry');
        SCRL_BTN.setAttribute('tabindex', '0');
        SCRL_BTN.setAttribute('title', 'Przewiń do góry');
        GRIP[0].appendChild(SCRL_BTN);
    }
}
window.onresize = CREATE_BUTTON;
window.onload = CREATE_BUTTON;
window.onscroll = SCROLL;

