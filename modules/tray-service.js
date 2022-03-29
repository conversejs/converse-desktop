/**
 * Module for Tray functions.
 */

const { Tray } = require('electron')

const path = require('path')

let tray = null

const trayService = {}

const getTrayServiceIcon = (iconName = 'icon') => {
    let iconImage;
    if (process.platform === 'darwin' || process.platform === 'win32') {
        iconImage = iconName + '-16x16'
    } else {
        iconImage = iconName + '-48x48'
    }
    return path.join(__dirname, '..', 'resources', 'images', iconImage + '.png')
}

trayService.initTray = (window) => {
    const iconPath = getTrayServiceIcon()
    tray = new Tray(iconPath)
    tray.setToolTip('Converse Desktop')
    tray.on('click', function () {
        window.webContents.send('open-unread-chat')
        trayService.hideEnvelope()
        window.show()
    })
}

trayService.showEnvelope = () => {
    const iconPath = getTrayServiceIcon('envelope')
    tray.setImage(iconPath)
}

trayService.hideEnvelope = () => {
    const iconPath = getTrayServiceIcon()
    tray.setImage(iconPath)
}

module.exports = trayService
