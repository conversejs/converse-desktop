/**
 * Module for Menu functions.
 */
const { app, Menu, MenuItem } = require('electron')
const settingsService = require('./settings-service')
const { clearCredentials } = require('./credentials-service');

const menuService = {}

menuService.createMenu = (window) => {
    function reload () {
        window.show()
        window.loadFile('index.html').catch((reason) => {
            console.log(reason);
            app.isQuitting = true;
            app.quit();
        });
    }

    let converse;
    const application = new Menu();
    application.append(new MenuItem({
        label: 'Converse Desktop'
        , submenu: converse = Menu.buildFromTemplate([
            {
                label: 'Reconnect',
                accelerator: 'CmdOrCtrl+R',
                click: () => {
                    reload();
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Minimize on close',
                type: 'checkbox',
                id: 'minimize-on-close',
                checked: settingsService.get('minimizeOnClose'),
                click: () => {
                    settingsService.set('minimizeOnClose', converse.getMenuItemById('minimize-on-close').checked);
                }
            },
            {
                label: 'Hide Menubar',
                type: 'checkbox',
                id: 'hide-menubar',
                checked: settingsService.get('hideMenubar'),
                click: () => {
                    const menuItem = converse.getMenuItemById('hide-menubar');
                    settingsService.set('hideMenubar', menuItem.checked);
                    window.setAutoHideMenuBar(menuItem.checked);
                    window.setMenuBarVisibility(!menuItem.checked);
                }
            },
            {
                label: 'Encrypt by default',
                type: 'checkbox',
                id: 'encrypt-by-default',
                checked: settingsService.get('omemo_default'),
                click: () => {
                    const menuItem = converse.getMenuItemById('encrypt-by-default');
                    settingsService.set('omemo_default', menuItem.checked);
                }
            },
            {
                label: 'Show myself',
                type: 'checkbox',
                id: 'show-self-in-roster',
                checked: settingsService.get('show_self_in_roster'),
                click: () => {
                    const menuItem = converse.getMenuItemById('show-self-in-roster');
                    settingsService.set('show_self_in_roster', menuItem.checked);
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                click: () => {
                    app.isQuitting = true
                    app.quit()
                },
            },
        ])
    }));
    application.append(new MenuItem({
        label: 'Edit'
        , submenu: Menu.buildFromTemplate([
            {
                label: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                role: 'undo',
            },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo',
            },

            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut',
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy',
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste',
            },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectAll',
            },
        ])
    }));
    application.append(new MenuItem({
        label: 'Help'
        , submenu: Menu.buildFromTemplate([
            {
                label: 'Debug info',
                accelerator: 'F12',
                click: () => {
                    window.webContents.openDevTools()
                }
            },
            {
                label: 'Clear Credentials',
                click: async () => {
                    await clearCredentials();
                    await window.webContents.session.clearStorageData();
                    reload();
                }
            }
        ])
    }));

    Menu.setApplicationMenu(application);
}

module.exports = menuService
