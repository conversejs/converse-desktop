/**
 * Module for Tray functions.
 */

const {Tray} = require('electron')

let trayServiceWindow = null
let tray = null

let trayService = {}

trayService.initTray = (window) => {
    trayServiceWindow = window
    let iconPath = __dirname + '/../images/icon.png'
    tray = new Tray(iconPath)
    tray.setToolTip('Chimeverse')

    tray.on('click', function() {
        trayService.hideEnvelope()
        trayServiceWindow.show()
    })
}

trayService.showEnvelope = () => {
    tray.setImage(__dirname + '/../images/envelope.png')
}

trayService.hideEnvelope = () => {
    tray.setImage(__dirname + '/../images/icon.png')
}

module.exports = trayService


