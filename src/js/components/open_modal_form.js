import { ModalWindow } from "../classes/ModalWindow.js";

const OPEN_TRIGGER = document.getElementsByClassName('open-form');

export default OPEN_TRIGGER[0].onclick = () => {
    new ModalWindow('form', {
        actionBtn: false,
        _path: "./json/form_content.json"
    })
};
