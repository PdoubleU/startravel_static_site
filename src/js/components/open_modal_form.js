import { ModalWindow } from "../classes/ModalWindow.js";

const openTrigger = document.getElementsByClassName('open-form');

export default openTrigger[0].onclick = () => {
    new ModalWindow('form');
};
