/**
 * Module for Tray functions.
 */

const {Tray, Menu} = require('electron')

const path = require('path')

let tray = null

const trayService = {}

const getTrayServiceIcon = (withEnvelope = false) => {
    let size;
    if (process.platform === 'darwin' || process.platform === 'win32') {
        size = '16x16';
    } else {
        size = '48x48';
    }

    if (withEnvelope) {
        return path.join(__dirname, '..', 'resources', 'images', 'tray', 'envelope-' + size + '.png');
    } else {
        return path.join(__dirname, '..', 'resources', 'images', 'logo-' + size + '.png');
    }
}

trayService.initTray = (window) => {
    const iconPath = getTrayServiceIcon()
    tray = new Tray(iconPath)
    tray.setToolTip('Converse Desktop')
    tray.on('click', restore)

    if (process.platform === 'linux') {
        tray.setContextMenu(Menu.buildFromTemplate([
            {click: restore, role: 'unhide', label: 'Restore'}
        ]))
    } else {
        tray.on('right-click', restore)
    }

    function restore() {
        window.webContents.send('open-unread-chat')
        trayService.hideEnvelope()
        window.show()
    }
}

trayService.showEnvelope = () => {
    const iconPath = getTrayServiceIcon(true)
    tray.setImage(iconPath)
}

trayService.hideEnvelope = () => {
    const iconPath = getTrayServiceIcon()
    tray.setImage(iconPath)
}

module.exports = trayService
