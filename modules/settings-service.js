/**
 * Module for getting settigns in Main process.
 */

const electronSettings = require('electron-settings')

let settingsService = {}

settingsService.get = (itemKey) => {
    settingValue = electronSettings.getSync(itemKey)
    if (typeof settingValue === 'undefined' || settingValue === null) {
        return false
    }
    return settingValue
}

settingsService.set = (itemKey, settingValue) => {
    electronSettings.setSync(itemKey, settingValue)
}

module.exports = settingsService