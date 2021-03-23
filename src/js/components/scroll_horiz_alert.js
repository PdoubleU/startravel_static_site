export function scrollHorizActivate() {
	setTimeout(() => document.querySelector('#scroll_horiz_alert').classList.add('scroll_alert_active'), 3000);
}
export function scrollHorizDeactivate() {
	setTimeout(() => document.querySelector('#scroll_horiz_alert').classList.remove('scroll_alert_active'), 1000);
}
window.addEventListener('load', () => {
	scrollHorizActivate();
});
document.querySelector('#scroll_horiz_alert').addEventListener('click', () => {
	scrollHorizDeactivate();
});
