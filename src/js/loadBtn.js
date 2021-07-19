export default class LoadMoreButton {
    constructor({ selector, hidden = false }) {
        this.refs = this.getRefs(selector);

        if(hidden) {
            this.hide();
        }
    };

    getRefs(selector) {
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.label = refs.button.querySelector('.label');

        return refs;
    }

    enable() {
        this.refs.button.disabled = false;
    }

    disable() {
        this.refs.button.disabled = true;
    }
    
    hide() {
        this.refs.button.classList.add('is-hidden');
    }

    show() {
        this.refs.button.classList.remove('is-hidden');
    }
}