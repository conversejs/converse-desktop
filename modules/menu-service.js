/**
 * Module for Menu functions.
 */
const {app, Menu, MenuItem, BrowserWindow} = require('electron')
const settingsService = require(__dirname + '/../modules/settings-service')
const prompt = require('electron-prompt');

const menuService = {}


menuService.createMenu = () => {
    let converse;
    const application = new Menu();
    application.append(new MenuItem({
        label: 'Converse Desktop'
        , submenu: converse = Menu.buildFromTemplate([
            {
                label: 'Reconnect',
                accelerator: 'CmdOrCtrl+R',
                click: () => {
                    const activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.show()
                    activeWindow.reload()
                }
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
                label: 'Connection Manager...',
                click: () => {
                    let currentValue = settingsService.get('connectionManager') || '';
                    prompt({
                        title: 'Connection manager'
                        , label: 'Connection manager URL:'
                        , value: currentValue
                        , resizable: true
                        , width: 620
                        , height: 180
                    }, app.mainWindow).then(function (newValue) {
                        if (newValue !== null && newValue !== currentValue) {
                            settingsService.set('connectionManager', newValue === '' ? null : newValue);
                            app.mainWindow.reload()
                        }
                    }).catch(function (ex) {
                    });
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
                    const activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.webContents.openDevTools()
                }
            }
        ])
    }));

    Menu.setApplicationMenu(application);
}

module.exports = menuService
