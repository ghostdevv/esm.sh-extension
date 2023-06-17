import { valid } from 'semver';
import logo from './logo';

function handleClick(event: MouseEvent, node: HTMLAnchorElement) {
    event.preventDefault();

    const packageName = location.pathname.split('/')[2];

    if (!packageName || packageName.trim().length == 0) {
        console.error('Unable to find package name');
        return;
    }

    const version = getVersion();
    const importUrl = `https://esm.sh/${packageName}${version ? `@${version}` : ''}`;

    navigator.clipboard.writeText(`import {} from '${importUrl}'`);

    node.innerHTML = `${logo}\n<strong>Copied!</strong>`;

    setTimeout(() => {
        node.innerHTML = `${logo}\n<strong>Copy</strong> esm.sh import`;
    }, 1000);
}

function getVersion() {
    const textNodes = document.querySelectorAll('p');
    const version = Array.from(textNodes).find((t) => valid(t.textContent));

    return version?.textContent ?? null;
}

function inject() {
    const anchors = document.querySelectorAll('a');
    const runkit = Array.from(anchors).find((a) => a.textContent == 'Try on RunKit');

    if (!runkit) {
        console.error('Unable to find RunKit a tag');
        return;
    }

    const node = runkit.cloneNode(true) as HTMLAnchorElement;

    node.innerHTML = `${logo}\n<strong>Copy</strong> esm.sh import`;
    node.style.backgroundImage =
        'linear-gradient(-180deg, rgba(255, 255, 255, 0.13) 0%, rgba(0, 236, 255, 0.1) 100%);';
    node.style.borderColor = '#00ecff';
    node.href = '#';

    node.addEventListener('click', (event) => handleClick(event, node));

    runkit.parentNode?.appendChild(node);
}

inject();
