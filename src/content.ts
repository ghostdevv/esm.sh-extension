import { getImportStatement, getVersion } from './lib/utils';
import logo from './lib/logo';

function handleClick(event: MouseEvent, node: HTMLAnchorElement) {
    event.preventDefault();

    const packageName = location.pathname.split('/')[2];

    if (!packageName || packageName.trim().length == 0) {
        console.error('Unable to find package name');
        return;
    }

    const version = getVersion();
    const importStatement = getImportStatement(packageName, version);

    navigator.clipboard.writeText(importStatement);

    node.innerHTML = `${logo}\n<strong>Copied!</strong>`;

    setTimeout(() => {
        node.innerHTML = `${logo}\n<strong>Copy</strong> esm.sh import`;
    }, 1000);
}

const STYLES = `
    [data-color-mode="light"] .esm-sh {
        background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0.13) 0%, rgba(0, 236, 255, 0.08) 100%) !important;
        border-color: #00ecff;
        color: #08a9b6;
    }

    .esm-sh:not(:hover) {
        background-color: #1e3436 !important;
    }
`;

function inject(dummy: HTMLAnchorElement) {
    if (!document.querySelector('a.esm-sh')) {
        console.log('injecting button');
        const node = dummy.cloneNode(true) as HTMLAnchorElement;
        node.innerHTML = `${logo}\n<strong>Copy</strong> esm.sh import`;
        node.classList.add('esm-sh');
        node.href = '#';
        node.addEventListener('click', (event) => handleClick(event, node));
        dummy.parentElement!.appendChild(node);
    }

    if (!document.querySelector('style[id="esm-sh-styles"]')) {
        console.log('injecting styles');
        const styles = document.createElement('style');
        styles.innerHTML = STYLES;
        styles.id = 'esm-sh-styles';
        document.body.appendChild(styles);
    }
}

const anchors = document.querySelectorAll('a');
const report = Array.from(anchors).find((a) => a.textContent == 'Explore dependencies');

if (!report || !report.parentElement) {
    console.error('Unable to find explore dependencies anchor tag');
} else {
    inject(report);
    const observer = new MutationObserver(() => inject(report));
    observer.observe(report.parentElement, { childList: true });
}
