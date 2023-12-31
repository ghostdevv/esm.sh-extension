# esm.sh browser extension

This extension adds a "Copy esm.sh import" button on npm package pages! It will automatically detect the package name and version.

![esm.sh extension button](https://i.imgur.com/hmM476W.png)

## Installation

[![get-chrome-extension](./.github/chrome-extension.png)](https://chrome.google.com/webstore/detail/esmsh-extension/jlpgfgknnnglpcpkocpfpdicpdpdlnme)
[![get-firefox-extension](./.github/firefox-extension.png)](https://addons.mozilla.org/en-GB/firefox/addon/esm-sh/)

## Develop

Requirements:
    - Node 16+
    - npm or pnpm

1. `npm install` or `pnpm install`
2. `npm run build`
3. Load extension into chrome/firefox from `extension/manifest.json`
