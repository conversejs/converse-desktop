/**
 * Module for Menu functions.
 */

const {app, Menu, BrowserWindow} = require('electron')

let menuService = {}


menuService.createMenu = () => {

    const isMac = process.platform === 'darwin'

    const about = {
        label: 'About Converse Desktop',
        click: () => {
            // @see https://github.com/electron/electron/issues/16558#issuecomment-484460276
            // let activeWindow = BrowserWindow.getFocusedWindow()
            let activeWindow = BrowserWindow.getAllWindows()[0]
            activeWindow.show()
            activeWindow.webContents.send('about-page-event')
        }
    }

    const application = {
        label: 'Converse Desktop',
        submenu: [
            ... isMac ? [about] : [],
            {
                label: 'Reconnect',
                accelerator: 'CmdOrCtrl+R',
                click: () => {
                    let activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.show()
                    activeWindow.reload()
                }
            },
            {
                label: 'Force logout',
                accelerator: 'CmdOrCtrl+D',
                click: () => {
                    let activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.show()
                    activeWindow.webContents.send('force-logout-event')
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Preferences',
                accelerator: 'CmdOrCtrl+,',
                click: () => {
                    let activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.show()
                    activeWindow.webContents.send('preferences-event')
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
            ... !isMac ? [about] : [],
            {
                label: 'Debug info',
                accelerator: 'F12',
                click: () => {
                    let activeWindow = BrowserWindow.getAllWindows()[0]
                    activeWindow.webContents.openDevTools()
                }
            }
        ]
    }

    const template = [application, edit, help]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

module.exports = menuService
