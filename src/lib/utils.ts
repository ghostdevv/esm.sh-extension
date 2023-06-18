import { valid } from 'semver';

export function getVersion() {
    const textNodes = document.querySelectorAll('p');
    const version = Array.from(textNodes).find((t) => valid(t.textContent));

    return version?.textContent ?? undefined;
}

export function getImportStatement(name: string, version?: string) {
    const url = `https://esm.sh/${name}${version ? `@${version}` : ''}`;
    return `import {} from '${url}'`;
}
