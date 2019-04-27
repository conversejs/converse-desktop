/**
 * Module for Menu functions.
 */

const {app, Menu, BrowserWindow} = require('electron')

let menuService = {}


menuService.createMenu = () => {

    const application = {
        label: 'Chimeverse',
        submenu: [
            {
                label: 'Reconnect',
                accelerator: 'CmdOrCtrl+R',
                click: () => {
                    let activeWindow = BrowserWindow.getFocusedWindow()
                    activeWindow.reload()
                }
            },
            {
                label: 'Force logout',
                accelerator: 'CmdOrCtrl+D',
                click: () => {
                    let activeWindow = BrowserWindow.getFocusedWindow()
                    activeWindow.webContents.send('force-logout-event');
                }
            },
            {
                type: 'separator',
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: () => {
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

    const template = [application, edit]

    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

module.exports = menuService
