let checkbox = document.getElementById('menu-open');
let trigger = document.getElementsByClassName('top-nav__button mobile');

export const CLOSE_MOBILE = () => checkbox.checked = false;

[...trigger].forEach(element => {
    element.addEventListener('click', CLOSE_MOBILE);
});
