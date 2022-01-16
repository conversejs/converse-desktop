/**
 * Module for Menu functions.
 */
const {app, Menu, BrowserWindow} = require('electron')
const settingsService = require(__dirname + '/../modules/settings-service')

const menuService = {}


menuService.createMenu = () => {
    const application = {
        label: 'Converse Desktop',
        submenu: [
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
                checked: settingsService.get('minimizeOnClose'),
                click: () => {
                    this.checked = !this.checked;
                    settingsService.set('minimizeOnClose', this.checked);
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
        ],
    }

    const edit = {
        label: 'Edit',
        submenu: [
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
        ],
    }

    const help = {
        label: 'Help',
        submenu: [
            {
                label: 'Debug info',
                accelerator: 'F12',
                click: () => {
                    const activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.webContents.openDevTools()
                }
            }
        ]
    }

    const template = [application, edit, help]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

module.exports = menuService
