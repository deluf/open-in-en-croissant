function injectButton(container) {
    if (container.querySelector('.en-croissant-button')) {
        return;
    }

    const isGameOverModal = container.matches('.game-over-modal-shell-buttons');

    const button = document.createElement('a');
    let classNames = 'cc-button-component cc-button-secondary cc-button-large cc-bg-secondary en-croissant-button';
    if (isGameOverModal) {
        classNames += ' game-over-secondary-actions-row-component';
    }
    button.className = classNames;

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

    if (!isGameOverModal) {
        const iconSpan = document.createElement('span');
        iconSpan.setAttribute('aria-hidden', 'true');
        iconSpan.className = 'cc-icon-glyph cc-icon-size-32 cc-button-icon';

        const iconImg = document.createElement('img');
        iconImg.className = 'en-croissant-img-icon';
        iconImg.alt = '';
        iconImg.src = chrome.runtime.getURL('images/icon_48.png');

        iconSpan.appendChild(iconImg);
        button.appendChild(iconSpan);
    }

    const textSpan = document.createElement('span');
    textSpan.className = 'cc-button-one-line';
    textSpan.textContent = 'Open in En Croissant';

    button.appendChild(textSpan);

    if (isGameOverModal) {
        if (container.children.length > 0) {
            container.insertBefore(button, container.children[0].nextSibling);
        } else {
            container.appendChild(button);
        }
    } else {
        container.appendChild(button);
    }
}

function init() {
    const selectors = [
        '.game-review-buttons-component', // The right sidebar with the list of moves
        '.game-over-modal-shell-buttons'  // The form that pops-up after the game
    ];

    const checkAndInject = () => {
        selectors.forEach(selector => {
            const containers = document.querySelectorAll(selector);
            containers.forEach(container => {
                injectButton(container);
            });
        });
    };

    checkAndInject();

    const observer = new MutationObserver(() => {
        checkAndInject();
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
