<h2 style="text-align: center">
  <a href="https://conversejs.org" target="_blank" rel="noopener">
    <img alt="Converse-Desktop" src="https://github.com/conversejs/converse.js/blob/master/logo/readme.png" width="480">
  </a>
</h2>

# Converse Desktop

## Jabber/XMPP client based on Converse.js and Electron

[![XMPP Chat](https://conference.conversejs.org/muc_badge/discuss@conference.conversejs.org)](https://inverse.chat/#converse/room?jid=discuss@conference.conversejs.org)

A basic integration of [Converse.js](https://conversejs.org/) and Electron. With OMEMO.

## Screenshots and features

[![Login screen](https://user-images.githubusercontent.com/6234547/161444310-ed1157fe-4f09-4334-b133-f16a8b1ead86.jpg)](https://user-images.githubusercontent.com/6234547/161444142-87008557-a0ae-414d-ab81-9740502dab30.jpg)
[![One-to-one chat](https://user-images.githubusercontent.com/6234547/161444320-62179698-d4cb-4522-8ee4-5fd727bbff0d.jpg)](https://user-images.githubusercontent.com/6234547/161444152-8a44b284-48a6-4c8e-a16e-95399b4def16.jpg)
[![Multi-user chat](https://user-images.githubusercontent.com/6234547/161444323-5fe7e478-1923-47c3-9e99-84020fb44009.jpg)](https://user-images.githubusercontent.com/6234547/161444156-eb2224a7-6082-4fe7-aa55-44eec093e04d.jpg)


- Permanent account storage
- Tray icon
- Tray notifications
- All the best from Converse.js like system notifications, MAM, OMEMO etc. See details at [Converse.js](https://conversejs.org/)


## Changelog

See [CHANGES.md](https://github.com/conversejs/converse-desktop/blob/master/CHANGES.md)


#### Latest release installers

| Operation System | Download link                                                                                                                                            |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| macOS            | [Converse_Desktop-9.1.0_x64.dmg](https://github.com/conversejs/converse-desktop/releases/download/v9.1.0/Converse.Desktop-9.1.0.dmg)                     |
| Windows          | [Converse_Desktop_Setup-9.1.0_x64.exe](https://github.com/conversejs/converse-desktop/releases/download/v9.1.0/Converse.Desktop.Setup.9.1.0.exe)         |
| Linux DEB        | [converse_desktop-9.1.0_amd64.deb](https://github.com/conversejs/converse-desktop/releases/download/v9.1.0/converse_desktop-9.1.0_amd64.deb)             |
| Linux AppImage   | [converse_desktop-9.1.0_x86_64.AppImage](https://github.com/conversejs/converse-desktop/releases/download/v9.1.0/converse_desktop-9.1.0_x86_64.AppImage) |
| Linux other      | [converse_desktop-9.1.0_x64.tar.gz](https://github.com/conversejs/converse-desktop/releases/download/v9.1.0/converse_desktop-9.1.0_x64.tar.gz)           |

   - [All releases](https://github.com/conversejs/converse-desktop/releases)


## Build from source

```bash
git clone https://github.com/conversejs/converse-desktop.git
cd converse-desktop
npm i
$(npm bin)/electron-rebuild
```

Then, to run:

```bash
npm start
```

### Build targets:

| Operation System | Target                 |
|------------------|------------------------|
| macOS            | `npm run dist`         |
| Windows          | `npm run dist:win64`   |
| Linux            | `npm run dist:linux64` |

More targets could be added via `package.json`. See [electron builder docs](https://www.electron.build/configuration/configuration).


## License

Like Converse.js, Converse Desktop's files are released under the Mozilla Public License version 2 (MPLv2). The gist of this license is that the covered files must stay open source, and modifications to them need to be released under the same license, but new files (for example for your own plugin) don't have to be released under the same license.

However, libsignal library, which is required for OMEMO support is released under the GPLv3. The MPLv2 license is compatible with GPLv3 and when GPLv3 code is included, the entire project effectively is licensed under the GPLv3.

Any custom build of Converse Desktop without libsignal included will again be licensed
under the MPLv2.


## Acknowledgements

This project started as a fork of Nick Denry's [Chimeverse](https://github.com/conversejs/converse-desktop).

<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=6MZ5YRYEDSVSQ&source=url" title="Donate once-off to this project using Paypal">
   <img src="https://img.shields.io/badge/paypal-donate-yellow.svg" alt="PayPal donate button" />
</a>
