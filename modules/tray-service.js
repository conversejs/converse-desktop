/**
 * Module for Tray functions.
 */

const  { BrowserWindow, Tray } = require('electron')

const path = require('path')

let trayServiceWindow = null
let tray = null

const trayService = {}

const getTrayServiceIcon = (iconName = 'icon') => {
    let iconImage = ''
    if (process.platform === 'darwin') {
        iconImage = iconName
    } else if (process.platform === 'win32') {
        iconImage = iconName+'-16x16'
    } else {
        iconImage = iconName+'-48x48'
    }
    return path.join(__dirname, '..','resources','images', iconImage + '.png')
}

trayService.initTray = (window) => {
    trayServiceWindow = window
    const iconPath = getTrayServiceIcon()
    tray = new Tray(iconPath)
    tray.setToolTip('Converse Desktop')
    tray.on('click', function() {
        // Sent open-related-chat event only on click
        const activeWindow = BrowserWindow.getAllWindows()[0]
        activeWindow.webContents.send('open-unread-chat')
        trayService.hideEnvelope()
        trayServiceWindow.show()
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
