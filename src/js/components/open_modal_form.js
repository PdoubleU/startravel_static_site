let target = document.getElementsByClassName('modal');
let trigger = document.getElementsByClassName('open-form');

export const openModal = () => {
    target[0].style.display = 'flex';
    }

trigger[0].addEventListener('click', openModal);