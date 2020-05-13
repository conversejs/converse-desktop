/**
 * Module for Tray functions.
 */

const  { BrowserWindow, Tray } = require('electron')

const path = require('path');

let trayServiceWindow = null
let tray = null

let trayService = {}

trayService.initTray = (window) => {
    trayServiceWindow = window
    let iconPath = path.join(__dirname, '/../resources/images/icon.png')
    tray = new Tray(iconPath)
    tray.setToolTip('Chimeverse')
    tray.on('click', function() {
        // Sent open-related-chat event only on click
        let activeWindow = BrowserWindow.getAllWindows()[0]
        activeWindow.webContents.send('open-unread-chat')
        trayService.hideEnvelope()
        trayServiceWindow.show()
    })
}

trayService.showEnvelope = () => {
    tray.setImage(path.join(__dirname, '/../resources/images/envelope.png'))
}

trayService.hideEnvelope = () => {
    tray.setImage(path.join(__dirname, '/../resources/images/icon.png'))
}

module.exports = trayService
