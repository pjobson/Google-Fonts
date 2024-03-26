# Google Font Archive

Archive of [Google Fonts](https://fonts.google.com/) as of 2024 Mar 26.

## Updating

I included an updater, so you can download any new font in the future.

### Setup

Install nodejs, I use `tj/n`, you can use whatever you want.

    curl -L https://bit.ly/n-install | bash

Install Dependencies

    npm install

### Run

    ./update.node.js

This will get all new fonts and update the archive file.

I don't really recommend deleting the archive as running update after
it is deleted will take a very long time and probably crash.

## Example

Example Lexand:

    Lexend.tar.gz
        Lexend.css
        Lexend/Lexend-normal-100.woff
        Lexend/Lexend-normal-100.ttf
        Lexend/Lexend-normal-100.woff2
        Lexend/Lexend-normal-300.woff
        Lexend/Lexend-normal-300.ttf
        Lexend/Lexend-normal-300.woff2
        Lexend/Lexend-normal-400.woff
        Lexend/Lexend-normal-400.svg
        Lexend/Lexend-normal-400.ttf
        Lexend/Lexend-normal-400.woff2
        Lexend/Lexend-normal-700.woff
        Lexend/Lexend-normal-700.ttf
        Lexend/Lexend-normal-700.woff2
        Lexend/Lexend-normal-900.woff
        Lexend/Lexend-normal-900.ttf
        Lexend/Lexend-normal-900.woff2

