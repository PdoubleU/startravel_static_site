export const CHECK_STORAGE = () => {
    if (window.localStorage.getItem('gdpr') && window.localStorage.getItem('language')) {
        return 0;
    } else {
        window.localStorage.setItem('gdpr', 'unconfirmed');
        window.localStorage.setItem('language', 'polish');
    }
}