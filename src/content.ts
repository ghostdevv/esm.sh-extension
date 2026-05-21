import logo from './lib/logo';
import { getImportStatement, getVersion } from './lib/utils';

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

function inject() {
    const anchors = document.querySelectorAll('a');
    const report = Array.from(anchors).find((a) => a.textContent == 'Explore dependencies');

    if (!report) {
        console.error('Unable to find explore dependencies anchor tag');
        return;
    }

    const node = report.cloneNode(true) as HTMLAnchorElement;
    node.addEventListener('click', (event) => handleClick(event, node));
    node.innerHTML = `${logo}\n<strong>Copy</strong> esm.sh import`;
    node.classList.add('esm-sh');
    node.href = '#';

    const styles = document.createElement('style');
    styles.innerHTML = STYLES;

    report.parentNode?.appendChild(node);
    document.body.appendChild(styles);
}

inject();
