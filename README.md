# Converse Desktop

This project started as a fork of Nick Denry's [Chimeverse](https://github.com/conversejs/converse-desktop).

#### Jabber/XMPP client based on Converse.js and Electron

![Version](https://img.shields.io/npm/v/chimeverse/latest.svg)
![Downloads](https://img.shields.io/npm/dt/chimeverse.svg)
![License](https://img.shields.io/npm/l/chimeverse.svg)
<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6MZ5YRYEDSVSQ&source=url" title="Donate once-off to this project using Paypal">
        <img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPayl donate button" />
    </a>

It should happen once. A very basic integration of [Converse.js](https://conversejs.org/) and Electron. With OMEMO.

#### Screenshots and feautures
<p float="left">
<img width="403" alt="Main window" src="https://user-images.githubusercontent.com/1450983/56779297-0758ad80-67e3-11e9-95af-f2c7b4264402.png">
<img width="403" alt="Chat" src="https://user-images.githubusercontent.com/1450983/56779327-2fe0a780-67e3-11e9-8380-97af16e3f06b.png">
<img width="403" alt="Account form" src="https://user-images.githubusercontent.com/1450983/84831577-41fb5600-b034-11ea-8774-8d8632391a49.png">
<img width="403" alt="Settings screen" src="https://user-images.githubusercontent.com/1450983/81833419-59808400-9548-11ea-8059-a59448d1ff7d.png">

</p>

- Permanent account storage
- Tray icon
- Tray notifications
- All the best from Converse.js like system notifications, MAM, OMEMO etc. See details at [Converse.js](https://conversejs.org/)

#### Changelog

See [CHANGES.md](https://github.com/conversejs/converse-desktop/blob/master/CHANGES.md)

#### Run with npm

```
git clone https://github.com/conversejs/converse-desktop.git
cd converse-desktop
npm i
$(npm bin)/electron-rebuild
npm start
```

### Development

Prepare
```
git clone https://github.com/conversejs/converse-desktop.git
cd converse-desktop
npm i
$(npm bin)/electron-rebuild
```

Build targets

| Operation System | Target |
-------------------|----------------
| macOS            | `npm run dist` |
| Windows          | `npm run dist:win64` |
| Linux DEB        | `npm run dist:linux64deb` |

More targets could be added via `package.json`. See [electron builder docs](https://www.electron.build/configuration/configuration).
