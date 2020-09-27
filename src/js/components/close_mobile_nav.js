let checkbox = document.getElementById('menu-open');
let trigger = document.getElementsByClassName('top-nav__button mobile');

export const close_mobile = () => checkbox.checked = false;

[...trigger].forEach(element => {
    element.addEventListener('click', close_mobile);
});
