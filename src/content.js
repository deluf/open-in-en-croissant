function injectButton(container) {
    if (container.querySelector('.en-croissant-button')) {
        return;
    }

    const button = document.createElement('a');
    button.className = 'cc-button-component cc-button-secondary cc-button-large cc-bg-secondary cc-button-full en-croissant-button';

    const updateHref = () => {
        button.href = `encroissant://import?url=${encodeURIComponent(window.location.href)}`;
    };
    updateHref();

    // Dynamically update URL in case it changed without page reload
    button.addEventListener('mouseenter', updateHref);
    button.addEventListener('focus', updateHref);
    button.addEventListener('click', updateHref);

    button.setAttribute('aria-label', 'Open in En Croissant');
    button.setAttribute('target', '_blank');

    const iconSpan = document.createElement('span');
    iconSpan.setAttribute('aria-hidden', 'true');
    iconSpan.className = 'cc-icon-glyph cc-icon-size-32 cc-button-icon';

    const iconImg = document.createElement('img');
    iconImg.className = 'en-croissant-img-icon';
    iconImg.alt = '';
    iconImg.src = chrome.runtime.getURL('images/icon_48.png');

    iconSpan.appendChild(iconImg);

    const textSpan = document.createElement('span');
    textSpan.className = 'cc-button-one-line';
    textSpan.textContent = 'Open in En Croissant';

    button.appendChild(iconSpan);
    button.appendChild(textSpan);

    container.appendChild(button);
}

// Observe the DOM to inject the button as soon as the target container is rendered
function init() {
    const container = document.querySelector('.game-review-buttons-component');
    if (container) {
        injectButton(container);
    }

    const observer = new MutationObserver((mutations) => {
        const target = document.querySelector('.game-review-buttons-component');
        if (target) {
            injectButton(target);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
