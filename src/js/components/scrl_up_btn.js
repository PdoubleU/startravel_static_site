let grip = document.getElementsByClassName('main');

export default function scroll() {
    let width = window.innerWidth;
    if (width <= 780){
        var SCRL_BTN = document.createElement('button');
        SCRL_BTN.className = 'scroll_btn';
        SCRL_BTN.setAttribute('aria-label', 'scroll up button');
        grip[0].appendChild(SCRL_BTN);

        let scroll_btn = document.getElementsByClassName('scroll_btn');

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
}
window.onscroll = scroll;
