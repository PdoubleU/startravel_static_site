const grip = document.getElementsByClassName('main');
let isButton = false;

export const scroll = () => {
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
export const createButton = () => {
    if (isButton === true) {return 0;}
    let width = window.innerWidth;
    if (width <= 780 ) {
        isButton =  true;
        let SCRL_BTN = document.createElement('button');
        SCRL_BTN.className = 'scroll_btn';
        SCRL_BTN.setAttribute('aria-label', 'scroll up button');
        grip[0].appendChild(SCRL_BTN);
    }
}
window.onresize = createButton;
window.onload = createButton;
window.onscroll = scroll;
